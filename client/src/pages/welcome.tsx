import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  const [, setLocation] = useLocation();

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
            onClick={() => setLocation('/setup')}
          >
            Играть
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 pt-12 pb-20">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
              Fair Share Game
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Интерактивная игра для справедливого распределения домашних обязанностей
            </p>
          </div>
          
          {/* Hero Illustration - Complete household scene */}
          <div className="fs-gradient-hero rounded-3xl p-16 my-16">
            <div className="flex items-center justify-center">
              <svg width="400" height="280" viewBox="0 0 400 280" className="w-full max-w-lg">
                {/* Background room */}
                <rect x="0" y="150" width="400" height="130" fill="hsl(210, 20%, 95%)" />
                <rect x="0" y="0" width="400" height="150" fill="hsl(210, 30%, 97%)" />
                
                {/* Kitchen counter */}
                <rect x="50" y="120" width="120" height="60" fill="hsl(210, 15%, 85%)" stroke="hsl(210, 20%, 80%)" strokeWidth="2" rx="8" />
                
                {/* Kitchen sink */}
                <rect x="70" y="130" width="80" height="40" fill="hsl(210, 25%, 90%)" rx="6" />
                <rect x="75" y="135" width="70" height="30" fill="hsl(210, 30%, 95%)" rx="4" />
                <circle cx="85" cy="145" r="3" fill="hsl(219, 100%, 62%)" />
                
                {/* Faucet */}
                <rect x="105" y="115" width="4" height="15" fill="hsl(210, 15%, 60%)" rx="2" />
                <path d="M100 115 Q107 110 114 115" stroke="hsl(210, 15%, 60%)" strokeWidth="3" fill="none" />
                
                {/* Dishes stack */}
                <g transform="translate(180, 125)">
                  <circle cx="0" cy="0" r="12" fill="hsl(0, 0%, 100%)" stroke="hsl(210, 15%, 85%)" strokeWidth="2" />
                  <circle cx="0" cy="-3" r="12" fill="hsl(0, 0%, 100%)" stroke="hsl(210, 15%, 85%)" strokeWidth="2" />
                  <circle cx="0" cy="-6" r="12" fill="hsl(0, 0%, 100%)" stroke="hsl(210, 15%, 85%)" strokeWidth="2" />
                </g>
                
                {/* Cleaning supplies */}
                <g transform="translate(25, 140)">
                  <rect x="0" y="0" width="8" height="25" fill="hsl(142, 69%, 48%)" rx="4" />
                  <rect x="10" y="5" width="10" height="20" fill="hsl(45, 93%, 58%)" rx="2" />
                  <circle cx="4" cy="-3" r="3" fill="hsl(142, 69%, 65%)" />
                </g>
                
                {/* Table */}
                <rect x="220" y="140" width="100" height="8" fill="hsl(30, 25%, 75%)" rx="4" />
                <rect x="240" y="148" width="4" height="30" fill="hsl(30, 25%, 70%)" />
                <rect x="276" y="148" width="4" height="30" fill="hsl(30, 25%, 70%)" />
                
                {/* Chair */}
                <rect x="250" y="115" width="25" height="35" fill="hsl(210, 15%, 80%)" rx="3" />
                <rect x="250" y="145" width="25" height="4" fill="hsl(210, 15%, 75%)" />
                <rect x="250" y="150" width="4" height="25" fill="hsl(210, 15%, 75%)" />
                <rect x="271" y="150" width="4" height="25" fill="hsl(210, 15%, 75%)" />
                
                {/* Person 1 doing dishes */}
                <g transform="translate(90, 80)">
                  <circle cx="0" cy="0" r="15" fill="hsl(25, 50%, 85%)" stroke="hsl(25, 50%, 75%)" strokeWidth="2" />
                  <circle cx="-4" cy="-3" r="2" fill="hsl(210, 25%, 25%)" />
                  <circle cx="4" cy="-3" r="2" fill="hsl(210, 25%, 25%)" />
                  <path d="M -6 6 Q 0 10 6 6" stroke="hsl(210, 25%, 25%)" strokeWidth="1.5" fill="none" />
                  <path d="M -15 -8 Q 0 -20 15 -8" fill="hsl(30, 40%, 60%)" />
                  <rect x="-12" y="15" width="24" height="35" fill="hsl(219, 100%, 85%)" rx="12" />
                  <rect x="-20" y="20" width="8" height="25" fill="hsl(25, 50%, 85%)" rx="4" />
                  <rect x="12" y="20" width="8" height="25" fill="hsl(25, 50%, 85%)" rx="4" />
                  <circle cx="-24" cy="48" r="4" fill="hsl(25, 50%, 80%)" />
                  <circle cx="16" cy="48" r="4" fill="hsl(25, 50%, 80%)" />
                </g>
                
                {/* Person 2 at table */}
                <g transform="translate(300, 85)">
                  <circle cx="0" cy="0" r="15" fill="hsl(25, 50%, 90%)" stroke="hsl(25, 50%, 80%)" strokeWidth="2" />
                  <circle cx="-4" cy="-3" r="2" fill="hsl(210, 25%, 25%)" />
                  <circle cx="4" cy="-3" r="2" fill="hsl(210, 25%, 25%)" />
                  <path d="M -6 6 Q 0 10 6 6" stroke="hsl(210, 25%, 25%)" strokeWidth="1.5" fill="none" />
                  <path d="M -15 -8 Q 0 -18 15 -8" fill="hsl(20, 50%, 45%)" />
                  <rect x="-12" y="15" width="24" height="35" fill="hsl(142, 69%, 85%)" rx="12" />
                  <rect x="-20" y="20" width="8" height="25" fill="hsl(25, 50%, 90%)" rx="4" />
                  <rect x="12" y="20" width="8" height="25" fill="hsl(25, 50%, 90%)" rx="4" />
                  <circle cx="-16" cy="48" r="4" fill="hsl(25, 50%, 85%)" />
                  <circle cx="16" cy="48" r="4" fill="hsl(25, 50%, 85%)" />
                </g>
                
                {/* Laptop on table */}
                <g transform="translate(270, 130)">
                  <rect x="0" y="0" width="20" height="12" fill="hsl(210, 15%, 65%)" rx="2" />
                  <rect x="1" y="1" width="18" height="10" fill="hsl(210, 30%, 95%)" rx="1" />
                  <rect x="0" y="12" width="20" height="2" fill="hsl(210, 15%, 70%)" rx="1" />
                </g>
                
                {/* Plants for homey feeling */}
                <g transform="translate(350, 120)">
                  <rect x="0" y="15" width="12" height="8" fill="hsl(30, 30%, 70%)" rx="2" />
                  <path d="M 6 15 Q 3 5 6 0 Q 9 5 6 15" fill="hsl(120, 50%, 50%)" />
                  <path d="M 6 15 Q 1 8 0 3 Q 6 8 6 15" fill="hsl(120, 50%, 45%)" />
                  <path d="M 6 15 Q 11 8 12 3 Q 6 8 6 15" fill="hsl(120, 50%, 45%)" />
                </g>
                
                {/* Window */}
                <rect x="320" y="30" width="60" height="80" fill="hsl(200, 50%, 85%)" stroke="hsl(210, 20%, 75%)" strokeWidth="3" rx="4" />
                <line x1="350" y1="30" x2="350" y2="110" stroke="hsl(210, 20%, 75%)" strokeWidth="2" />
                <line x1="320" y1="70" x2="380" y2="70" stroke="hsl(210, 20%, 75%)" strokeWidth="2" />
                
                {/* Subtle sparkles for cleanliness */}
                <g opacity="0.6">
                  <path d="M 120 60 L 125 65 L 120 70 L 115 65 Z" fill="hsl(45, 100%, 70%)" />
                  <path d="M 160 90 L 163 93 L 160 96 L 157 93 Z" fill="hsl(45, 100%, 70%)" />
                  <path d="M 200 50 L 203 53 L 200 56 L 197 53 Z" fill="hsl(45, 100%, 70%)" />
                </g>
              </svg>
            </div>
          </div>

          <div className="space-y-8">
            <Button 
              size="lg"
              className="fs-primary-bg text-white px-12 py-4 text-lg font-medium rounded-full hover:opacity-90 transition-all hover:scale-105 shadow-lg"
              onClick={() => setLocation('/setup')}
            >
              Начать игру
            </Button>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 fs-success-bg rounded-full"></div>
                <span>Поддерживающая атмосфера</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 fs-primary-bg rounded-full"></div>
                <span>Справедливое распределение</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 fs-neutral-bg rounded-full"></div>
                <span>Научные исследования</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}