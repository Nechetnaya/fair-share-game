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
            <div className="flex items-center justify-center space-x-12">
              {/* Improved illustration of two people sharing household tasks */}
              <svg 
                width="300" 
                height="180" 
                viewBox="0 0 300 180" 
                className="opacity-90"
              >
                {/* Person 1 with cleaning supplies */}
                <g transform="translate(80, 20)">
                  {/* Head */}
                  <circle cx="0" cy="0" r="18" fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="2" />
                  <circle cx="-5" cy="-3" r="2" fill="#1F2937" />
                  <circle cx="5" cy="-3" r="2" fill="#1F2937" />
                  <path d="M -8 8 Q 0 12 8 8" stroke="#1F2937" strokeWidth="1.5" fill="none" />
                  {/* Body */}
                  <rect x="-15" y="18" width="30" height="45" rx="8" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2" />
                  <rect x="-8" y="28" width="16" height="25" fill="#DBEAFE" rx="3" />
                  {/* Arms */}
                  <rect x="-25" y="25" width="10" height="30" rx="5" fill="#F3E8FF" />
                  <rect x="15" y="25" width="10" height="30" rx="5" fill="#F3E8FF" />
                  {/* Cleaning bucket */}
                  <rect x="25" y="40" width="12" height="15" rx="2" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
                  <ellipse cx="31" cy="40" rx="6" ry="2" fill="#93C5FD" />
                  {/* Legs */}
                  <rect x="-8" y="63" width="6" height="25" rx="3" fill="#6366F1" />
                  <rect x="2" y="63" width="6" height="25" rx="3" fill="#6366F1" />
                  {/* Feet */}
                  <ellipse cx="-5" cy="92" rx="8" ry="4" fill="#374151" />
                  <ellipse cx="5" cy="92" rx="8" ry="4" fill="#374151" />
                </g>
                
                {/* Person 2 with vacuum */}
                <g transform="translate(220, 20)">
                  {/* Head */}
                  <circle cx="0" cy="0" r="18" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
                  <circle cx="-5" cy="-3" r="2" fill="#1F2937" />
                  <circle cx="5" cy="-3" r="2" fill="#1F2937" />
                  <path d="M -8 8 Q 0 12 8 8" stroke="#1F2937" strokeWidth="1.5" fill="none" />
                  {/* Body */}
                  <rect x="-15" y="18" width="30" height="45" rx="8" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
                  <rect x="-8" y="28" width="16" height="25" fill="#A7F3D0" rx="3" />
                  {/* Arms */}
                  <rect x="-25" y="25" width="10" height="30" rx="5" fill="#ECFDF5" />
                  <rect x="15" y="25" width="10" height="30" rx="5" fill="#ECFDF5" />
                  {/* Vacuum cleaner */}
                  <rect x="-35" y="35" width="8" height="35" rx="4" fill="#374151" />
                  <circle cx="-31" cy="72" r="5" fill="#6B7280" />
                  <rect x="-29" y="30" width="4" height="10" fill="#9CA3AF" />
                  {/* Legs */}
                  <rect x="-8" y="63" width="6" height="25" rx="3" fill="#10B981" />
                  <rect x="2" y="63" width="6" height="25" rx="3" fill="#10B981" />
                  {/* Feet */}
                  <ellipse cx="-5" cy="92" rx="8" ry="4" fill="#374151" />
                  <ellipse cx="5" cy="92" rx="8" ry="4" fill="#374151" />
                </g>
                
                {/* Floating hearts to show collaboration */}
                <g opacity="0.6">
                  <path d="M 150 40 C 145 35, 135 35, 150 50 C 165 35, 155 35, 150 40 Z" fill="#F87171" />
                  <path d="M 130 80 C 127 77, 123 77, 130 85 C 137 77, 133 77, 130 80 Z" fill="#FB7185" />
                  <path d="M 170 75 C 167 72, 163 72, 170 80 C 177 72, 173 72, 170 75 Z" fill="#F472B6" />
                </g>
              </svg>
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
