import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { saveGameData, createInitialGameData } from "@/lib/game-storage";
import { generateTasks } from "@/lib/tasks";
import { GameData } from "@shared/schema";

export default function SetupPage() {
  const [, setLocation] = useLocation();
  const [gameData, setGameData] = useState<GameData>(createInitialGameData());

  const handleHomeTypeSelect = (type: 'house' | 'apartment') => {
    setGameData(prev => ({ ...prev, homeType: type }));
  };

  const handleNext = () => {
    // Generate tasks based on conditions
    const taskList = generateTasks({
      homeType: gameData.homeType,
      hasChildren: gameData.hasChildren,
      hasPets: gameData.hasPets,
      hasCar: gameData.hasCar
    });

    const updatedGameData = {
      ...gameData,
      participant1: gameData.participant1 || 'Participant 1',
      participant2: gameData.participant2 || 'Participant 2',
      tasks: taskList.map(task => task.name),
      currentTaskIndex: 0
    };

    saveGameData(updatedGameData);
    setLocation('/game');
  };

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

      {/* Setup Form */}
      <main className="flex-1 flex items-center justify-center px-6 lg:px-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Setup your game</h1>
          </div>

          <div className="space-y-6">
            {/* Participant Names */}
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Participant 1 Name"
                value={gameData.participant1}
                onChange={(e) => setGameData(prev => ({ ...prev, participant1: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Input
                type="text"
                placeholder="Participant 2 Name"
                value={gameData.participant2}
                onChange={(e) => setGameData(prev => ({ ...prev, participant2: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Household Conditions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Household Conditions</h3>
              
              {/* Home Type */}
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant={gameData.homeType === 'house' ? 'default' : 'outline'}
                  className={`flex-1 ${gameData.homeType === 'house' ? 'fair-share-blue-bg text-white' : ''}`}
                  onClick={() => handleHomeTypeSelect('house')}
                >
                  House
                </Button>
                <Button
                  type="button"
                  variant={gameData.homeType === 'apartment' ? 'default' : 'outline'}
                  className={`flex-1 ${gameData.homeType === 'apartment' ? 'fair-share-blue-bg text-white' : ''}`}
                  onClick={() => handleHomeTypeSelect('apartment')}
                >
                  Apartment
                </Button>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="children"
                    checked={gameData.hasChildren}
                    onCheckedChange={(checked) => 
                      setGameData(prev => ({ ...prev, hasChildren: !!checked }))
                    }
                  />
                  <label htmlFor="children" className="text-gray-700 cursor-pointer">
                    Children
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="pets"
                    checked={gameData.hasPets}
                    onCheckedChange={(checked) => 
                      setGameData(prev => ({ ...prev, hasPets: !!checked }))
                    }
                  />
                  <label htmlFor="pets" className="text-gray-700 cursor-pointer">
                    Pets
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="car"
                    checked={gameData.hasCar}
                    onCheckedChange={(checked) => 
                      setGameData(prev => ({ ...prev, hasCar: !!checked }))
                    }
                  />
                  <label htmlFor="car" className="text-gray-700 cursor-pointer">
                    Car
                  </label>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleNext}
              className="w-full fair-share-blue-bg text-white px-6 py-3 font-medium hover:opacity-90"
              disabled={!gameData.homeType}
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
