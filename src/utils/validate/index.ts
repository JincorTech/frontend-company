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

export default function createValidation(validators: any) {
  return function validate(values: FormValues): FormErrors | FieldErrors {
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


    return Object.keys(errors).length > 1 ? { _error: errors } : errors
  }
}