// validation.ts
export const isPasswordValid = (password: string): boolean => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasUpperCase && hasNumber && hasSpecialChar;
};
