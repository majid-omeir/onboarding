import { useState, useEffect, useCallback } from 'react';
import { debounce } from '../utils/debounce';

interface AutoSaveOptions {
  delay?: number;
  enabled?: boolean;
}

interface AutoSaveReturn {
  isSaving: boolean;
  lastSaved: Date | null;
  error: string | null;
  save: () => Promise<void>;
}

export const useAutoSave = (
  data: any,
  saveFunction: (data: any) => Promise<void>,
  options: AutoSaveOptions = {}
): AutoSaveReturn => {
  const { delay = 300, enabled = true } = options;
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const save = useCallback(async () => {
    if (!enabled) return;

    setIsSaving(true);
    setError(null);

    try {
      await saveFunction(data);
      setLastSaved(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  }, [data, saveFunction, enabled]);

  const debouncedSave = useCallback(
    debounce(save, delay),
    [save, delay]
  );

  useEffect(() => {
    if (enabled && data) {
      debouncedSave();
    }
  }, [data, debouncedSave, enabled]);

  return {
    isSaving,
    lastSaved,
    error,
    save
  };
};