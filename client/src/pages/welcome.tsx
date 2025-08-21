import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import HeroImage from "@/assets/main_pic.jpg";

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

        {/* Hero Illustration - JPG */}
        <div className="fs-gradient-hero rounded-3xl p-16 my-16 flex justify-center">
          <img
            src={HeroImage}
            alt="Fair Share Game Hero"
            className="w-full max-w-lg rounded-2xl object-cover opacity-70"
          />
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