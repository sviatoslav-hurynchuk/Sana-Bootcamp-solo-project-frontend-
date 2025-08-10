import { ofType } from "redux-observable";
import type { Epic } from "redux-observable";
import { debounceTime, mergeMap} from "rxjs/operators";
import type { RootState } from "../store";
import type { TaskAction } from "../store/actions/taskActions";
import { from, of } from "rxjs";
import { TRIGGER_CREATE_TASK, addTask, setTasks, addTaskError } from "../store/actions/taskActions";
import {createTask, fetchTasks} from "../api/graphql.ts";

export const addTaskEpic: Epic<TaskAction, TaskAction, RootState> = (action$) =>
    action$.pipe(
        ofType(TRIGGER_CREATE_TASK),
        debounceTime(500),
        mergeMap((action) =>
            from(
                (async () => {
                    try {
                        const source = action.meta.source;
                        const newTask = await createTask(action.payload, source);
                        const tasks = await fetchTasks(source);
                        return [addTask(newTask, source), setTasks(tasks)];
                    } catch (error) {
                        return [addTaskError(error)];
                    }
                })()
            ).pipe(mergeMap((actions) => of(...actions)))
        )
    );
