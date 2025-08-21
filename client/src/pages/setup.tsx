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
      participant1: gameData.participant1 || 'Участник 1',
      participant2: gameData.participant2 || 'Участник 2',
      tasks: taskList.map(task => task.name),
      currentTaskIndex: 0
    };

    saveGameData(updatedGameData);
    setLocation('/game');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex justify-between items-center p-6 lg:px-12 lg:py-8">
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-foreground">Fair Share Game</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Главная
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            О игре
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Контакты
          </a>
        </nav>
      </header>

      {/* Setup Form */}
      <main className="flex-1 flex items-center justify-center px-6 lg:px-12 py-12">
        <div className="max-w-lg w-full">
          <div className="fs-card rounded-2xl p-8 space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-semibold text-foreground">Настройка игры</h1>
              <p className="text-muted-foreground">
                Расскажите немного о себе для персонализации игры
              </p>
            </div>

            <div className="space-y-8">
              {/* Participant Names */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Участники</h3>
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Имя первого участника"
                    value={gameData.participant1}
                    onChange={(e) => setGameData(prev => ({ ...prev, participant1: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-base bg-background border-2 border-border focus:border-primary focus:ring-0 transition-colors"
                  />
                  <Input
                    type="text"
                    placeholder="Имя второго участника"
                    value={gameData.participant2}
                    onChange={(e) => setGameData(prev => ({ ...prev, participant2: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-base bg-background border-2 border-border focus:border-primary focus:ring-0 transition-colors"
                  />
                </div>
              </div>

              {/* Household Conditions */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Тип жилья</h3>
                
                {/* Home Type */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={gameData.homeType === 'house' ? 'default' : 'outline'}
                    className={`py-4 rounded-xl text-base font-medium transition-all ${
                      gameData.homeType === 'house' 
                        ? 'fs-primary-bg text-white shadow-lg hover:opacity-90' 
                        : 'border-2 hover:border-primary bg-card'
                    }`}
                    onClick={() => handleHomeTypeSelect('house')}
                  >
                    🏠 Дом
                  </Button>
                  <Button
                    type="button"
                    variant={gameData.homeType === 'apartment' ? 'default' : 'outline'}
                    className={`py-4 rounded-xl text-base font-medium transition-all ${
                      gameData.homeType === 'apartment' 
                        ? 'fs-primary-bg text-white shadow-lg hover:opacity-90' 
                        : 'border-2 hover:border-primary bg-card'
                    }`}
                    onClick={() => handleHomeTypeSelect('apartment')}
                  >
                    🏢 Квартира
                  </Button>
                </div>
              </div>

              {/* Additional Conditions */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Дополнительные условия</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id="children"
                      checked={gameData.hasChildren}
                      onCheckedChange={(checked) => 
                        setGameData(prev => ({ ...prev, hasChildren: !!checked }))
                      }
                      className="data-[state=checked]:fs-primary-bg border-2"
                    />
                    <label htmlFor="children" className="text-foreground cursor-pointer font-medium flex-1">
                      👶 Есть дети
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id="pets"
                      checked={gameData.hasPets}
                      onCheckedChange={(checked) => 
                        setGameData(prev => ({ ...prev, hasPets: !!checked }))
                      }
                      className="data-[state=checked]:fs-primary-bg border-2"
                    />
                    <label htmlFor="pets" className="text-foreground cursor-pointer font-medium flex-1">
                      🐕 Есть питомцы
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id="car"
                      checked={gameData.hasCar}
                      onCheckedChange={(checked) => 
                        setGameData(prev => ({ ...prev, hasCar: !!checked }))
                      }
                      className="data-[state=checked]:fs-primary-bg border-2"
                    />
                    <label htmlFor="car" className="text-foreground cursor-pointer font-medium flex-1">
                      🚗 Есть автомобиль
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleNext}
              className="w-full fs-primary-bg text-white py-4 text-lg font-medium rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg"
              disabled={!gameData.participant1 || !gameData.participant2}
            >
              Начать игру
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}