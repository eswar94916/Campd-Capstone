// this is the main redux reducer file that combines all reducers into one to be imported in app.js file

import { combineReducers } from 'redux';
import projects from './projectReducer';

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
    projects: projects,
  
    auth: authReducer,
    errors: errorReducer
});
