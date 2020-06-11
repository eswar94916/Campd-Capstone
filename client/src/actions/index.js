// index.js

import { ADD_PROJECT, DELETE_PROJECT, SEARCH_PROJECT, FILTER_PROJECT, FETCH_PROJECT, VIEW_PROJECT } from './types';
import axios from 'axios';

const apiUrl = '/projects';

//Creating Project
export const createProject = ({ name, owner, ownerID, contactInfo, status, description, gitRepo, tags, file, date }) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/add`, { name, owner, ownerID, contactInfo, status, description, gitRepo, tags, file, date })
      .then(response => {
        dispatch(createProjectSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createProjectSuccess =  (data) => {
  return {
    type: ADD_PROJECT,
    payload: {
      _id: data._id,
      name: data.name,
      owner: data.owner,
      ownerID: data.ownerID,
      contactInfo: data.contactInfo,
      status: data.status,
      description: data.description,
      gitRepo: data.gitRepo,
      tags: data.tags,
      file: data.file,
      date: data.date
    }
  }
};


//Deleting Project
export const deleteProjectSuccess = id => {
  return {
    type: DELETE_PROJECT,
    payload: {
      id
    }
  }
}

export const deleteProject = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/delete/${id}`)
      .then(response => {
        dispatch(deleteProjectSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};


//Fetching Project
export const fetchProjects = (projects) => {
  return {
    type: FETCH_PROJECT,
    projects
  }
};

export const fetchAllProjects = () => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(fetchProjects(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};


//Searching Project
export const searchProject = (value, projects) => {
  return { type: SEARCH_PROJECT, value, projects };
}

export const searchProjects = (value) => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(searchProject(value, response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};


//Filtering Project
export const filterProject = (filter, projects) => {
    return {type: FILTER_PROJECT, filter, projects}
}


//Viewing Project
export const viewProject = (idvalue, projects) => {
  return {type: VIEW_PROJECT, idvalue, projects}
}

export const viewProjects = (idvalue) => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(viewProject(idvalue, response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
