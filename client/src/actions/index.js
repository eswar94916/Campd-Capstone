// index.js

import { ADD_PROJECT, DELETE_PROJECT, SEARCH_PROJECT, FETCH_PROJECT, VIEW_PROJECT } from './types';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/projects';


export const createProject = ({ name, owner, ownerID, contactInfo, status, description, gitRepo, file, date }) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/add`, { name, owner, ownerID, contactInfo, status, description, gitRepo, file, date })
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
      file: data.file,
      date: data.date
    }
  }
};

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
