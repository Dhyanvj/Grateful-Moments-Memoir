
import { Header } from "@/components/Header";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

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
            />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
