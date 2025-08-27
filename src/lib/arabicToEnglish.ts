/**
 * Converts Arabic numerals to English numerals
 * @param str - Input string that may contain Arabic numerals
 * @returns String with Arabic numerals converted to English
 */
export function convertArabicToEnglish(str: string): string {
  if (!str) return str;
  
  const arabicNumbers: { [key: string]: string } = {
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9'
  };

  return str.replace(/[٠-٩]/g, (match) => arabicNumbers[match] || match);
}

/**
 * Converts and validates phone number
 * @param phone - Phone number that may contain Arabic numerals
 * @returns Cleaned phone number with only English numerals
 */
export function normalizePhoneNumber(phone: string): string {
  if (!phone) return phone;
  
  // Convert Arabic to English numbers
  const converted = convertArabicToEnglish(phone);
  
  // Remove all non-digit characters except + at the beginning
  const cleaned = converted.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');
  
  // If starts with 0, replace with 966
  if (cleaned.startsWith('0')) {
    return '966' + cleaned.substring(1);
  }
  
  // If doesn't start with country code, add it
  if (!cleaned.startsWith('966') && !cleaned.startsWith('+966')) {
    return '966' + cleaned;
  }
  
  return cleaned.replace('+', '');
}

/**
 * Formats input value to accept only numbers (Arabic or English)
 * @param value - Input value
 * @returns Formatted value with only English numbers
 */
export function formatNumberInput(value: string): string {
  if (!value) return '';
  
  // Convert Arabic to English
  const converted = convertArabicToEnglish(value);
  
  // Keep only digits
  return converted.replace(/[^\d]/g, '');
}