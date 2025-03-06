
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Temporary in-memory storage until we add a backend
let entries: GratitudeEntry[] = [];

export const useGratitudeEntries = () => {
  const queryClient = useQueryClient();

  const { data: gratitudeEntries = [] } = useQuery({
    queryKey: ["gratitude-entries"],
    queryFn: () => entries,
  });

  const addEntry = useMutation({
    mutationFn: (content: string) => {
      const newEntry = {
        id: Date.now().toString(),
        content,
        date: new Date().toISOString(),
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
