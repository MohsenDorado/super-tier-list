export default function getPricingFormat(input: string) {
    // Remove all non-digit characters from the input
    let cleanedInput = input.replace(/\D/g, "");

    // Reverse the cleaned input
    let reversed = cleanedInput.split("").reverse().join("");

    // Add a space every 3 digits
    let spacedReversed = reversed.replace(/(\d{3})(?=\d)/g, "$1 , ");

    // Reverse the string back to the original order
    let result = spacedReversed.split("").reverse().join("");

    return result;
  }