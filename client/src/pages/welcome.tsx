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
          <a href="#" className="text-gray-600 hover:text-gray-900">How it works</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
          <Button 
            className="fair-share-blue-bg text-white hover:opacity-90"
            onClick={() => setLocation('/setup')}
          >
            Play
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
            See how household responsibilities are shared
          </p>
          
          {/* Hero Image */}
          <div className="gradient-hero rounded-2xl p-12 lg:p-16 my-12">
            <div className="flex items-center justify-center space-x-8">
              {/* Simple SVG illustration of two people doing chores */}
              <svg 
                width="200" 
                height="120" 
                viewBox="0 0 200 120" 
                className="opacity-80"
              >
                {/* Person 1 with cleaning supplies */}
                <circle cx="60" cy="30" r="15" fill="#6B7280" />
                <rect x="45" y="45" width="30" height="40" rx="5" fill="#E5E7EB" />
                <rect x="55" y="55" width="10" height="20" fill="#4A9EFF" />
                <rect x="40" y="35" width="8" height="25" rx="4" fill="#F59E0B" />
                
                {/* Person 2 with vacuum */}
                <circle cx="140" cy="30" r="15" fill="#6B7280" />
                <rect x="125" y="45" width="30" height="40" rx="5" fill="#10B981" />
                <rect x="135" y="55" width="10" height="20" fill="#6366F1" />
                <rect x="155" y="40" width="12" height="30" rx="6" fill="#374151" />
              </svg>
            </div>
          </div>

          <Button 
            size="lg"
            className="fair-share-blue-bg text-white px-8 py-3 text-lg font-medium hover:opacity-90"
            onClick={() => setLocation('/setup')}
          >
            Start
          </Button>
        </div>
      </main>
    </div>
  );
}
