import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull(),
  email: text("email").notNull(),
  toolName: text("tool_name").notNull(),
  duration: text("duration").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").notNull(),
  paymentId: text("payment_id"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  username: true,
  email: true,
  toolName: true,
  duration: true,
  price: true,
  paymentMethod: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export const toolsData = [
  {
    name: "UNLOCK TOOL",
    icon: "mobile-alt",
    color: "indigo",
    plans: [
      { duration: "3 months", price: 23 },
      { duration: "6 months", price: 33 },
      { duration: "12 months", price: 53 }
    ]
  },
  {
    name: "Arab FRP Tool",
    icon: "shield-alt",
    color: "emerald",
    plans: [
      { duration: "3 months", price: 16 },
      { duration: "6 months", price: 21 },
      { duration: "12 months", price: 31 },
      { duration: "24 months", price: 40 }
    ]
  },
  {
    name: "DFT Pro Tool",
    icon: "cogs",
    color: "amber",
    plans: [
      { duration: "12 months", price: 88 }
    ]
  },
  {
    name: "MDM FIX TOOL",
    icon: "wrench",
    color: "red",
    plans: [
      { duration: "3 months", price: 52 },
      { duration: "12 months", price: 110 }
    ]
  },
  {
    name: "TSM TOOL",
    icon: "microchip",
    color: "purple",
    plans: [
      { duration: "6 months", price: 14 },
      { duration: "12 months", price: 24 },
      { duration: "24 months", price: 34 }
    ]
  },
  {
    name: "TFM TOOL",
    icon: "tools",
    color: "cyan",
    plans: [
      { duration: "3 months", price: 20 },
      { duration: "12 months", price: 31 },
      { duration: "24 months", price: 48 }
    ]
  },
  {
    name: "Pandora Tool",
    icon: "cube",
    color: "pink",
    plans: [
      { duration: "12 months", price: 80 }
    ]
  },
  {
    name: "AMT",
    icon: "rocket",
    color: "orange",
    plans: [
      { duration: "3 months", price: 14 },
      { duration: "6 months", price: 23 },
      { duration: "12 months", price: 34 }
    ]
  },
  {
    name: "KGFIX TOOL",
    icon: "screwdriver",
    color: "lime",
    plans: [
      { duration: "12 months", price: 39 }
    ]
  },
  {
    name: "HW Pro Tool (Huawei Tool)",
    icon: "laptop",
    color: "blue",
    plans: [
      { duration: "12 months", price: 50 }
    ]
  }
];
