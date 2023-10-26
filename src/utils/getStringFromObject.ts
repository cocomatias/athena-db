// Function to set the first letter of a string to uppercase
export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

export const getStringFromObject = (
  obj: Record<string, string | number | string[]>,
  newLinesAmount = 2,
) =>
  Object.entries(obj)
    .map(
      ([key, value]) =>
        `${capitalize(key.replace('_', ' '))}: ${
          Array.isArray(value) ? value.join(', ') : value
        }`,
    )
    .join('\n'.repeat(newLinesAmount));
