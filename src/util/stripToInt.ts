export const stripToInt = (input: string): number | undefined => {
  input = input.replace(/\D/g,'');
  const number = parseInt(input);
  return number ? number : undefined;
};
