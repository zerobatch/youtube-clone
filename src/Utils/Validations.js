import Validator from "validator";

class ValidationService {
  static doValidation(dataToValidate = {}, type = "") {
    this.dataToValidate = dataToValidate;
    const ignoredRules = this._ignoreRulesBasedOnType(type);

    const rules = this._validationRules();
    const errors = {};
    for (let key in dataToValidate) {
      if (rules.hasOwnProperty(key) && !ignoredRules.includes(key)) {
        if (!rules[key].func(dataToValidate[key])) {
          errors[key] = rules[key]["message"];
        }
      }
    }

    return errors;
  }

  static _validationRules = () => ({
    email: {
      func: Validator.isEmail,
      message: "The email is badly formatted"
    },
    password: {
      func: this._passwordValidation,
      message: "The password must contain 6 characters or more"
    },
    password_confirmation: {
      func: this._passwordConfirm,
      message: "Passwords do not match"
    }
  });

  static emailValidation = email =>
    Validator.isEmail(Validator.normalizeEmail(email));

  static _passwordValidation = (value = "") =>
    Validator.isLength(value, { min: 6 });
  static _passwordConfirm = password_confirmation =>
    this.dataToValidate.password === password_confirmation;

  static _ignoreRulesBasedOnType = type => {
    let rulesToIgnore = [];

    switch (type) {
      case "sign_in":
        rulesToIgnore = rulesToIgnore.concat(["password_confirmation"]);
        break;

      case "sign_up":
        break;

      default:
    }

    return rulesToIgnore;
  };
}

export default ValidationService;
