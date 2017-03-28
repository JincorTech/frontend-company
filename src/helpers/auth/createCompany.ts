import { FormFields } from '../../containers/auth/CreateCompanyForm'
import { required, minLength } from '../../utils/validators'

export type ErrorMessages = {
    countryId?: string
    companyType?: string
    legalName?: string
}

/**
 * Form initialValues
 */
export const initialValues: FormFields = {
    countryId: {
        value: '',
        name: ''
    },
    companyType: {
        value: '',
        name: ''
    },
    legalName: ''
}

/**
 * Redux form sync validation
 * @param values - form fields
 */
export function validate(values: FormFields): ErrorMessages {
    const { countryId, companyType, legalName } = values

    const errors: ErrorMessages = {
        countryId: required(countryId.value),
        companyType: required(companyType.value),
        legalName: minLength(legalName, 3),
    }

    return errors
}