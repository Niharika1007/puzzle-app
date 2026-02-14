import { compressData, decompressData } from "../utils/compression";

const PUZZLE_KEY = "cachedPuzzle";

export const getCachedPuzzle = () => {
  try {
    const compressed = localStorage.getItem(PUZZLE_KEY);
    if (!compressed) return null;

    return decompressData(compressed);
  } catch {
    localStorage.removeItem(PUZZLE_KEY);
    return null;
  }
};

export const savePuzzleToCache = (data) => {
  const compressed = compressData(data);
  if (compressed) {
    localStorage.setItem(PUZZLE_KEY, compressed);
  }
};
