import {createSelector} from 'reselect';

export const selectSprint = state => state.sprint;

export const selectSprintPbis = createSelector (
    [selectSprint],
    sprint => sprint.pbis
)