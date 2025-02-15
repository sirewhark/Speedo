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
    .split(/[.!?]+/)
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 0)
    .map(sentence => sentence + ".");
}

export function msPerWord(wpm: number, sentence: string): number {
  const wordCount = sentence.trim().split(/\s+/).length;
  return (wordCount * 60 * 1000) / wpm;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}