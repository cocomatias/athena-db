/**
 * Calculates the cosine similarity between two vectors.
 *
 * @param A - The first vector.
 * @param B - The second vector.
 * @returns The cosine similarity between vectors A and B.
 */
export const cosineSimilarity = (A: number[], B: number[]): number => {
  // Ensure vectors have the same dimensions
  if (A.length !== B.length)
    throw new Error('Vectors must have the same dimensions');

  let sumAiBi = 0,
    sumAiAi = 0,
    sumBiBi = 0;

  for (let i = 0; i < A.length; i++) {
    sumAiBi += A[i] * B[i];
    sumAiAi += A[i] * A[i];
    sumBiBi += B[i] * B[i];
  }

  return sumAiBi / (Math.sqrt(sumAiAi) * Math.sqrt(sumBiBi));
};
