export const validateCPF = function (cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;

  return true;
};

export const validatePhone = (phone: string) => {
  const cleanedPhone = phone.replace(/[^\d]/g, "");

  const isValidLength = /^(\d{2})\d{9}$/.test(cleanedPhone);

  const allDigitsEqual = /^(\d)\1{10}$/.test(cleanedPhone);

  return isValidLength && !allDigitsEqual;
};
