import sprintActionTypes from './sprint.types';

const INIT_STATE = {
    name: '',
    startDate: '',
    endDate: '',
    isDataUploaded: false,
    isFetching: false,
    errorMessage: undefined,
    pbis: []
}

// const copyPbisArray = (pbis)=> {
//     const newArr =[];
//     console.log('inside reducer. Time->',new Date());
//     console.log('input array',pbis.length, pbis);
//     pbis.forEach(pbi => {console.log('element is ',pbi)})
//     pbis.map(pbi => {
//         newArr.push(pbi);
//     });
//     console.log('output array', newArr);    
//     return newArr;
// }

const sprintReducer = (state=INIT_STATE,action) => {
    switch (action.type) {
        case sprintActionTypes.FETCH_SPRINT_START: 
            return {
                ...state,
                isFetching: true
            }
        case sprintActionTypes.FETCH_SPRINT_SUCCESS: return {
            ...state,
            isFetching: false,
            isDataUploaded: true,
            name: action.payload.name,
            startDate: action.payload.startDate,
            endDate: action.payload.endDate,
            // pbis: copyPbisArray(action.payload.pbis)
            pbis: action.payload.pbis
        }
        case sprintActionTypes.FETCH_SPRINT_FAILURE: return {
            ...state,
            isFetching: false,
            errorMessage: action.payload
        }
        default: return state;
    }
}

export default sprintReducer;