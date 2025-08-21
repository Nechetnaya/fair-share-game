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

// Modern Task Card Component
function TaskCard({ task, className }: { task: string; className?: string }) {
  return (
    <div className={`fs-task-card rounded-2xl p-6 text-center transition-all ${className}`}>
      <div className="mb-4">
        {/* Modern minimalist task illustration */}
        <div className="w-full h-32 fs-gradient-hero rounded-xl flex items-center justify-center">
          <div className="relative">
            {/* Simple modern task icon based on context */}
            <div className="w-16 h-12 bg-card rounded-lg shadow-sm relative border border-border">
              <div className="w-12 h-8 bg-muted rounded-md absolute top-2 left-2"></div>
              <div className="w-3 h-3 fs-primary-bg rounded-full absolute top-1 right-2"></div>
              <div className="w-2 h-4 bg-muted-foreground absolute bottom-0 left-6"></div>
            </div>
            {/* Simple accent elements */}
            <div className="absolute -right-3 top-2 w-5 h-5 bg-card rounded-full border-2 border-border shadow-sm"></div>
            <div className="absolute -right-1 top-6 w-3 h-3 bg-card rounded-full border-2 border-border shadow-sm"></div>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold text-foreground mb-2">{task}</h2>
      <p className="text-sm text-muted-foreground">Домашняя задача</p>
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

// Droppable Area Component
function DroppableArea({ 
  id, 
  children, 
  className 
}: { 
  id: string; 
  children: React.ReactNode; 
  className?: string;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
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
    } else if (droppableId === 'together') {
      assignTask('together');
    } else if (droppableId === 'not-relevant') {
      assignTask('not-relevant');
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-2 mb-8">
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
            <div className="flex justify-center mb-12">
              <div className="max-w-md w-full">
                <DraggableTaskCard 
                  task={currentTask} 
                  id="current-task"
                />
                <p className="text-center text-muted-foreground mt-4 text-sm">
                  Перетащите карточку в нужную область
                </p>
              </div>
            </div>

            {/* Drop Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Participant 1 */}
              <DroppableArea
                id="participant1"
                className="fs-drop-zone rounded-2xl p-8 text-center min-h-[140px] flex items-center justify-center"
              >
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 fs-primary-bg/10 rounded-full flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{gameData.participant1}</h3>
                  <p className="text-sm text-muted-foreground">Перетащите задачу сюда</p>
                </div>
              </DroppableArea>

              {/* Participant 2 */}
              <DroppableArea
                id="participant2"
                className="fs-drop-zone rounded-2xl p-8 text-center min-h-[140px] flex items-center justify-center"
              >
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 fs-success-bg/10 rounded-full flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{gameData.participant2}</h3>
                  <p className="text-sm text-muted-foreground">Перетащите задачу сюда</p>
                </div>
              </DroppableArea>
            </div>

            {/* Special Drop Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <DroppableArea
                id="not-relevant"
                className="bg-muted/50 hover:bg-muted/70 rounded-xl p-6 text-center border-2 border-dashed border-muted-foreground/30 transition-all min-h-[100px] flex items-center justify-center"
              >
                <div>
                  <div className="w-12 h-12 mx-auto mb-3 bg-muted-foreground/10 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <p className="font-medium text-muted-foreground">Неактуально</p>
                </div>
              </DroppableArea>

              <DroppableArea
                id="together"
                className="fs-success-bg hover:opacity-90 rounded-xl p-6 text-center border-2 border-dashed border-success transition-all min-h-[100px] flex items-center justify-center text-white"
              >
                <div>
                  <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="m22 21-3-3m0 0a5 5 0 0 0-7 0 5 5 0 0 0 7 0z"></path>
                    </svg>
                  </div>
                  <p className="font-medium">Делаем вместе</p>
                </div>
              </DroppableArea>
            </div>

            {/* Feedback Message */}
            {showFeedback && (
              <div className="text-center mb-8">
                <div className="inline-block fs-success-bg/10 border border-success/20 rounded-xl p-4 animate-pulse">
                  <p className="text-success font-medium">{feedbackMessage}</p>
                </div>
              </div>
            )}

            {/* Task Counter */}
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="fs-card rounded-xl p-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-3 h-3 fs-primary-bg rounded-full"></div>
                    <span className="font-medium text-foreground text-sm">{gameData.participant1}</span>
                  </div>
                  <div className="text-3xl font-semibold text-primary">{gameData.participant1Tasks}</div>
                </div>
                <div className="fs-card rounded-xl p-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-3 h-3 fs-success-bg rounded-full"></div>
                    <span className="font-medium text-foreground text-sm">{gameData.participant2}</span>
                  </div>
                  <div className="text-3xl font-semibold text-success">{gameData.participant2Tasks}</div>
                </div>
                <div className="fs-card rounded-xl p-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-3 h-3 fs-success-bg rounded-full"></div>
                    <span className="font-medium text-foreground text-sm">Вместе</span>
                  </div>
                  <div className="text-3xl font-semibold text-success">{gameData.togetherTasks}</div>
                </div>
              </div>
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