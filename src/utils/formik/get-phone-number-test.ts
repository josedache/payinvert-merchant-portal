import isValidPhoneNumber from "utils/number/is-valid-phone-number";

export function getPhoneNumberTest() {
  return {
    name: "isPhoneNumber",
    test: (value: any) => isValidPhoneNumber(value),
    message: "${path} is not a valid phone number",
    params: {},
    exclusive: false,
  };
}

export default getPhoneNumberTest;

// let schema = yup.string().test({
//   name: 'max',
//   exclusive: true,
//   params: { max },
//   message: '${path} must be less than ${max} characters',
//   test: (value) => value == null || value.length <= max,
// });