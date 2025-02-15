export interface ReaderState {
  text: string;
  words: string[];
  currentIndex: number;
  isPlaying: boolean;
  wpm: number;
}

export const initialReaderState: ReaderState = {
  text: "",
  words: [],
  currentIndex: 0,
  isPlaying: false,
  wpm: 300,
};

export function splitIntoWords(text: string): string[] {
  return text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0);
}

export function msPerWord(wpm: number): number {
  return (60 * 1000) / wpm;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}