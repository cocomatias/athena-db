import { DataWithTokens } from '@types'; // Assuming AIDBData is imported correctly

type GroupDataByTokensParams = {
  data: DataWithTokens[];
  tokensLimit: number;
};

export const groupDataByTokens = (
  params: GroupDataByTokensParams,
): DataWithTokens[][] => {
  const { data, tokensLimit } = params;

  // Sort data by tokens to evenly distribute them across the groups
  const sortedData = [...data].sort((a, b) => b.tokens - a.tokens);

  // Initialize an empty array to store grouped data
  const groupedData: DataWithTokens[][] = [];

  // Initialize a tokens counter for each group
  const groupTokensCount: number[] = [];

  // Loop over sorted data to distribute tokens as evenly as possible
  sortedData.forEach((item) => {
    let minGroupIndex = 0; // Index for the group with the minimum tokens
    let minTokens = Infinity; // Initial minimum tokens

    // Find the group with the least total tokens
    for (let i = 0; i < groupTokensCount.length; i++) {
      if (groupTokensCount[i] < minTokens) {
        minTokens = groupTokensCount[i];
        minGroupIndex = i;
      }
    }

    // Add to existing group if the total tokens do not exceed the limit
    if (minTokens + item.tokens <= tokensLimit) {
      groupedData[minGroupIndex].push(item);
      groupTokensCount[minGroupIndex] += item.tokens;
    } else {
      // Otherwise, create a new group
      groupedData.push([item]);
      groupTokensCount.push(item.tokens);
    }
  });

  return groupedData;
};
