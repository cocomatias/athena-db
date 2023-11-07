import { encode } from 'gpt-3-encoder'; // For the previous version
import { encoding_for_model } from 'tiktoken';
import { niceLog } from './niceLog';
import { GPTModelName } from '@types';

// Previous version
export const getTokens2 = async (str: string | string[]) => {
  try {
    if (Array.isArray(str)) {
      str = str.join('');
    }

    // Split the string into chunks
    const CHUNK_SIZE = 1000; // Choose a suitable size based on your testing
    const chunks: string[] = [];
    for (let i = 0; i < str.length; i += CHUNK_SIZE) {
      chunks.push(str.slice(i, i + CHUNK_SIZE));
    }

    // Pseudo-parallelize encoding using promises
    const promises: Promise<number>[] = chunks.map((chunk) => {
      return new Promise<number>((resolve) => {
        const encoded = encode(chunk);
        resolve(encoded.length);
      });
    });

    const lengths = await Promise.all(promises);
    return lengths.reduce((acc, len) => acc + len, 0);
  } catch (error: any) {
    niceLog('getTokens() - Error', error, undefined, true);
    return 0;
  }
};

export const getTokens = async (
  str: string | string[],
  model: GPTModelName = GPTModelName.GPT3,
) => {
  try {
    if (model === GPTModelName.GPT4TURBO) {
      model = GPTModelName.GPT4;
    }
    const enc = encoding_for_model(model);
    if (Array.isArray(str)) {
      str = str.join('');
    }

    // Split the string into chunks
    const CHUNK_SIZE = 1000; // Choose a suitable size based on your testing
    const chunks: string[] = [];
    for (let i = 0; i < str.length; i += CHUNK_SIZE) {
      chunks.push(str.slice(i, i + CHUNK_SIZE));
    }

    // Pseudo-parallelize encoding using promises
    const promises: Promise<number>[] = chunks.map((chunk) => {
      return new Promise<number>((resolve) => {
        const encoded = enc.encode(chunk);
        resolve(encoded.length);
      });
    });

    const lengths = await Promise.all(promises);
    enc.free();
    return lengths.reduce((acc, len) => acc + len, 0);
  } catch (error: any) {
    niceLog('getTokens() - Error', error, undefined, true);
    return 0;
  }
};
