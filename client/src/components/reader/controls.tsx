import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  PlayIcon,
  PauseIcon,
  RotateCcwIcon,
  RotateCwIcon,
  RefreshCwIcon,
} from "lucide-react";

interface ControlsProps {
  isPlaying: boolean;
  wpm: number;
  progress: number;
  onPlayPause: () => void;
  onWPMChange: (wpm: number) => void;
  onRewind: () => void;
  onForward: () => void;
  onReset: () => void;
}

export default function Controls({
  isPlaying,
  wpm,
  progress,
  onPlayPause,
  onWPMChange,
  onRewind,
  onForward,
  onReset,
}: ControlsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onRewind}
        >
          <RotateCcwIcon className="h-4 w-4" />
        </Button>
        
        <Button
          size="icon"
          onClick={onPlayPause}
          className="h-12 w-12"
        >
          {isPlaying ? (
            <PauseIcon className="h-6 w-6" />
          ) : (
            <PlayIcon className="h-6 w-6" />
          )}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onForward}
        >
          <RotateCwIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Reading Speed</span>
          <span className="text-sm font-medium">{wpm} WPM</span>
        </div>
        <Slider
          value={[wpm]}
          min={100}
          max={1000}
          step={10}
          onValueChange={(value) => onWPMChange(value[0])}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Progress</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 px-2"
          >
            <RefreshCwIcon className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
        <Progress value={progress} />
      </div>
    </div>
  );
}
