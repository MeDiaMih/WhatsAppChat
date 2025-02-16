export const validateCredentials = (
  idInstance: string,
  apiTokenInstance: string,
): boolean => {
  const isValidIdInstance = /^[0-9]{10}$/.test(idInstance);

  const isValidApiTokenInstance = /^[a-f0-9]{50}$/i.test(apiTokenInstance);

  return isValidIdInstance && isValidApiTokenInstance;
};
