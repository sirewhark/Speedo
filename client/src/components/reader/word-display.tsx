import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface WordDisplayProps {
  word: string;
  isPlaying: boolean;
}

export default function WordDisplay({ word, isPlaying }: WordDisplayProps) {
  return (
    <Card className="p-12 flex items-center justify-center bg-muted/50">
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={`text-4xl md:text-6xl font-bold ${
            isPlaying ? "text-primary" : "text-foreground"
          }`}
        >
          {word || "..."}
        </motion.span>
      </AnimatePresence>
    </Card>
  );
}
