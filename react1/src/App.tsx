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
        <div className="container fade-in">
            <header className="app-header">
                <h1 className="app-title">ToDo List</h1>
                
                <div className="source-selector">
                    <label htmlFor="source-select" className="form-label">
                        Data Source:
                    </label>
                    <select
                        id="source-select"
                        value={source}
                        onChange={(e) => setSource(e.target.value as "sql" | "xml")}
                        className="form-select"
                    >
                        <option value="sql">SQL Database</option>
                        <option value="xml">XML File</option>
                    </select>
                </div>
            </header>

            <TaskForm source={source} categories={categories} />
            <TaskList tasks={allTasks} source={source} categories={categories} />
        </div>
    );
}
