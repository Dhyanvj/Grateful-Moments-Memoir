
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { GratitudeEntry } from "@/types/entries";

// Temporary in-memory storage until we add a backend
let entries: GratitudeEntry[] = [];

export const useGratitudeEntries = () => {
  const queryClient = useQueryClient();

  const { data: gratitudeEntries = [] } = useQuery({
    queryKey: ["gratitude-entries"],
    queryFn: () => entries,
  });

  const addEntry = useMutation({
    mutationFn: async ({ content, imageUrl }: { content: string; imageUrl?: string }) => {
      const newEntry = {
        id: Date.now().toString(),
        content,
        date: new Date().toISOString(),
        imageUrl,
      };
      entries = [newEntry, ...entries];
      return newEntry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gratitude-entries"] });
    },
  });

  return {
    entries: gratitudeEntries,
    addEntry,
  };
};
