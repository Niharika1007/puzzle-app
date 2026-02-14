import LZString from "lz-string";

const PUZZLE_CACHE_KEY = "puzzle_cache";

export function savePuzzleCache(data) {

  try {

    const compressed = LZString.compress(JSON.stringify(data));

    localStorage.setItem(PUZZLE_CACHE_KEY, compressed);

  } catch (err) {

    console.error("Cache save error:", err);

  }

}


export function getPuzzleCache() {

  try {

    const compressed = localStorage.getItem(PUZZLE_CACHE_KEY);

    if (!compressed)
      return [];

    const decompressed =
      LZString.decompress(compressed);

    if (!decompressed)
      return [];

    return JSON.parse(decompressed);

  } catch (err) {

    console.error("Cache read error:", err);

    return [];

  }

}
