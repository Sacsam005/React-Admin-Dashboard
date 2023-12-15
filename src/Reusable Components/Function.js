export function generateRandomTotal(totalDigitLength) {
  const randomTotal = Math.floor(Math.random() * totalDigitLength);
  const formattedRandomTotal = randomTotal
    .toLocaleString("en-US", { useGrouping: true })
    .replace(/^0+/, "");

  // Converting totalDigitLength value from number to string to calculate its length
  const totalDigitLengthSTRING = totalDigitLength.toString();
  const totalTargetValue = 10 ** (totalDigitLengthSTRING.length - 1);

  // Calculating dynamic percentages for the Circular progress bar
  // Classic formula: percentage(%) = (Obtained / Total) * 100
  const percentageCalculator = ((randomTotal / totalTargetValue) * 100).toFixed(
    2
  );

  // console.log(percentageCalculator);
  return { formattedRandomTotal, percentageCalculator };
}
