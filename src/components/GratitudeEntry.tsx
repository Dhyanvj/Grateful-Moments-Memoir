
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SmilePlus } from "lucide-react";

export const GratitudeEntry = () => {
  const [entry, setEntry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save entry
    setEntry('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto animate-fade-up">
      <Card className="gratitude-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Today's Gratitude</h2>
            <Button variant="ghost" size="icon" type="button">
              <SmilePlus className="h-5 w-5 text-primary" />
            </Button>
          </div>
          <Textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="I am grateful for..."
            className="min-h-[120px] resize-none bg-white/50 backdrop-blur-sm border-none focus:ring-2 ring-primary/20 text-lg"
          />
          <div className="flex justify-end">
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Save Entry
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
};
