import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameResultSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Save game result
  app.post("/api/game-results", async (req, res) => {
    try {
      const validatedData = insertGameResultSchema.parse(req.body);
      const result = await storage.saveGameResult(validatedData);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: "Invalid game result data" });
    }
  });

  // Get game results
  app.get("/api/game-results", async (req, res) => {
    try {
      const results = await storage.getGameResults();
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch game results" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
