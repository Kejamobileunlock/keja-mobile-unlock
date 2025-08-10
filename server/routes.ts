import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";
import { z } from "zod";

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY || "Z5W3B51-Q6EMKP8-P1FREDH-7TJMXZD";
const NOWPAYMENTS_PUBLIC_KEY = process.env.NOWPAYMENTS_PUBLIC_KEY || "318e4713-4014-4346-afcb-4d4a450fd87c";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Create order and initiate payment
  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      
      // Create order in storage
      const order = await storage.createOrder(validatedData);
      
      // Get current domain for success/cancel URLs
      const domain = process.env.REPLIT_DOMAINS?.split(',')[0] || 'your-app.replit.app';
      const baseUrl = domain.startsWith('http') ? domain : `https://${domain}`;
      
      // Create NowPayments invoice (better for hosted environments)
      const priceAmount = parseFloat(validatedData.price);
      const invoiceData = {
        price_amount: priceAmount,
        price_currency: "USD",
        // No pay_currency specified - let user choose on NowPayments page
        order_id: order.id,
        order_description: `KEJA MOBILE UNLOCK - ${validatedData.toolName} (${validatedData.duration})`,
        success_url: `${baseUrl}/success?order_id=${order.id}`,
        cancel_url: baseUrl,
        is_fee_paid_by_user: false
      };

      console.log("Creating NowPayments invoice with:", invoiceData);

      const invoiceResponse = await fetch("https://api.nowpayments.io/v1/invoice", {
        method: "POST",
        headers: {
          "x-api-key": NOWPAYMENTS_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(invoiceData)
      });

      if (!invoiceResponse.ok) {
        const errorText = await invoiceResponse.text();
        console.error("NowPayments API error:", errorText);
        throw new Error(`NowPayments API error: ${errorText}`);
      }

      const invoiceResult = await invoiceResponse.json();
      console.log("NowPayments invoice created:", invoiceResult);
      
      // Update order with invoice ID
      await storage.updateOrderPaymentId(order.id, invoiceResult.id.toString());
      
      res.json({
        success: true,
        order_id: order.id,
        payment_url: invoiceResult.invoice_url,
        invoice_id: invoiceResult.id
      });

    } catch (error) {
      console.error("Order creation error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur lors de la création de la commande. Veuillez réessayer." 
      });
    }
  });

  // Get order status
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to get order" });
    }
  });

  // NowPayments webhook
  app.post("/api/webhook/nowpayments", async (req, res) => {
    try {
      const { order_id, payment_status } = req.body;
      
      if (order_id && payment_status) {
        await storage.updateOrderStatus(order_id, payment_status);
      }
      
      res.status(200).send("OK");
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(200).send("OK"); // Always return 200 to NowPayments
    }
  });

  // Get available cryptocurrencies from NowPayments
  app.get("/api/currencies", async (req, res) => {
    try {
      const response = await fetch("https://api.nowpayments.io/v1/currencies", {
        headers: {
          "x-api-key": NOWPAYMENTS_API_KEY
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch currencies");
      }

      const currencies = await response.json();
      res.json(currencies);
    } catch (error) {
      res.status(500).json({ error: "Failed to get currencies" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
