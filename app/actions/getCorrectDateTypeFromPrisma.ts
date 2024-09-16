export default function getCorrectDateTypeFromPrisma(string: Date) {
    const gregorianDate = new Date(string);
    return gregorianDate;
  };