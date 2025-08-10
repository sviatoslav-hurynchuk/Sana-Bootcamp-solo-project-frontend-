import type { ToDoItem } from "../../types/models";

export const SET_TASKS = "SET_TASKS" as const;
export const ADD_TASK = "ADD_TASK" as const;
export const UPDATE_TASK = "UPDATE_TASK" as const;
export const ADD_TASK_ERROR = "ADD_TASK_ERROR" as const;
export const TRIGGER_CREATE_TASK = "TRIGGER_CREATE_TASK" as const;

export const setTasks = (tasks: ToDoItem[]) => ({
    type: SET_TASKS,
    payload: tasks,
});

export const addTask = (task: ToDoItem, source: string) => ({
    type: ADD_TASK,
    payload: task,
    meta: { source },
});

export const triggerCreateTask = (
    taskData: {
        text: string;
        dueDate?: string;
        categoryId?: number;
    },
    source: "sql" | "xml"
) => ({
    type: TRIGGER_CREATE_TASK,
    payload: taskData,
    meta: { source },
});

export const updateTask = (taskId: number) => ({
    type: UPDATE_TASK,
    payload: taskId,
});

export const addTaskError = (error: any): any => ({
    type: ADD_TASK_ERROR,
    payload: error,
});

export type TaskAction =
    | ReturnType<typeof setTasks>
    | ReturnType<typeof addTask>
    | ReturnType<typeof updateTask>
    | ReturnType<typeof addTaskError>
    | ReturnType<typeof triggerCreateTask>;
