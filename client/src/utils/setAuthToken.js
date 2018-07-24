import axios from '../custom-axios';

const setAuthToken = token => {
  if (token) {
    // apply to every request
    axios.defaults.headers.common.Authorization = token;
  } else {
    // delete auth header
    delete axios.defaults.headers.Authorization;
  }
};

export default setAuthToken;
