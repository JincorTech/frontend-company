import { createReducer, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

import { Company } from '../profile/profileView';

export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  isLoading: boolean
  page: number
  companies: Company[]
  meta: Meta
};

export type Meta = {
  pagination: Pagination
};

export type Pagination = {
  total: number
  from: number
  to: number
  perPage: number
  currentPage: number
  lastPage: number
  prevPageUrl: string | null
  nextPageUrl: string | null
};

export type SearchRequest = {
  request: string
  country?: string
  activity?: string
  perPage: number
  page: number
};

export type SearchResponse = {
  companies: Company[]
  meta: Meta
};

export const SEARCH = 'search/search/SEARCH';
export const FETCH_COUNTRIES = 'search/search/FETCH_COUNTRIES';
export const NEXT_PAGE = 'search/search/NEXT_PAGE';

export const search = createAsyncAction<SearchRequest, SearchResponse>(SEARCH);
export const fetchCountries = createAsyncAction<void, void>(FETCH_COUNTRIES);
export const nextPage = createAsyncAction<SearchRequest, SearchResponse>(NEXT_PAGE);

const initialState = from<StateMap>({
  isLoading: false,
  companies: [],
  page: 1,
  meta: {
    pagination: {
      total: 0,
      from: 0,
      to: 0,
      perPage: 20,
      currentPage: 0,
      lastPage: 0,
      prevPageUrl: null,
      nextPageUrl: null
    }
  }
});

export default createReducer<State>({
  [search.REQUEST]: (state: State): State => (
    state.merge({ isLoading: true })
  ),

  [search.SUCCESS]: (state: State, { payload }: Action<SearchResponse>): State => (
    state.merge({ ...state, ...payload, isLoading: false })
  ),

  [nextPage.REQUEST]: (state: State): State => (
    state.merge({ isLoading: true })
  ),

  [nextPage.SUCCESS]: (state: State, { payload }: Action<SearchResponse>): State => (
    state.merge({ meta: payload.meta, companies: state.companies.concat(payload.companies), isLoading: false })
  )
}, initialState);
