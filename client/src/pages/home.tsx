import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { TextInput, WordDisplay, Controls } from "@/components/reader";
import { ReaderState, initialReaderState, splitIntoWords, msPerWord } from "@/lib/reader";

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
    }));
  };

  const togglePlay = () => {
    // Don't start playing if we're at the end
    if (!state.isPlaying && state.currentIndex >= state.words.length - 1) {
      setState(prev => ({ ...prev, currentIndex: 0, isPlaying: true }));
    } else {
      setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  const updateWPM = (newWPM: number) => {
    setState(prev => ({ ...prev, wpm: newWPM }));
  };

  const jumpTo = (index: number) => {
    if (state.words.length === 0) return;
    const newIndex = Math.max(0, Math.min(index, state.words.length - 1));
    setState(prev => ({
      ...prev,
      currentIndex: newIndex,
    }));
  };

  const rewind = () => {
    jumpTo(0);
  }

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
          };
        });
      }, msPerWord(state.wpm, state.words[state.currentIndex]));
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
              wordsRead={state.currentIndex + 1}
              totalWords={state.words.length}
              onPlayPause={togglePlay}
              onWPMChange={updateWPM}
              onRewind={rewind}
            />
          </>
        )}
      </Card>
    </div>
  );
}