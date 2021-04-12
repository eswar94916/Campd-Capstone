/* This is the error redux reducers.  Note - it appears as though these are no longer used. */
import { GET_ERRORS } from "../actions/types";
const initialState = {};
export default function err(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
