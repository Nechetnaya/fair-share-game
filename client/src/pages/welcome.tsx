import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 lg:px-12">
        <div className="flex items-center">
          <span className="text-xl font-medium text-gray-900">Fair Share</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">Как это работает</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">О игре</a>
          <Button 
            className="fair-share-blue-bg text-white hover:opacity-90"
            onClick={() => setLocation('/setup')}
          >
            Играть
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 -mt-20">
        <div className="max-w-2xl w-full text-center space-y-8">
          <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
            Fair Share Game
          </h1>
          <p className="text-lg text-gray-600">
            Узнайте, как распределяются домашние обязанности
          </p>
          
          {/* Hero Image */}
          <div className="gradient-hero rounded-2xl p-12 lg:p-16 my-12">
            <div className="flex items-center justify-center">
              {/* Simple minimalist illustration like in Figma */}
              <div className="relative bg-gray-100 rounded-2xl p-12 w-full max-w-lg h-48 flex items-center justify-center">
                {/* Simple kitchen scene */}
                <div className="relative">
                  {/* Kitchen counter */}
                  <div className="w-32 h-16 bg-gray-300 rounded-lg relative">
                    {/* Sink */}
                    <div className="w-20 h-12 bg-gray-400 rounded-md absolute top-2 left-6">
                      <div className="w-16 h-8 bg-gray-200 rounded-sm absolute top-2 left-2"></div>
                      <div className="w-3 h-3 bg-blue-300 rounded-full absolute top-1 right-2"></div>
                    </div>
                    {/* Tap */}
                    <div className="w-2 h-6 bg-gray-500 absolute -top-4 left-12"></div>
                    <div className="w-4 h-2 bg-gray-500 rounded-t-full absolute -top-6 left-11"></div>
                  </div>
                  
                  {/* Simple dishes */}
                  <div className="absolute -right-6 top-0 space-y-1">
                    <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-300 shadow-sm"></div>
                    <div className="w-5 h-5 bg-white rounded-full border-2 border-gray-300 shadow-sm"></div>
                    <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-300 shadow-sm"></div>
                  </div>
                  
                  {/* Simple cleaning items */}
                  <div className="absolute -left-6 top-2 space-y-2">
                    <div className="w-3 h-8 bg-yellow-300 rounded-full"></div>
                    <div className="w-4 h-6 bg-green-300 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button 
            size="lg"
            className="fair-share-blue-bg text-white px-8 py-3 text-lg font-medium hover:opacity-90"
            onClick={() => setLocation('/setup')}
          >
            Начать
          </Button>
        </div>
      </main>
    </div>
  );
}
