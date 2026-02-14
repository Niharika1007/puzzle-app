import LZString from "lz-string";

export const compressData = (data) => {
  try {
    return LZString.compress(JSON.stringify(data));
  } catch (error) {
    console.error("Compression error:", error);
    return null;
  }
};

export const decompressData = (compressed) => {
  try {
    return JSON.parse(LZString.decompress(compressed));
  } catch (error) {
    console.error("Decompression error:", error);
    return null;
  }
};
