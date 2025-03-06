
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { useGratitudeEntries } from "@/hooks/useGratitudeEntries";

export const GratitudeList = () => {
  const { entries } = useGratitudeEntries();

  if (entries.length === 0) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        No entries yet. Write your first gratitude entry above!
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id} className="p-6 space-y-2">
          <p className="text-lg">{entry.content}</p>
          <p className="text-sm text-muted-foreground">
            {format(new Date(entry.date), "MMMM d, yyyy")}
          </p>
        </Card>
      ))}
    </div>
  );
};
