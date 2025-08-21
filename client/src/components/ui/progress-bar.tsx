import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  label: string;
  percentage: string;
  className?: string;
  barColor?: string;
}

export function ProgressBar({ 
  value, 
  label, 
  percentage, 
  className,
  barColor = "bg-gray-400"
}: ProgressBarProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{percentage}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={cn("h-3 rounded-full transition-all duration-500", barColor)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
