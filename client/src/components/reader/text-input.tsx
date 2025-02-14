import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";

interface TextInputProps {
  onTextSubmit: (text: string) => void;
}

export default function TextInput({ onTextSubmit }: TextInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onTextSubmit(text);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste or type your text here..."
        className="min-h-[200px] text-base"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={!text.trim()}
      >
        <PlayIcon className="mr-2 h-4 w-4" />
        Start Reading
      </Button>
    </div>
  );
}
