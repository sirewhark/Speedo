import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  PlayIcon,
  PauseIcon,
  RotateCcwIcon,
  RefreshCwIcon,
} from "lucide-react";

interface ControlsProps {
  isPlaying: boolean;
  wpm: number;
  wordsRead: number;
  totalWords: number;
  onPlayPause: () => void;
  onWPMChange: (wpm: number) => void;
  onRewind: () => void;
}

export default function Controls({
  isPlaying,
  wpm,
  wordsRead,
  totalWords,
  onPlayPause,
  onWPMChange,
  onRewind,
  onForward,
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
          onClick={onRewind}
        >
          <RefreshCwIcon className="h-4 w-4" />
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

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium">{wordsRead} / {totalWords} words</span>
      </div>
    </div>
  );
}