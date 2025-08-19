import { parsePhoneNumberFromString as parsePhoneNumber } from "libphonenumber-js";

export function getPhoneNumberInfo(text: string) {
  const phoneNumber = parsePhoneNumber(text);

  if (!phoneNumber) return null;

  return {
    number: phoneNumber.number,
    countryCallingCode: phoneNumber.countryCallingCode,
    nationalNumber: phoneNumber.nationalNumber,
    nationalNumberNormalized: `0${phoneNumber.nationalNumber}`,
    country: phoneNumber.country,
    ext: phoneNumber.ext,
    carrierCode: phoneNumber.carrierCode,
  };
}

export default getPhoneNumberInfo;
