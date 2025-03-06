
import { CalendarDays, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <NavLink to="/" className="text-xl font-semibold text-foreground">
            Gratitude Journal
          </NavLink>
          <div className="flex gap-2">
            <NavLink to="/">
              {({ isActive }) => (
                <Button variant={isActive ? "default" : "ghost"} size="icon">
                  <Home className="h-5 w-5" />
                </Button>
              )}
            </NavLink>
            <NavLink to="/calendar">
              {({ isActive }) => (
                <Button variant={isActive ? "default" : "ghost"} size="icon">
                  <CalendarDays className="h-5 w-5" />
                </Button>
              )}
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};
