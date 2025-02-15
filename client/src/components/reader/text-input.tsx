
import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlayIcon, FileUpIcon } from "lucide-react";

interface TextInputProps {
  onTextSubmit: (text: string) => void;
}

export default function TextInput({ onTextSubmit }: TextInputProps) {
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (text.trim()) {
      onTextSubmit(text);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setText(content);
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative ${isDragging ? "border-primary" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Textarea
          placeholder="Paste or type your text here..."
          className="min-h-[200px] text-base"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {isDragging && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center border-2 border-dashed border-primary rounded-md">
            Drop your text file here
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <FileUpIcon className="mr-2 h-4 w-4" />
          Browse File
        </Button>
        <Button
          className="flex-1"
          onClick={handleSubmit}
          disabled={!text.trim()}
        >
          <PlayIcon className="mr-2 h-4 w-4" />
          Start Reading
        </Button>
      </div>
      <input
        type="file"
        accept=".txt"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
      />
    </div>
  );
}
