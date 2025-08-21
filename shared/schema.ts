import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const gameResults = pgTable("game_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  participant1Name: text("participant1_name").notNull(),
  participant2Name: text("participant2_name").notNull(),
  homeType: text("home_type").notNull(),
  hasChildren: boolean("has_children").notNull().default(false),
  hasPets: boolean("has_pets").notNull().default(false),
  hasCar: boolean("has_car").notNull().default(false),
  participant1Tasks: integer("participant1_tasks").notNull().default(0),
  participant2Tasks: integer("participant2_tasks").notNull().default(0),
  togetherTasks: integer("together_tasks").notNull().default(0),
  completedAt: timestamp("completed_at").notNull().default(sql`now()`),
});

export const insertGameResultSchema = createInsertSchema(gameResults).omit({
  id: true,
  completedAt: true,
});

export type InsertGameResult = z.infer<typeof insertGameResultSchema>;
export type GameResult = typeof gameResults.$inferSelect;

// Game state types
export interface GameData {
  participant1: string;
  participant2: string;
  homeType: 'house' | 'apartment' | '';
  hasChildren: boolean;
  hasPets: boolean;
  hasCar: boolean;
  currentTaskIndex: number;
  participant1Tasks: number;
  participant2Tasks: number;
  togetherTasks: number;
  completedTasks: Array<{
    task: string;
    assignedTo: number | 'together' | 'not-relevant';
  }>;
  tasks: string[];
}

export interface Task {
  id: string;
  name: string;
  category: string;
  conditions?: string[];
}
