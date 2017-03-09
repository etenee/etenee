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

/*export function getStudentList() {
  return function(dispatch) {
    //dispatch(getStudents(list));
    fetch('http://localhost:3001/students/', {
      method: 'get'
      //body: JSON.stringify
    }).then((response) => {
      console.log(response, nextId);
      dispatch(getStudents(response));
    })
  }
};*/

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

export function dataToRedux() {
  console.log('to redux');
  return dispatch => {
    dispatch(fetchData().then(response => dispatch(
      getDataSuccess(response)
    )))
    /*getData().then((response) => {
      console.log(response);
    }).then((response) => {
        getDataSuccess(response)
    })*/
  }
  /*getData().then((response) => {
    if (response.status === 200){
      dispatch(getDataSuccess(response))
    } else {
      dispatch(getDataError())
    }


  });*/

}

export function getDataRequest() {
  console.log('request');
  return {
    type: "GET_REQUEST"
  }
}
