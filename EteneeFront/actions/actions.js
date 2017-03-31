export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_REQUEST = 'GET_REQUEST';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_ERROR = 'GET_DATA_ERROR';
export const GET_LUK_CURRICULUM_SUCCESS = "GET_LUK_CURRICULUM_SUCCESS";
export const GET_LUK_PASSEDCOURSES_SUCCESS = "GET_LUK_PASSEDCOURSES_SUCCESS";

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

export function fetchCurriculum() {
  const url = 'http://localhost:3001/bachelorCurriculum/';
  console.log('getting data');
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then((response) => response.json())
}

export function getLukCurriculumSuccess(payload) {
  console.log('succaess');
  console.log(payload);
  return {
    type: 'GET_LUK_CURRICULUM_SUCCESS',
    data: payload,
    id: nextId
  }
}

export function fetchPassedCourses() {
  const url = 'http://localhost:3001/students';
  console.log('getting data');
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then((response) => response.json())
}

export function getLukPassedCoursesSuccess(payload) {
  console.log('success');
  console.log(payload);
  return {
    type: 'GET_LUK_PASSEDCOURSES_SUCCESS',
    data: payload,
    id: nextId
  }
}

export const curriculumToState = dispatch => {
  console.log('fetch starting');
  return fetchCurriculum().then(response => dispatch(getLukCurriculumSuccess(response)))
}

export const passedCoursesToState = dispatch => {
  console.log('fetch starting');
  return fetchPassedCourses().then(response => dispatch(getLukPassedCoursesSuccess(response)))
}

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
