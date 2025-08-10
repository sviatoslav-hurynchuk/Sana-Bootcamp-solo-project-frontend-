import { combineEpics } from 'redux-observable';
import { addTaskEpic } from './tasksEpics';

export const rootEpic = combineEpics(
    addTaskEpic
);
