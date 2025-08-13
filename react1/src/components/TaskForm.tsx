// components/TaskForm.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {triggerCreateTask} from "../store/actions/taskActions";

type Props = {
    source: "sql" | "xml";
    categories: { id: number; name: string }[];
};

export const TaskForm = ({ source, categories }: Props) => {
    const dispatch = useDispatch();

    const [text, setText] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        dispatch(triggerCreateTask({
            text,
            dueDate,
            categoryId: categoryId ? parseInt(categoryId) : undefined,
        }, source));

        setText("");
        setDueDate("");
        setCategoryId("");
    };

    return (
        <form onSubmit={handleSubmit} className="card-form slide-in">
            <h3 className="section-header active mb-4">
                <i className="fas fa-plus-circle me-2"></i>
                Create New Task
            </h3>
            
            <div className="mb-4">
                <label htmlFor="task-text" className="form-label">
                    Task Description
                </label>
                <input
                    id="task-text"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="form-control"
                    placeholder="Enter your task description here..."
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="task-date" className="form-label">
                        Due Date
                    </label>
                    <input
                        id="task-date"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="task-category" className="form-label">
                        Category
                    </label>
                    <select
                        id="task-category"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        <i className="fas fa-plus me-2"></i>
                        Create Task
                    </button>
                </div>
            </div>
        </form>
    );
};