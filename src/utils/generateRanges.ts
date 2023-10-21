type GenerateRangesOptions = {
  totalRecords: number;
  rangeDistance: number;
};

/**
 * Generate ranges based on total records and range distance.
 *
 * @param totalRecords - Total number of records in the database.
 * @param rangeDistance - Number of records in each range.
 * @returns Array of ranges.
 */
export const generateRanges = (
  options: GenerateRangesOptions,
): [number, number][] => {
  const { totalRecords, rangeDistance } = options;

  // Initialize an array to store the generated ranges
  const ranges: [number, number][] = [];

  // Loop through the total number of records
  for (let i = 0; i < totalRecords; i += rangeDistance) {
    // Calculate the end of the current range
    const end = Math.min(i + rangeDistance - 1, totalRecords - 1);
    // Push the current range to the ranges array
    ranges.push([i, end]);
  }

  return ranges;
};
