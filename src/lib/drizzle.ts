// lib directory is used for connections with data bases

import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

// For types
import { InferModel } from "drizzle-orm";

// We can INSERT, UPDATE, DELETE data with the help of Drizzle, but we can't create table with Drizzle.

// To let Drizzle know about the table we created in PostGres.
export const todoTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  task: varchar("task", { length: 255 }).notNull(),
});

// Drizzle helps us build type safe applications.

// To be used at front end
// We pass the types to InferModel, and InferModel generates the type of "Todo" and "NewTodo" 
export type Todo = InferModel<typeof todoTable>;
export type NewTodo = InferModel<typeof todoTable, "insert">;

// We pass "sql" to drizzle to pass environment parameters to drizzle.
export const db = drizzle(sql);

db.insert(todoTable).values;
