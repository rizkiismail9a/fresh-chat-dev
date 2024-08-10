/*
 * This function takes error object from react hook form (useFormContext)
 * after that, it will find the input name as we registered it in the component
 * if filter method got the name, we reduce it into one object with the error message
 */

const findInputErrors = (errorObj, inputName) => {
  const keys = Object.keys(errorObj);
  return keys
    .filter((item) => item.includes(inputName))
    .reduce((curr, key) => Object.assign(curr, { error: errorObj[key] }), {});
};

/*
 * If there is a single one key in object error this has been returned by findInputErrors, set * the form as invalid
 */
const isFormInvalid = (errorObj) => {
  if (Object.keys(errorObj).length > 0) {
    return true;
  }

  return false;
};

export { findInputErrors, isFormInvalid };
