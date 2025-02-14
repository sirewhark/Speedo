export interface ReaderState {
  text: string;
  words: string[];
  currentIndex: number;
  isPlaying: boolean;
  wpm: number;
  progress: number;
}

export const initialReaderState: ReaderState = {
  text: "",
  words: [],
  currentIndex: 0,
  isPlaying: false,
  wpm: 300,
  progress: 0,
};

export function splitIntoWords(text: string): string[] {
  return text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0);
}

export function calculateProgress(currentIndex: number, totalWords: number): number {
  if (totalWords === 0) return 0;
  // Calculate progress as a percentage with one decimal place precision
  return Math.min(Math.round((currentIndex / (totalWords - 1)) * 100), 100);
}

export function msPerWord(wpm: number): number {
  return (60 * 1000) / wpm;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}