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
          initial={{ opacity: 0.45, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0.45, x: -20 }}
          transition={{ duration: 0.1 }}
          className={`text-xl md:text-3xl font-medium max-w-2xl text-center ${
            isPlaying ? "text-primary" : "text-foreground"
          }`}
        >
          {word || "..."}
        </motion.span>
      </AnimatePresence>
    </Card>
  );
}