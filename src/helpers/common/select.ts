import { Option, NormalizedOptions } from '../../redux/modules/common/select'

export function normalizeOptions(options: Option[]): NormalizedOptions {
  return options.reduce((acc, option) => {
    acc.options.push(option.value)
    acc.optionsMap[option.value] = option
    return acc
  }, { options: [], optionsMap: {} })
}

export function optionTransformer(data: any[], transformer: (item: any) => Option): Option[] {
  return data.map(transformer)
}