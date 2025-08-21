import { GameData } from "@shared/schema";

const STORAGE_KEY = 'fairShareGame';

export function saveGameData(gameData: GameData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
  } catch (error) {
    console.error('Failed to save game data:', error);
  }
}

export function loadGameData(): GameData | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load game data:', error);
    return null;
  }
}

export function clearGameData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear game data:', error);
  }
}

export function createInitialGameData(): GameData {
  return {
    participant1: '',
    participant2: '',
    homeType: '',
    hasChildren: false,
    hasPets: false,
    hasCar: false,
    currentTaskIndex: 0,
    participant1Tasks: 0,
    participant2Tasks: 0,
    togetherTasks: 0,
    completedTasks: [],
    tasks: []
  };
}
