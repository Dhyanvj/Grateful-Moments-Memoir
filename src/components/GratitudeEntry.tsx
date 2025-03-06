
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SmilePlus, ImagePlus, X } from "lucide-react";
import { useGratitudeEntries } from "@/hooks/useGratitudeEntries";
import { toast } from "sonner";

export const GratitudeEntry = () => {
  const [entry, setEntry] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addEntry } = useGratitudeEntries();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.trim()) return;
    
    addEntry.mutate({ 
      content: entry,
      imageUrl: imagePreview || undefined
    }, {
      onSuccess: () => {
        setEntry('');
        setImagePreview(null);
        toast.success("Entry saved successfully!");
      },
    });
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto animate-fade-up">
      <Card className="gratitude-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Today's Gratitude</h2>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="h-5 w-5 text-primary" />
              </Button>
              <Button variant="ghost" size="icon" type="button">
                <SmilePlus className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </div>
          <Textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="I am grateful for..."
            className="min-h-[120px] resize-none bg-white/50 backdrop-blur-sm border-none focus:ring-2 ring-primary/20 text-lg"
          />
          {imagePreview && (
            <div className="relative">
              <img 
                src={imagePreview} 
                alt="Entry attachment" 
                className="max-h-[200px] rounded-lg object-cover w-full"
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                onClick={removeImage}
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!entry.trim() || addEntry.isPending}
            >
              Save Entry
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
};
