import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { loadGameData, saveGameData } from "@/lib/game-storage";
import { supportiveMessages } from "@/lib/tasks";
import { GameData } from "@shared/schema";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';

// Simplified Task Card Component with gradient and no images
function TaskCard({ task, className }: { task: string; className?: string }) {
  return (
    <div className={`fs-gradient-hero rounded-2xl p-8 text-center transition-all ${className}`}>
      <div className="space-y-4">
        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Домашняя задача
        </div>
        <h2 className="text-2xl font-semibold text-foreground leading-tight">{task}</h2>
      </div>
    </div>
  );
}

// Draggable Task Card Component
function DraggableTaskCard({ task, id }: { task: string; id: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab select-none transition-all ${
        isDragging ? 'opacity-50 scale-95' : 'hover:scale-[1.02]'
      }`}
    >
      <TaskCard task={task} />
    </div>
  );
}

// Droppable Area Component for participants
function ParticipantDropArea({ 
  id, 
  children, 
  className,
  style
}: { 
  id: string; 
  children: React.ReactNode; 
  className?: string;
  style?: React.CSSProperties;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${className} ${
        isOver ? 'border-primary scale-[1.02] shadow-lg' : ''
      } transition-all duration-200`}
    >
      {children}
    </div>
  );
}

export default function GamePage() {
  const [, setLocation] = useLocation();
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    const data = loadGameData();
    if (!data || data.tasks.length === 0) {
      setLocation('/setup');
      return;
    }
    setGameData(data);
  }, [setLocation]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || !gameData) return;

    const droppableId = over.id as string;
    
    if (droppableId === 'participant1') {
      assignTask(1);
    } else if (droppableId === 'participant2') {
      assignTask(2);
    }
  };

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
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Загрузка игры...</p>
      </div>
    </div>;
  }

  const currentTask = gameData.tasks[gameData.currentTaskIndex];
  const progress = `Задача ${gameData.currentTaskIndex + 1} из ${gameData.tasks.length}`;

  // Calculate gradient intensity based on task count - darker with each task
  const getParticipantGradient = (taskCount: number, isPlayer1: boolean = true) => {
    if (taskCount === 0) {
      return isPlayer1 
        ? `linear-gradient(145deg, hsl(219, 100%, 98%), hsl(219, 100%, 95%))` 
        : `linear-gradient(145deg, hsl(142, 69%, 98%), hsl(142, 69%, 95%))`;
    }
    
    // Each task makes it progressively darker
    const darkenAmount = taskCount * 8;
    return isPlayer1 
      ? `linear-gradient(145deg, hsl(219, 100%, ${98 - darkenAmount}%), hsl(219, 100%, ${95 - darkenAmount - 5}%))` 
      : `linear-gradient(145deg, hsl(142, 69%, ${98 - darkenAmount}%), hsl(142, 69%, ${95 - darkenAmount - 5}%))`;
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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

        {/* Game Interface */}
        <main className="flex-1 px-6 lg:px-12 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-2 mb-12">
              <h1 className="text-3xl font-semibold text-foreground">Fair Share Game</h1>
              <div className="flex items-center justify-center space-x-4">
                <div className="text-muted-foreground text-lg">{progress}</div>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full fs-primary-bg transition-all duration-500"
                    style={{ 
                      width: `${((gameData.currentTaskIndex) / gameData.tasks.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Current Task Card */}
            <div className="flex justify-center mb-8">
              <div className="max-w-lg w-full">
                <DraggableTaskCard 
                  task={currentTask} 
                  id="current-task"
                />
              </div>
            </div>

            {/* Action Buttons under task card */}
            <div className="flex justify-center space-x-4 mb-12">
              <Button
                onClick={() => assignTask('not-relevant')}
                variant="outline"
                className="px-6 py-2 text-sm rounded-full border-2 hover:bg-muted/50 transition-colors"
              >
                ❌ Неактуально
              </Button>
              <Button
                onClick={() => assignTask('together')}
                className="fs-success-bg text-white px-6 py-2 text-sm rounded-full hover:opacity-90 transition-opacity"
              >
                🤝 Делаем вместе
              </Button>
            </div>

            {/* Feedback Message */}
            {showFeedback && (
              <div className="text-center mb-8">
                <div className="inline-block fs-success-bg/10 border border-success/20 rounded-xl p-4 animate-pulse">
                  <p className="text-success font-medium">{feedbackMessage}</p>
                </div>
              </div>
            )}

            {/* Participant Drop Areas with gradient and counters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Participant 1 */}
              <ParticipantDropArea
                id="participant1"
                className="rounded-2xl p-6 text-center min-h-[120px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 transition-all"
                style={{
                  background: getParticipantGradient(gameData.participant1Tasks, true)
                }}
              >
                <div>
                  <div className="w-8 h-8 mx-auto mb-2 fs-primary-bg/10 rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="font-medium text-foreground text-sm mb-1">{gameData.participant1}</h3>
                  <div className="text-2xl font-bold text-primary mb-2">{gameData.participant1Tasks}</div>
                  <p className="text-xs text-muted-foreground">Перетащите задачу сюда</p>
                </div>
              </ParticipantDropArea>

              {/* Participant 2 */}
              <ParticipantDropArea
                id="participant2"
                className="rounded-2xl p-6 text-center min-h-[120px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 transition-all"
                style={{
                  background: getParticipantGradient(gameData.participant2Tasks, false)
                }}
              >
                <div>
                  <div className="w-8 h-8 mx-auto mb-2 fs-success-bg/10 rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="font-medium text-foreground text-sm mb-1">{gameData.participant2}</h3>
                  <div className="text-2xl font-bold text-success mb-2">{gameData.participant2Tasks}</div>
                  <p className="text-xs text-muted-foreground">Перетащите задачу сюда</p>
                </div>
              </ParticipantDropArea>
            </div>
          </div>
        </main>
      </div>

      <DragOverlay>
        {activeId ? <TaskCard task={currentTask} className="rotate-3 shadow-2xl scale-110" /> : null}
      </DragOverlay>
    </DndContext>
  );
}