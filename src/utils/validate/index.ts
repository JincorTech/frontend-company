/**
 * Types
 */
export type FormErrors = {
  _error: FieldErrors
}

export type FieldErrors = {
  [fieldName: string]: string
}

export type FormValues = {
  [fieldName: string]: string
}

export type ValidatorMap = {
  [fieldName: string]: Function | Function[]
}

/**
 * Create redux-form Sync validate function
 * @param validators 
 */
export default function createValidation(validators: ValidatorMap) {
  return function validate(values: any, props: any): any {
    const errors: FieldErrors = {}

    Object.keys(validators).map((fieldName) => {
      const fieldValidator = validators[fieldName]
      const value = values[fieldName]

      if (typeof fieldValidator === 'function') {
        const err = fieldValidator(value)

        if (err) {
          errors[fieldName] = err
        }
      }

      if (Array.isArray(fieldValidator)) {
        const errArray = fieldValidator
          .map((validator) => validator(value))
          .filter((err) => err)

        if (errArray.length > 0) {
          errors[fieldName] = errArray[0]
        }
      }
    })


    return errors
  }
}