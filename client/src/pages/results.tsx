import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { loadGameData, clearGameData } from "@/lib/game-storage";
import { researchQuotes } from "@/lib/tasks";
import { GameData } from "@shared/schema";

export default function ResultsPage() {
  const [, setLocation] = useLocation();
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    const data = loadGameData();
    if (!data || data.currentTaskIndex === 0) {
      setLocation('/');
      return;
    }
    setGameData(data);
  }, [setLocation]);

  const handlePlayAgain = () => {
    clearGameData();
    setLocation('/');
  };

  if (!gameData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const totalTasks = gameData.participant1Tasks + gameData.participant2Tasks + gameData.togetherTasks;
  
  if (totalTasks === 0) {
    setLocation('/');
    return null;
  }

  const p1Percent = Math.round((gameData.participant1Tasks / totalTasks) * 100);
  const p2Percent = Math.round((gameData.participant2Tasks / totalTasks) * 100);
  const togetherPercent = Math.round((gameData.togetherTasks / totalTasks) * 100);

  const randomQuote = researchQuotes[Math.floor(Math.random() * researchQuotes.length)];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 lg:px-12">
        <div className="flex items-center">
          <span className="text-xl font-medium text-gray-900">Fair Share</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">How it works</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
          <Button 
            className="fair-share-blue-bg text-white hover:opacity-90"
            onClick={handlePlayAgain}
          >
            Play
          </Button>
        </nav>
      </header>

      {/* Results */}
      <main className="flex-1 flex items-center justify-center px-6 lg:px-12">
        <div className="max-w-2xl w-full text-center space-y-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Here's how tasks are shared in your family
          </h1>
          
          {/* Results Visualization */}
          <div className="space-y-6">
            <div className="text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">Tasks</span>
                <span className="text-2xl font-bold">100%</span>
              </div>
              <div className="text-sm fair-share-green mb-4">
                Total {gameData.togetherTasks > 0 ? '+' : ''}{gameData.togetherTasks > 0 ? Math.round((gameData.togetherTasks / totalTasks) * 10) : 0}%
              </div>
              
              {/* Progress Bars */}
              <div className="space-y-4">
                <ProgressBar
                  value={p1Percent}
                  label={gameData.participant1}
                  percentage={`${p1Percent}%`}
                  barColor="bg-gray-400"
                />
                
                <ProgressBar
                  value={p2Percent}
                  label={gameData.participant2}
                  percentage={`${p2Percent}%`}
                  barColor="bg-gray-400"
                />
                
                <ProgressBar
                  value={togetherPercent}
                  label="Together"
                  percentage={`${togetherPercent}%`}
                  barColor="fair-share-green-bg"
                />
              </div>
            </div>
          </div>

          {/* Research Quote */}
          <div className="bg-gray-50 rounded-xl p-6 text-left">
            <p className="text-gray-700 italic">{randomQuote}</p>
          </div>

          <p className="text-gray-600">
            Remember: sharing household responsibilities helps reduce stress and increase well-being
          </p>
          
          <Button 
            size="lg"
            className="fair-share-blue-bg text-white px-8 py-3 text-lg font-medium hover:opacity-90"
            onClick={handlePlayAgain}
          >
            Play again
          </Button>
        </div>
      </main>
    </div>
  );
}
