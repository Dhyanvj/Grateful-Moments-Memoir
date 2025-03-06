
import { GratitudeEntry } from "@/components/GratitudeEntry";
import { GratitudeList } from "@/components/GratitudeList";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-radial from-secondary via-background to-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16 page-transition">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-lg text-muted-foreground">What are you grateful for today?</p>
          </div>
          <GratitudeEntry />
          <GratitudeList />
        </div>
      </main>
    </div>
  );
};

export default Index;
