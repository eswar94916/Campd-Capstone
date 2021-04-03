// projectReducer.js

import {
    ADD_PROJECT,
    DELETE_PROJECT,
    SEARCH_PROJECT,
    FETCH_PROJECT,
    VIEW_PROJECT,
    FILTER_PROJECT,
    FILTER_TAGS,
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
            const { filter, require, exclude } = action;
            console.log("filtering", new Date());
            const filterToStatuses = {
                proposal: { isProposal: true },
                active: { isActive: true },
                paused: { isPaused: true },
                stopped: { isStopped: true },
                archived: { isArchived: true },
                approved: { isApproved: true },
                pending: { isApproved: false },
                recruiting: { isRecruiting: true },
                notRecruiting: { isRecruiting: false },
            };

            var projectFilters = {};

            for (const thisFilter of filter) {
                if (projectFilters.hasOwnProperty(Object.keys(filterToStatuses[thisFilter])[0])) {
                    delete projectFilters[Object.keys(filterToStatuses[thisFilter])[0]];
                } else {
                    projectFilters = Object.assign(projectFilters, filterToStatuses[thisFilter]);
                }
            }

            return action.projects.filter((project) => {
                if (
                    projectFilters.hasOwnProperty("isApproved") &&
                    projectFilters.isApproved != project.statuses.isApproved
                ) {
                    return false;
                }

                if (
                    projectFilters.hasOwnProperty("isRecruiting") &&
                    projectFilters.isRecruiting != project.statuses.isRecruiting
                ) {
                    return false;
                }
                for (const [key, value] of Object.entries(projectFilters)) {
                    if (project.statuses[key] == value) {
                        if (require) {
                            for (const thisTag of require) {
                                if (!project.tags.includes(thisTag)) {
                                    return false;
                                }
                            }
                        }
                        if (exclude) {
                            for (const thisTag of exclude) {
                                if (project.tags.includes(thisTag)) {
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                }
            });
        }

        case FILTER_TAGS:
            const { include, exclude } = action;
            console.log(include, exclude, action.projects);
            if ((!include || include.length < 1) && (!exclude || exclude.length < 1)) {
                return action.projects;
            }
            return action.projects.filter((project) => {
                if (exclude) {
                    for (const thisTag of exclude) {
                        if (project.tags.includes(thisTag)) {
                            return false;
                        }
                    }
                }
                if (include) {
                    for (const thisTag of include) {
                        if (project.tags.includes(thisTag)) {
                            return true;
                        }
                    }
                }
            });

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
