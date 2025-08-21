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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка результатов...</p>
        </div>
      </div>
    );
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex justify-between items-center p-6 lg:px-12 lg:py-8">
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-foreground">Fair Share</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Как это работает
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            О игре
          </a>
          <Button 
            className="fs-primary-bg text-white px-6 py-2 text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
            onClick={handlePlayAgain}
          >
            Играть снова
          </Button>
        </nav>
      </header>

      {/* Results */}
      <main className="flex-1 flex items-center justify-center px-6 lg:px-12 py-12">
        <div className="max-w-3xl w-full">
          <div className="text-center space-y-8 mb-12">
            <h1 className="text-4xl font-semibold text-foreground leading-tight">
              Результаты игры
            </h1>
            <p className="text-xl text-muted-foreground">
              Вот как распределяются домашние задачи в вашей семье
            </p>
          </div>
          
          {/* Results Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="fs-card rounded-2xl p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 fs-primary-bg/10 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{gameData.participant1}</h3>
              <div className="text-4xl font-bold text-primary mb-2">{p1Percent}%</div>
              <p className="text-sm text-muted-foreground">{gameData.participant1Tasks} задач</p>
            </div>

            <div className="fs-card rounded-2xl p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 fs-success-bg/10 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{gameData.participant2}</h3>
              <div className="text-4xl font-bold text-success mb-2">{p2Percent}%</div>
              <p className="text-sm text-muted-foreground">{gameData.participant2Tasks} задач</p>
            </div>

            <div className="fs-card rounded-2xl p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 fs-success-bg/10 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="m22 21-3-3m0 0a5 5 0 0 0-7 0 5 5 0 0 0 7 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Вместе</h3>
              <div className="text-4xl font-bold text-success mb-2">{togetherPercent}%</div>
              <p className="text-sm text-muted-foreground">{gameData.togetherTasks} задач</p>
            </div>
          </div>

          {/* Visual Progress Bars */}
          <div className="fs-card rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">Визуализация распределения</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-foreground">{gameData.participant1}</span>
                  <span className="text-lg font-semibold text-primary">{p1Percent}%</span>
                </div>
                <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full fs-primary-bg transition-all duration-1000 ease-out rounded-full"
                    style={{ width: `${p1Percent}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-foreground">{gameData.participant2}</span>
                  <span className="text-lg font-semibold text-success">{p2Percent}%</span>
                </div>
                <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full fs-success-bg transition-all duration-1000 ease-out rounded-full"
                    style={{ width: `${p2Percent}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-foreground">Делаем вместе</span>
                  <span className="text-lg font-semibold text-success">{togetherPercent}%</span>
                </div>
                <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full fs-success-bg transition-all duration-1000 ease-out rounded-full"
                    style={{ width: `${togetherPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Research Quote */}
          <div className="fs-gradient-hero rounded-2xl p-8 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 fs-success-bg/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                  <path d="M10 2v20M14 2v20M4 7h16M4 17h16"/>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">💡 Научные исследования</h4>
                <p className="text-muted-foreground italic text-lg leading-relaxed">{randomQuote}</p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Помните: справедливое распределение домашних обязанностей помогает снизить стресс и повысить благополучие в семье
            </p>
            
            <Button 
              size="lg"
              className="fs-primary-bg text-white px-12 py-4 text-lg font-medium rounded-full hover:opacity-90 transition-all hover:scale-105 shadow-lg"
              onClick={handlePlayAgain}
            >
              Играть снова
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}