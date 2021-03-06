/*import { reducer as sematable } from 'sematable';*/
import { combineReducers } from 'redux';
import { GET_STUDENTS,
  GET_REQUEST, GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  GET_LUK_CURRICULUM_SUCCESS,
  GET_CURRICULUM_GROUP_SUCCESS
} from '../actions/actions.js';

function students (state = [], action) {
  switch (action.type) {
    case "GET_REQUEST":
      console.log('reducer got request');
      return state;
    case "GET_DATA_SUCCESS":
      console.log('reducer got success');
      console.log(action.data.students);
      return {
        students: action.data.students
      };
    default:
      console.log('reducer got default');
      return state;
  }
}

function lukCurriculum (state = [], action) {
  switch (action.type) {
    case "GET_LUK_CURRICULUM_SUCCESS":
      console.log('success in getting curriculum');
      console.log(action.data);
      return {
        lukCurriculum: action.data
      };
    default:
      console.log('reducer got default');
      return state;
  }
}

function curriculumGroup (state = [], action) {
  switch (action.type) {
    case "GET_CURRICULUM_GROUP_SUCCESS":
      console.log('success in getting curriculumGroup');
      console.log(action.data);
      return {
        groupList: action.data
      };
    default:
      console.log('curriculum group reducer got default action');
      return state;
  }
}

const studentModule = combineReducers({
  lukCurriculum,
  students,
  curriculumGroup
});

export default studentModule;
