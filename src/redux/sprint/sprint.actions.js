import sprintActionTypes from './sprint.types';

import {filestore} from '../../firebase/firebase.utils';

export const fetchSprintStart = () => ({
    type: sprintActionTypes.FETCH_SPRINT_START,
});

export const fetchSprintSuccess = sprintMap => ({
    type: sprintActionTypes.FETCH_SPRINT_SUCCESS,
    payload: sprintMap
})

export const fetchSprintFailure = errorMessage => ({
    type: sprintActionTypes.FETCH_SPRINT_FAILURE,
    payload: errorMessage
})

export const fetchSprintStartAsync = () => {

    return dispatch => {

        const sprintRef = filestore.collection('sprint');
        dispatch(fetchSprintStart()); // start data loading 
        let currentSprint ={}; currentSprint.pbis = [];
        let pbiRef = null;
        sprintRef.get().then(sprintSnapshot => {
            // eslint-disable-next-line
        sprintSnapshot.docs.map(sprint => {
            const {name,startDate,endDate} = sprint.data();  // sprint attributes
            pbiRef = sprint.ref.collection('pbis');
            currentSprint.id = sprint.id;
            currentSprint.name=name;
            currentSprint.startDate=startDate.toDate();
            currentSprint.endDate=endDate.toDate();  
          })
         })
         .then(() => {
            pbiRef.get().then(pbis => {
                // eslint-disable-next-line
                pbis.docs.map(pbi => {
                    const {id,description,days} = pbi.data()
                    currentSprint.pbis.push({id,description,days});
                })
                dispatch(fetchSprintSuccess(currentSprint));                
            })
         }
         )
         .catch(error => dispatch(fetchSprintFailure(error.message)))
    }
}
