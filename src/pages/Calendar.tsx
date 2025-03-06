
import { Header } from "@/components/Header";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useGratitudeEntries } from "@/hooks/useGratitudeEntries";
import { startOfDay } from "date-fns";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { entries } = useGratitudeEntries();

  const getEntriesForDay = (day: Date) => {
    const start = startOfDay(day).getTime();
    return entries.filter((entry) => startOfDay(new Date(entry.date)).getTime() === start);
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-secondary via-background to-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16 page-transition">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Your Journey</h1>
            <p className="text-lg text-muted-foreground">Browse your past gratitude entries</p>
          </div>
          <Card className="gratitude-card">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mx-auto rounded-lg pointer-events-auto"
              modifiers={{
                hasEntries: (day) => getEntriesForDay(day).length > 0,
              }}
              modifiersClassNames={{
                hasEntries: "relative",
              }}
              components={{
                DayContent: ({ date }) => {
                  const dayEntries = getEntriesForDay(date);
                  return (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {date.getDate()}
                      {dayEntries.length > 0 && (
                        <Badge 
                          variant="secondary" 
                          className="absolute -top-1 -right-1 min-w-4 h-4 text-xs"
                        >
                          {dayEntries.length}
                        </Badge>
                      )}
                    </div>
                  );
                },
              }}
            />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
