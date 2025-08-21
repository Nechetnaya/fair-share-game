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
          
          {/* Hero Illustration */}
          <div className="fs-gradient-hero rounded-3xl p-16 my-16">
            <div className="flex items-center justify-center">
              {/* Modern minimalist household scene */}
              <div className="relative w-full max-w-md h-64 flex items-center justify-center">
                {/* Modern kitchen counter scene */}
                <div className="relative">
                  {/* Main kitchen island */}
                  <div className="w-40 h-20 bg-card rounded-2xl shadow-lg relative border border-border">
                    {/* Sink area */}
                    <div className="absolute top-3 left-8 w-24 h-14 bg-muted rounded-xl">
                      <div className="w-20 h-10 bg-card rounded-lg absolute top-2 left-2 shadow-inner"></div>
                      <div className="w-2 h-2 fs-primary-bg rounded-full absolute top-1 right-2"></div>
                    </div>
                    {/* Modern faucet */}
                    <div className="absolute -top-6 left-16 w-1 h-8 bg-muted-foreground rounded-full"></div>
                    <div className="absolute -top-8 left-14 w-5 h-3 bg-muted-foreground rounded-t-full"></div>
                  </div>
                  
                  {/* Floating dishes - modern style */}
                  <div className="absolute -right-8 top-0 space-y-2">
                    <div className="w-8 h-8 bg-card rounded-full border-2 border-muted shadow-md"></div>
                    <div className="w-6 h-6 bg-card rounded-full border-2 border-muted shadow-md"></div>
                    <div className="w-5 h-5 bg-card rounded-full border-2 border-muted shadow-md"></div>
                  </div>
                  
                  {/* Modern cleaning supplies */}
                  <div className="absolute -left-8 top-4 space-y-3">
                    <div className="w-4 h-10 fs-success-bg rounded-full shadow-sm"></div>
                    <div className="w-5 h-8 fs-neutral-bg rounded-xl shadow-sm"></div>
                  </div>
                  
                  {/* Subtle accent elements */}
                  <div className="absolute top-16 left-20 w-2 h-2 fs-primary-bg rounded-full opacity-60"></div>
                  <div className="absolute top-18 left-8 w-1 h-1 fs-success-bg rounded-full opacity-40"></div>
                  <div className="absolute top-14 right-2 w-1 h-1 fs-neutral-bg rounded-full opacity-50"></div>
                </div>
              </div>
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