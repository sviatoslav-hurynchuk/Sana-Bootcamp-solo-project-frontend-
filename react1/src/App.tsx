// App.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, fetchCategories } from "./api/graphql";
import { setTasks } from "./store/actions/taskActions";
import type { RootState } from "./store";
import type { Category } from "./types/models";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
    const dispatch = useDispatch();
    const allTasks = useSelector((state: RootState) => state.tasksState.tasks);
    const [source, setSource] = useState<"sql" | "xml">("sql");
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchTasks(source).then((tasks) => dispatch(setTasks(tasks)));

        fetchCategories(source).then((cats) => setCategories(cats));
    }, [dispatch, source]);

    return (
        <div className="container">
            <h2 className="mb-4 text-center text-primary">ToDo List</h2>

            <div className="text-end mb-3">
                <select
                    value={source}
                    onChange={(e) => setSource(e.target.value as "sql" | "xml")}
                    className="form-select form-select-sm w-auto d-inline"
                >
                    <option value="sql">SQL</option>
                    <option value="xml">XML</option>
                </select>
            </div>

            <TaskForm source={source} categories={categories} />
            <TaskList tasks={allTasks} source={source} categories={categories} />
        </div>
    );
}
