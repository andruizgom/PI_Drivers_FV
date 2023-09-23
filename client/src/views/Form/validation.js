export function validateInputs(input, errors) {
  const { name, value } = input;

  const forenameRegex = /^(?!.*\s{2})[A-Z][a-z]*(?:\s[A-Z][a-z]*){0,29}$/;
  const surnameRegex = /^(?!.*\s{2})[A-Z][a-z]*(?:\s[A-Z][a-z]*){0,29}$/;
  const dobRegex = /^(19\d{2}|20[0-1]\d|2022)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  const nationalityRegex = /^(?!.*\s{2})[A-Z][a-z]*(?:\s[A-Z][a-z]*){0,29}$/;
  const teamsRegex = /^(?!.*,,)[A-Za-z0-9]*[^,][A-Za-z0-9]*(,[A-Za-z0-9]*[^,][A-Za-z0-9]*)*[^,]\s*$/;
  const descriptionRegex = /^(?!\s*$).{1,1000}$/;

  switch (name) {
    case "forename":
      forenameRegex.test(value) ? (errors = { ...errors, [name]: "" }) : (errors = {
        ...errors, [name]:
          "The name cannot be empty, have more than 30 characters, numbers, accents or special characters. It must begin with a capital letter followed by lowercase letters, for example Lucas."
      });
      break;

    case "surname":
      surnameRegex.test(value) ? (errors = { ...errors, [name]: "" }) : (errors = {
        ...errors, [name]: "The Last Name cannot be empty, have more than 30 characters, numbers, accents or special characters. It must begin with a capital letter followed by lowercase letters, for example Fittipaldi "

      });
      break;

    case "dob":
      dobRegex.test(value) ? (errors = { ...errors, [name]: "" }) : (errors = {
        ...errors, [name]: "The date cannot be empty and must follow the next format YYYY-MM-DD for example 1988-07-30. It must also be coherent."

      });
      break;

    case "nationality":
      nationalityRegex.test(value) ? (errors = { ...errors, [name]: "" }) : (errors = {
        ...errors, [name]: "The nationality cannot be empty, have more than 30 characters, numbers, accents or special characters. It must begin with a capital letter followed by lowercase letters. For example British."

      });
      break;

    case "teams":
      teamsRegex.test(value) ? (errors = { ...errors, [name]: "" }) : (errors = {
        ...errors, [name]: "Team names cannot be empty, contain numbers or special characters. If there is more than one team, they must be separated with commas. For example BMW, McLaren, Ferrari."

      });
      break;

    case "description":
      descriptionRegex.test(value) ? (errors = { ...errors, [name]: "" }) : (errors = {
        ...errors, [name]: "The description cannot be empty or have more than 1000 characters."

      });
      break;
  }
  return errors;
}

export function validateSubmit(errors) {
  let numberErrors = 0;
  for (const key in errors) {
    if (errors[key].length > 0) numberErrors++;
  }
  return numberErrors;
}
