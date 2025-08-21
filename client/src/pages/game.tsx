import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { loadGameData, saveGameData } from "@/lib/game-storage";
import { supportiveMessages } from "@/lib/tasks";
import { GameData } from "@shared/schema";

export default function GamePage() {
  const [, setLocation] = useLocation();
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const data = loadGameData();
    if (!data || data.tasks.length === 0) {
      setLocation('/setup');
      return;
    }
    setGameData(data);
  }, [setLocation]);

  const assignTask = (participant: 1 | 2 | 'together' | 'not-relevant') => {
    if (!gameData || gameData.currentTaskIndex >= gameData.tasks.length) return;

    const updatedGameData = { ...gameData };

    if (participant === 1) {
      updatedGameData.participant1Tasks++;
    } else if (participant === 2) {
      updatedGameData.participant2Tasks++;
    } else if (participant === 'together') {
      updatedGameData.togetherTasks++;
      showSupportiveFeedback();
    }

    updatedGameData.completedTasks.push({
      task: gameData.tasks[gameData.currentTaskIndex],
      assignedTo: participant
    });

    updatedGameData.currentTaskIndex++;

    if (updatedGameData.currentTaskIndex >= updatedGameData.tasks.length) {
      // Game completed
      saveGameData(updatedGameData);
      setLocation('/results');
    } else {
      setGameData(updatedGameData);
      saveGameData(updatedGameData);
    }
  };

  const showSupportiveFeedback = () => {
    const randomMessage = supportiveMessages[Math.floor(Math.random() * supportiveMessages.length)];
    setFeedbackMessage(randomMessage);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
    }, 2000);
  };

  if (!gameData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const currentTask = gameData.tasks[gameData.currentTaskIndex];
  const progress = `Task ${gameData.currentTaskIndex + 1} of ${gameData.tasks.length}`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 lg:px-12">
        <div className="flex items-center">
          <span className="text-xl font-medium text-gray-900">Fair Share Game</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
        </nav>
      </header>

      {/* Game Interface */}
      <main className="flex-1 px-6 lg:px-12 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-900 mb-12">Fair Share Game</h1>
          
          {/* Task Card Area */}
          <div className="mb-12">
            {/* Current Task Card */}
            <div className="gradient-task rounded-2xl p-8 lg:p-12 text-center text-white mb-8">
              <div className="mb-6">
                {/* Simple task illustration */}
                <div className="w-full h-48 bg-slate-600 rounded-xl opacity-80 flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <rect x="20" y="30" width="40" height="30" rx="4" fill="currentColor" opacity="0.7"/>
                    <circle cx="30" cy="20" r="8" fill="currentColor" opacity="0.5"/>
                    <circle cx="50" cy="20" r="8" fill="currentColor" opacity="0.5"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-2">{currentTask}</h2>
              <p className="text-lg opacity-75">Household Task</p>
            </div>

            {/* Progress */}
            <div className="text-center text-gray-600 mb-8">
              <span>{progress}</span>
            </div>
          </div>

          {/* Assignment Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Participant 1 */}
            <div 
              className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-200 hover:border-primary transition-colors cursor-pointer min-h-[120px] flex items-center justify-center"
              onClick={() => assignTask(1)}
            >
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{gameData.participant1}</h3>
                <p className="text-gray-600">Click to assign</p>
              </div>
            </div>

            {/* Participant 2 */}
            <div 
              className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-200 hover:border-primary transition-colors cursor-pointer min-h-[120px] flex items-center justify-center"
              onClick={() => assignTask(2)}
            >
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{gameData.participant2}</h3>
                <p className="text-gray-600">Click to assign</p>
              </div>
            </div>
          </div>

          {/* Special Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Button
              variant="secondary"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700"
              onClick={() => assignTask('not-relevant')}
            >
              Not relevant
            </Button>
            <Button
              className="fair-share-green-bg hover:opacity-90 text-white"
              onClick={() => assignTask('together')}
            >
              We both do this
            </Button>
          </div>

          {/* Feedback Message */}
          {showFeedback && (
            <div className="text-center fair-share-green font-medium mb-8">
              <p>{feedbackMessage}</p>
            </div>
          )}

          {/* Task Counter */}
          <div className="flex justify-center space-x-8 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 fair-share-blue-bg rounded-full"></div>
                <span className="font-medium">{gameData.participant1}</span>
              </div>
              <div className="text-2xl font-semibold">{gameData.participant1Tasks}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 fair-share-blue-bg rounded-full"></div>
                <span className="font-medium">{gameData.participant2}</span>
              </div>
              <div className="text-2xl font-semibold">{gameData.participant2Tasks}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 fair-share-green-bg rounded-full"></div>
                <span className="font-medium">Together</span>
              </div>
              <div className="text-2xl font-semibold">{gameData.togetherTasks}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
