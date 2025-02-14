import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import TextInput from "@/components/reader/text-input";
import WordDisplay from "@/components/reader/word-display";
import Controls from "@/components/reader/controls";
import { ReaderState, initialReaderState, splitIntoWords, msPerWord, calculateProgress } from "@/lib/reader";

export default function Home() {
  const [state, setState] = useState<ReaderState>(initialReaderState);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const updateText = (text: string) => {
    setState(prev => ({
      ...prev,
      text,
      words: splitIntoWords(text),
      currentIndex: 0,
      isPlaying: false,
      progress: 0
    }));
  };

  const togglePlay = () => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const updateWPM = (newWPM: number) => {
    setState(prev => ({ ...prev, wpm: newWPM }));
  };

  const jumpTo = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, state.words.length - 1));
    setState(prev => ({
      ...prev,
      currentIndex: newIndex,
      progress: calculateProgress(newIndex, prev.words.length)
    }));
  };

  const handleProgressChange = (newProgress: number) => {
    if (state.words.length === 0) return;
    const newIndex = Math.floor((newProgress / 100) * state.words.length);
    jumpTo(newIndex);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (state.isPlaying && state.words.length > 0) {
      timerRef.current = setInterval(() => {
        setState(prev => {
          if (prev.currentIndex >= prev.words.length - 1) {
            clearInterval(timerRef.current!);
            return { ...prev, isPlaying: false };
          }
          const newIndex = prev.currentIndex + 1;
          return {
            ...prev,
            currentIndex: newIndex,
            progress: calculateProgress(newIndex, prev.words.length)
          };
        });
      }, msPerWord(state.wpm));
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.isPlaying, state.wpm]);

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold text-primary">Speed Reader</h1>

      <Card className="w-full max-w-2xl p-6 space-y-6">
        {state.words.length === 0 ? (
          <TextInput onTextSubmit={updateText} />
        ) : (
          <>
            <WordDisplay 
              word={state.words[state.currentIndex] || ""} 
              isPlaying={state.isPlaying}
            />
            <Controls
              isPlaying={state.isPlaying}
              wpm={state.wpm}
              progress={state.progress}
              onPlayPause={togglePlay}
              onWPMChange={updateWPM}
              onRewind={() => jumpTo(state.currentIndex - 1)}
              onForward={() => jumpTo(state.currentIndex + 1)}
              onReset={() => setState(initialReaderState)}
              onProgressChange={handleProgressChange}
            />
          </>
        )}
      </Card>
    </div>
  );
}