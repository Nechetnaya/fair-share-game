import { type GameResult, type InsertGameResult } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  saveGameResult(result: InsertGameResult): Promise<GameResult>;
  getGameResults(): Promise<GameResult[]>;
}

export class MemStorage implements IStorage {
  private gameResults: Map<string, GameResult>;

  constructor() {
    this.gameResults = new Map();
  }

  async saveGameResult(insertResult: InsertGameResult): Promise<GameResult> {
    const id = randomUUID();
    const result: GameResult = { 
      ...insertResult,
      hasChildren: insertResult.hasChildren || false,
      hasPets: insertResult.hasPets || false,
      hasCar: insertResult.hasCar || false,
      participant1Tasks: insertResult.participant1Tasks || 0,
      participant2Tasks: insertResult.participant2Tasks || 0,
      togetherTasks: insertResult.togetherTasks || 0,
      id,
      completedAt: new Date()
    };
    this.gameResults.set(id, result);
    return result;
  }

  async getGameResults(): Promise<GameResult[]> {
    return Array.from(this.gameResults.values()).sort(
      (a, b) => b.completedAt.getTime() - a.completedAt.getTime()
    );
  }
}

export const storage = new MemStorage();
