// store/index.ts
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { taskReducer } from './reducers/taskReducer';
import { rootEpic } from '../epics/rootEpic';
import type { TaskAction } from './actions/taskActions';

const rootReducer = combineReducers({
    tasksState: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const epicMiddleware = createEpicMiddleware<TaskAction, TaskAction, RootState>();

export const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);
