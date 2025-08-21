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

// Simple Task Card Component
function TaskCard({ task, className }: { task: string; className?: string }) {
  return (
    <div className={`bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200 ${className}`}>
      <div className="mb-4">
        {/* Simple minimalist kitchen/household illustration like in Figma */}
        <div className="w-full h-32 bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
          <div className="relative">
            {/* Simple kitchen sink illustration */}
            <div className="w-16 h-12 bg-gray-400 rounded-lg relative">
              <div className="w-12 h-8 bg-gray-300 rounded-md absolute top-2 left-2"></div>
              <div className="w-3 h-3 bg-blue-300 rounded-full absolute top-1 right-2"></div>
              <div className="w-2 h-4 bg-gray-500 absolute bottom-0 left-6"></div>
            </div>
            {/* Simple dishes */}
            <div className="absolute -right-4 top-2 w-6 h-6 bg-gray-200 rounded-full border-2 border-gray-300"></div>
            <div className="absolute -right-2 top-6 w-4 h-4 bg-gray-200 rounded-full border-2 border-gray-300"></div>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">{task}</h2>
      <p className="text-sm text-gray-500">Домашняя задача</p>
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
        isDragging ? 'opacity-50 scale-95' : 'hover:scale-102'
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
        isOver ? 'border-blue-400 bg-blue-50 scale-102' : ''
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
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
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
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 lg:px-12">
          <div className="flex items-center">
            <span className="text-xl font-medium text-gray-900">Fair Share Game</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">Главная</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">О игре</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Контакты</a>
          </nav>
        </header>

        {/* Game Interface */}
        <main className="flex-1 px-6 lg:px-12 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Fair Share Game</h1>
            
            {/* Progress */}
            <div className="text-center text-gray-600 mb-8">
              <span className="text-lg">{progress}</span>
            </div>

            {/* Current Task Card */}
            <div className="flex justify-center mb-12">
              <div className="max-w-md w-full">
                <DraggableTaskCard 
                  task={currentTask} 
                  id="current-task"
                />
              </div>
            </div>

            {/* Drop Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Participant 1 */}
              <DroppableArea
                id="participant1"
                className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-200 hover:border-blue-400 transition-all min-h-[120px] flex items-center justify-center"
              >
                <div>
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{gameData.participant1}</h3>
                  <p className="text-sm text-gray-600">Перетащите сюда задачу</p>
                </div>
              </DroppableArea>

              {/* Participant 2 */}
              <DroppableArea
                id="participant2"
                className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-200 hover:border-blue-400 transition-all min-h-[120px] flex items-center justify-center"
              >
                <div>
                  <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{gameData.participant2}</h3>
                  <p className="text-sm text-gray-600">Перетащите сюда задачу</p>
                </div>
              </DroppableArea>
            </div>

            {/* Special Drop Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <DroppableArea
                id="not-relevant"
                className="bg-gray-100 hover:bg-gray-200 rounded-xl p-6 text-center border-2 border-dashed border-gray-300 transition-all min-h-[80px] flex items-center justify-center"
              >
                <div>
                  <div className="w-10 h-10 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <p className="font-medium text-gray-700">Неактуально</p>
                </div>
              </DroppableArea>

              <DroppableArea
                id="together"
                className="fair-share-green-bg hover:opacity-90 rounded-xl p-6 text-center border-2 border-dashed border-green-400 transition-all min-h-[80px] flex items-center justify-center text-white"
              >
                <div>
                  <div className="w-10 h-10 mx-auto mb-2 bg-green-200 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-700">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="m22 21-3-3m0 0a5 5 0 0 0-12-2 4 4 0 0 0-1 7.5"></path>
                    </svg>
                  </div>
                  <p className="font-medium">Делаем вместе</p>
                </div>
              </DroppableArea>
            </div>

            {/* Feedback Message */}
            {showFeedback && (
              <div className="text-center fair-share-green font-medium mb-8 animate-pulse">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800">{feedbackMessage}</p>
                </div>
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
                  <span className="font-medium">Вместе</span>
                </div>
                <div className="text-2xl font-semibold">{gameData.togetherTasks}</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <DragOverlay>
        {activeId ? <TaskCard task={currentTask} className="rotate-3 shadow-2xl" /> : null}
      </DragOverlay>
    </DndContext>
  );
}