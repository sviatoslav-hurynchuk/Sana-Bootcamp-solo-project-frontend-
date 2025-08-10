// store/reducers/taskReducer.ts
import { SET_TASKS, ADD_TASK, UPDATE_TASK, type TaskAction } from '../actions/taskActions';
import type { ToDoItem } from '../../types/models';

export type State = {
    tasks: ToDoItem[];
};

const initialState: State = {
    tasks: [],
};

export const taskReducer = (
    state: State = initialState,
    action: TaskAction
): State => {
    switch (action.type) {
        case SET_TASKS:
            return { ...state, tasks: action.payload };
        case ADD_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload
                        ? { ...task, isCompleted: true, completedAt: new Date().toISOString() }
                        : task
                ),
            };
        default:
            return state;
    }
};
