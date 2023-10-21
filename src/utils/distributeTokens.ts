type TokenParams = {
  tokens: number;
  maxTokens: number;
};

type TokenResult = {
  tokensArray: number[];
};

/**
 * Function to distribute tokens such that each token is less than or equal to maxTokens and
 * the tokens are distributed as evenly as possible. Additionally, it adds 100 to each distributed token
 * while keeping the total below maxTokens.
 * @param params Object containing the total tokens and the max tokens allowed.
 * @returns Object containing an array of tokens.
 */
export const distributeTokens = ({
  tokens,
  maxTokens,
}: TokenParams): TokenResult => {
  let accomodateTokens = 200;
  if (tokens > 15000) {
    accomodateTokens = 500;
  }

  if (maxTokens < 1000) {
    throw new Error('maxTokens must be at least 1000');
  }

  // Initialize an empty array to hold the result
  const tokensArray: number[] = [];
  // Adjust maxTokens and tokens to accommodate the addition of 100 to each token
  const adjustedMaxTokens = maxTokens - accomodateTokens;
  const adjustedTokens = tokens + accomodateTokens;

  // Calculate the number of partitions and base value for each partition
  const partitions = Math.ceil(adjustedTokens / adjustedMaxTokens);
  const baseValue = Math.floor(adjustedTokens / partitions);

  // Calculate the number of partitions that will have an extra 1 added to them
  const extraOnes = adjustedTokens - baseValue * partitions;

  // Fill the tokensArray based on these calculations
  for (let i = 0; i < partitions; i++) {
    tokensArray.push(baseValue + (i < extraOnes ? 1 : 0));
  }

  return { tokensArray };
};
