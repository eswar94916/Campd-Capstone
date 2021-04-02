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
            /**
             * If no filters are selected, show all approved projects
             * regardless of other statuses
             */
            if (!filter || filter.length < 1) {
                return action.projects.filter((project) => project.statuses.isApproved);
            }

            /**
             * If the only filter is to show pending projects, return
             * every project ever
             */
            if (filter.length == 1 && filter[0] == "showPending") {
                return action.projects;
            }
            /**
             * If filters are selected, run through the Projects
             * for each selected filter
             */
            return action.projects.filter((project) => {
                /**
                 * If we aren't showing pending projects, automatically exclude
                 * those which are not approved
                 */
                if (!filter.includes("showPending") && !project.statuses.isApproved) {
                    return false;
                }

                /**
                 * For each selected status, check each project for a match.
                 * If a project matches one status check, send it on and
                 * don't check any others
                 */
                for (const thisStatus of filter) {
                    if (project.statuses[thisStatus]) {
                        return true;
                    }
                }

                /**
                 * If we got here, no statuses matched and the project is not
                 * included
                 */
            });
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
