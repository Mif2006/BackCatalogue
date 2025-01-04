/**
 * Parses a size string in format "[16, 17, 18]" into an array of string sizes
 */
export function parseSizes(sizeString: string | string[]): string[] {
  // If already an array, ensure all elements are strings
  if (Array.isArray(sizeString)) {
    return sizeString.map(size => size.toString());
  }

  try {
    // Remove brackets and split by comma
    const cleanString = sizeString.replace(/[\[\]]/g, '').trim();
    if (!cleanString) return [];

    return cleanString
      .split(',')
      .map(size => size.trim())
      .filter(size => {
        const num = parseInt(size);
        return !isNaN(num) && num >= 12 && num <= 21;
      });
  } catch (error) {
    console.error('Error parsing sizes:', error);
    return [];
  }
}