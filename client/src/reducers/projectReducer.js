// projectReducer.js

import {
    ADD_PROJECT,
    DELETE_PROJECT,
    SEARCH_PROJECT,
    FETCH_PROJECT,
    VIEW_PROJECT
} from '../actions/types';

export default function projectReducer(state = [], action) {
    switch (action.type) {
        case ADD_PROJECT:
            return [...state, action.payload];
        case DELETE_PROJECT:
            return state.filter(project => project._id !== action.payload.id);
        case SEARCH_PROJECT: {
            const {
                value
            } = action;
            if (value === "") {
                return action.projects;
            }
            return action.projects.filter(project => project.name.toLowerCase().includes(value) ||
                project.description.toLowerCase().includes(value) ||
                project.owner.toLowerCase().includes(value) ||
                project.ownerID.includes(value)
            );
        }
        case FETCH_PROJECT:
            return action.projects;
        case VIEW_PROJECT: {
            const {
                idvalue
            } = action;
            if (idvalue === "") {
                return action.projects;
            }
            return action.projects.filter(project => project._id.includes(idvalue));
        }
        default:
            return state;
    }
}