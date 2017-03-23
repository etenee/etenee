export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_REQUEST = 'GET_REQUEST';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_ERROR = 'GET_DATA_ERROR';

let nextId = 1;

export function getStudents (list) {
    return {
      type: GET_STUDENTS,
      id: nextId++,
      data: list
    }
};

export function fetchData() {
  const url = 'http://localhost:3001/students/';
  console.log('getting data');
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then((response) => response.json())
}

export function getDataSuccess(payload) {
  console.log('succaess');
  console.log(payload);
  return {
    type: 'GET_DATA_SUCCESS',
    data: payload,
    id: nextId
  }
}

export function getDataError() {
  console.log('error');
  return {
    type: "GET_DATA_ERROR"
  }
}

/*export function dataToRedux() {
  console.log('to redux');
  return dispatch => {
    dispatch(fetchData().then(response => dispatch(
      getDataSuccess(response)
    )))
  }
}*/

export const dataToRedux = dispatch => {
  console.log('fetch starting');
  return fetchData().then(response => dispatch(getDataSuccess(response)))
}


export function getDataRequest() {
  console.log('request');
  return {
    type: "GET_REQUEST"
  }
}
