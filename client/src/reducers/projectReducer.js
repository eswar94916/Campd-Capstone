// projectReducer.js

import {
    ADD_PROJECT,
    DELETE_PROJECT,
    SEARCH_PROJECT,
    FETCH_PROJECT,
    VIEW_PROJECT,
    FILTER_PROJECT,
} from "../actions/types";

export default function projectReducer(state = [], action) {
    switch (action.type) {
        case ADD_PROJECT:
            return [...state, action.payload];
        case DELETE_PROJECT:
            return state.filter((project) => project._id !== action.payload.id);
        case SEARCH_PROJECT: {
            const { value } = action;
            if (value === "") {
                return action.projects;
            }
            return action.projects.filter((project) => {
                if (
                    project.name.toLowerCase().includes(value) ||
                    project.description.toLowerCase().includes(value) ||
                    project.owner.toLowerCase().includes(value) ||
                    project.ownerID.includes(value) ||
                    project.tags.join(" ").toLowerCase().includes(value) // ||
                    //project.status.toLowerCase().includes(value)
                ) {
                    return true;
                }
            });
        }
        case FILTER_PROJECT: {
            const { filter } = action;
            if (filter.length < 1) {
                return action.projects;
            }
            return action.projects.filter((project) => filter.join(" ").includes(project.status.toLowerCase())); //project.status.toLowerCase().includes(filter.toLowerCase()))
        }
        case FETCH_PROJECT:
            return action.projects;
        case VIEW_PROJECT: {
            const { idvalue } = action;
            if (idvalue === "") {
                return action.projects;
            }
            return action.projects.filter((project) => project._id.includes(idvalue));
        }
        default:
            return state;
    }
}
