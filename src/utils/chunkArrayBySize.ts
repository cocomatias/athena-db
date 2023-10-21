type ChunkArrayOptions = {
  arr: any[];
  size: number;
};

export const chunkArrayBySize = (options: ChunkArrayOptions): any[][] => {
  const { arr, size } = options;

  if (size <= 0) {
    throw new Error('Size must be a positive non-zero number.');
  }

  const chunks: any[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};
