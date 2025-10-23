import type { Launch } from "../types/spacex"

type State = {
    launches: Launch[]
    loading: boolean
    error: null | string
    selected: Launch | null
}

type Action = 
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS', payload: Launch[] }
    | { type: 'FETCH_ERROR', payload: string }
    | { type: 'OPEN_MODAL', payload: Launch}
    | { type: 'CLOSE_MODAL'}



    export function launchesReducer(state: State, action: Action): State {
        switch (action.type) {
            case "FETCH_START":
                return  {...state, loading: true, error: null}
            case "FETCH_SUCCESS":
                return  {...state, loading: false, error: null, launches: action.payload}
            case "FETCH_ERROR": 
                return {...state, loading: false, error: action.payload}
            case "OPEN_MODAL":
                 return {...state, loading: false, error: null, selected: action.payload}
            case "CLOSE_MODAL": 
                return {... state, selected: null}
                default: return state;
        }
    }



    export const initialState: State = {
        launches: [],
        loading: false,
        error: null,
        selected: null
    }