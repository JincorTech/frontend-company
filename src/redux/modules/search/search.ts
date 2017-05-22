import { createReducer, createSubmitAction, createAsyncAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

import { Company } from '../profile/profileView'


export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  companies: Company[],
  meta: Meta
}

export type Meta = {
  pagination: Pagination
}

export type Pagination = {
  total: number
  count: number
  perPage: number
  currentPage: number
  totalPages: number
  links: {
    previous: string
    next: string
  }
}

export type SearchRequest = {
  request: string
  country?: string
  activity?: string
}


export const SEARCH = 'search/search/SEARCH'
export const FETCH_COUNTRIES = 'search/search/FETCH_COUNTRIES'


export const search = createAsyncAction<SearchRequest, StateMap>(SEARCH)
export const fetchCountries = createAsyncAction<void, void>(FETCH_COUNTRIES)


const initialState = from<StateMap>({
  companies: [
    {
      id: 'a3cbe21c-bab6-4c72-9d2e-8907f9a568981',
      legalName: 'Burger King',
      profile: {
        brandName: {
          en: 'My english brand name',
          ru: 'Мое русское брендовое имя!'
        },
        picture: 'http://logoquizgame-answers.com/wp-content/uploads/2014/08/logos-quiz-sm-0011.jpg',
        links: [
          {
            name: 'facebook',
            value: 'http://facebook.com'
          },
          {
            name: 'twitter',
            value: 'http://twitter.com'
          },
          {
            name: 'vk',
            value: 'http://vk.com'
          }
        ],
        email: 'admin@jincor.com',
        phone: '+7999229393',
        description: '',
        address: {
          country: {
            id: '5ac1d660-2891-48cb-8527-8ef8813b37a9',
            name: 'Россия'
          },
          city: {
            id: 'sdfnsdkf',
            name: 'Москва'
          },
          formattedAddress: 'Москва, ул. Алая, д. 15, оф. 89, 602030'
        }
      },
      economicalActivityTypes: [
        {
          id: '72a0d7d3-afaf-4f0f-936c-ca4ffa55a7a6',
          name: 'Очень длинная отрасль прям ваще писос ебать охуеть что делать то',
          code: 'AD'
        },
        {
          id: '0e5e6e6a-5a39-4803-9837-156113692c2d',
          name: 'Бургеры',
          code: 'CG'
        }
      ],
      companyType: {
        id: '547e7d91-bc27-4407-a27a-429d2855652b',
        name: 'Сортиры',
        code: 'BT2'
      }
    },
    {
      id: 'a3cbe21c-bab6-4c72-9d2e-8907f9a568982',
      legalName: 'LEGO',
      profile: {
        brandName: {
          en: 'My english brand name',
          ru: 'Мое русское брендовое имя!'
        },
        picture: 'http://logosquiz.net/data/logoquizultimate/images/lego.png',
        links: [],
        email: '',
        phone: '',
        description: '',
        address: {
          country: {
            id: '5ac1d660-2891-48cb-8527-8ef8813b37a9',
            name: 'США'
          },
          city: null,
          formattedAddress: ''
        }
      },
      economicalActivityTypes: [],
      companyType: {
        id: '547e7d91-bc27-4407-a27a-429d2855652b',
        name: 'Частная компания',
        code: 'BT2'
      }
    },
    {
      id: 'a3cbe21c-bab6-4c72-9d2e-8907f9a568983',
      legalName: 'WWF',
      profile: {
        brandName: {
          en: 'My english brand name',
          ru: 'Мое русское брендовое имя!'
        },
        picture: 'http://www.zhangshidai.com/cheats/resources/logoquiz/wwf.png',
        links: [
          {
            name: 'facebook',
            value: 'http://facebook.com'
          }
        ],
        email: 'admin@jincor.com',
        phone: '+7999229393',
        description: '',
        address: {
          country: {
            id: '5ac1d660-2891-48cb-8527-8ef8813b37a9',
            name: 'Russia'
          },
          city: null,
          formattedAddress: 'Москва, ул. Алая, д. 15, оф. 89, 602030'
        }
      },
      economicalActivityTypes: [
        {
          id: '72a0d7d3-afaf-4f0f-936c-ca4ffa55a7a6',
          name: 'Forestry & Logging',
          code: 'AD'
        },
        {
          id: '0e5e6e6a-5a39-4803-9837-156113692c2d',
          name: 'Oil Refining & Natural Gas Processing',
          code: 'CG'
        }
      ],
      companyType: {
        id: '547e7d91-bc27-4407-a27a-429d2855652b',
        name: 'Public Company',
        code: 'BT2'
      }
    },
    {
      id: 'a3cbe21c-bab6-4c72-9d2e-8907f9a568984',
      legalName: 'Bayer',
      profile: {
        brandName: {
          en: 'My english brand name',
          ru: 'Мое русское брендовое имя!'
        },
        picture: 'http://www.zhangshidai.com/cheats/resources/logoquiz/bayer.png',
        links: [
          {
            name: 'facebook',
            value: 'http://facebook.com'
          }
        ],
        email: 'admin@jincor.com',
        phone: '+7999229393',
        description: '',
        address: {
          country: {
            id: '5ac1d660-2891-48cb-8527-8ef8813b37a9',
            name: 'Russia'
          },
          city: null,
          formattedAddress: 'Москва, ул. Алая, д. 15, оф. 89, 602030'
        }
      },
      economicalActivityTypes: [
        {
          id: '72a0d7d3-afaf-4f0f-936c-ca4ffa55a7a6',
          name: 'Forestry & Logging',
          code: 'AD'
        },
        {
          id: '0e5e6e6a-5a39-4803-9837-156113692c2d',
          name: 'Oil Refining & Natural Gas Processing',
          code: 'CG'
        }
      ],
      companyType: {
        id: '547e7d91-bc27-4407-a27a-429d2855652b',
        name: 'Public Company',
        code: 'BT2'
      }
    },
    {
      id: 'a3cbe21c-bab6-4c72-9d2e-8907f9a568985',
      legalName: 'Автомобили, Шаверма, Корпоративы, Свадьбы, Поминки',
      profile: {
        brandName: {
          en: 'My english brand name',
          ru: 'Мое русское брендовое имя!'
        },
        picture: '',
        links: [
          {
            name: 'facebook',
            value: 'http://facebook.com'
          }
        ],
        email: 'admin@jincor.com',
        phone: '+7999229393',
        description: '',
        address: {
          country: {
            id: '5ac1d660-2891-48cb-8527-8ef8813b37a9',
            name: 'Russia'
          },
          city: null,
          formattedAddress: 'Москва, ул. Алая, д. 15, оф. 89, 602030'
        }
      },
      economicalActivityTypes: [
        {
          id: '72a0d7d3-afaf-4f0f-936c-ca4ffa55a7a6',
          name: 'Forestry & Logging',
          code: 'AD'
        },
        {
          id: '0e5e6e6a-5a39-4803-9837-156113692c2d',
          name: 'Oil Refining & Natural Gas Processing',
          code: 'CG'
        }
      ],
      companyType: {
        id: '547e7d91-bc27-4407-a27a-429d2855652b',
        name: 'Public Company',
        code: 'BT2'
      }
    },
    {
      id: 'a3cbe21c-bab6-4c72-9d2e-8907f9a568986',
      legalName: 'Starbucks',
      profile: {
        brandName: {
          en: 'My english brand name',
          ru: 'Мое русское брендовое имя!'
        },
        picture: 'http://logosquiz.net/data/logoquizultimate/images/starbucks.png',
        links: [
          {
            name: 'facebook',
            value: 'http://facebook.com'
          }
        ],
        email: 'admin@jincor.com',
        phone: '+7999229393',
        description: '',
        address: {
          country: {
            id: '5ac1d660-2891-48cb-8527-8ef8813b37a9',
            name: 'Russia'
          },
          city: null,
          formattedAddress: 'Москва, ул. Алая, д. 15, оф. 89, 602030'
        }
      },
      economicalActivityTypes: [
        {
          id: '72a0d7d3-afaf-4f0f-936c-ca4ffa55a7a6',
          name: 'Forestry & Logging',
          code: 'AD'
        },
        {
          id: '0e5e6e6a-5a39-4803-9837-156113692c2d',
          name: 'Oil Refining & Natural Gas Processing',
          code: 'CG'
        }
      ],
      companyType: {
        id: '547e7d91-bc27-4407-a27a-429d2855652b',
        name: 'Public Company',
        code: 'BT2'
      }
    },
    {
      id: 'a3cbe21c-bab6-4c72-9d2e-8907f9a568987',
      legalName: 'Borussia Dortmund',
      profile: {
        brandName: {
          en: 'My english brand name',
          ru: 'Мое русское брендовое имя!'
        },
        picture: 'http://www.weeklyquiz.co.uk/wp-content/uploads/2016/07/bvb.png',
        links: [
          {
            name: 'facebook',
            value: 'http://facebook.com'
          }
        ],
        email: 'admin@jincor.com',
        phone: '+7999229393',
        description: '',
        address: {
          country: {
            id: '5ac1d660-2891-48cb-8527-8ef8813b37a9',
            name: 'Russia'
          },
          city: null,
          formattedAddress: 'Москва, ул. Алая, д. 15, оф. 89, 602030'
        }
      },
      economicalActivityTypes: [
        {
          id: '72a0d7d3-afaf-4f0f-936c-ca4ffa55a7a6',
          name: 'Forestry & Logging',
          code: 'AD'
        },
        {
          id: '0e5e6e6a-5a39-4803-9837-156113692c2d',
          name: 'Oil Refining & Natural Gas Processing',
          code: 'CG'
        }
      ],
      companyType: {
        id: '547e7d91-bc27-4407-a27a-429d2855652b',
        name: 'Public Company',
        code: 'BT2'
      }
    }
  ],
  meta: {
    pagination: {
      total: 0,
      count: 0,
      perPage: 20,
      currentPage: 0,
      totalPages: 0,
      links: {
        previous: '',
        next: ''
      }
    }
  }
})

export default createReducer<State>({
  [search.SUCCESS]: (state: State, { payload }: Action<StateMap>): State => (
    state.merge({ ...payload })
  )
}, initialState)
