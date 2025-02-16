export const formatPhoneNumber = (phoneNumber: string) => {
  const digits = phoneNumber.replace(/\D/g, '');

  if (digits.startsWith('7') || digits.startsWith('8')) {
    return `7${digits.slice(1, 11)}`;
  }
  if (digits.length === 10) {
    return `7${digits}`;
  }

  return digits;
};

export const formatPhoneNumbersForDisplay = (phoneNumber: string) => {
  const formatted = formatPhoneNumber(phoneNumber);
  return formatted.replace(
    /^7(\d{3})(\d{3})(\d{2})(\d{2})$/,
    '8 ($1) $2-$3-$4',
  );
};
