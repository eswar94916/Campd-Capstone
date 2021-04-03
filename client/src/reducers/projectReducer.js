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
                    project.ownerID.includes(value) // ||
                    //project.tags.join(" ").toLowerCase().includes(value) // ||
                    //project.status.toLowerCase().includes(value)
                ) {
                    return true;
                }
            });
        }

        case FILTER_PROJECT: {
            const { filter, require, exclude, query } = action;
            console.log("filtering", filter, require, exclude, query);
            const filterToStatuses = {
                proposal: "isProposal",
                active: "isActive",
                paused: "isPaused",
                stopped: "isStopped",
                archived: "isArchived",
                approved: "isApproved",
                pending: "isApproved",
                recruiting: "isRecruiting",
                notRecruiting: "isRecruiting",
            };

            var mustHaveOne = [];
            var approvalRequirement = "required";
            var recruitingRequirement = "any";

            /**
             * Fill the list of non-proposal statuses projects must be one of
             */
            for (const thisFilter of filter) {
                if (!["approved", "pending", "recruiting", "notRecruiting"].includes(thisFilter)) {
                    mustHaveOne.push(filterToStatuses[thisFilter]);
                }
            }

            /**
             * Set the approval requirement
             */
            if (filter.includes("approved") == filter.includes("pending")) {
                approvalRequirement = "any";
            } else {
                approvalRequirement = filter.includes("approved") ? "required" : "excluded";
            }

            /**
             * Set the recruiting requirement
             */
            if (filter.includes("recruiting") == filter.includes("notRecruiting")) {
                recruitingRequirement = "any";
            } else {
                recruitingRequirement = filter.includes("recruiting") ? "required" : "excluded";
            }

            return action.projects.filter((project) => {
                /**
                 * Filter out projects that dont match status requirements
                 */
                if (
                    //Project doesn't match approval requirement
                    (approvalRequirement == "required" && !project.statuses.isApproved) ||
                    (approvalRequirement == "excluded" && project.statuses.isApproved) ||
                    //project doesn't match recruiting requirement
                    (recruitingRequirement == "required" && !project.statuses.isRecruiting) ||
                    (recruitingRequirement == "excluded" && project.statuses.isRecruiting) ||
                    //project is a proposal when we dont want proposals
                    (!filter.includes("proposal") && project.statuses.isProposal) ||
                    //project does not have one of the required non-proposal statuses
                    !mustHaveOne.some(function (thisStatus) {
                        return project.statuses[thisStatus];
                    })
                ) {
                    return false;
                }

                /**
                 * Filter projects based on tags
                 */
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

                /**
                 * If it doesnt contain the search term, exclude it
                 */
                if (
                    query &&
                    !(
                        project.name.toLowerCase().includes(query) ||
                        project.description.toLowerCase().includes(query) ||
                        project.owner.toLowerCase().includes(query)
                    )
                ) {
                    return false;
                }

                /**
                 * Only return if passed every test
                 */
                return true;
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
