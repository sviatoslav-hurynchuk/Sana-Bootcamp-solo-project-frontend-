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
        <form onSubmit={handleSubmit} className="mb-5 card-form">
            <div className="mb-3">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="form-control"
                    placeholder="Введіть текст завдання"
                    required
                />
            </div>

            <div className="row g-2 align-items-end">
                <div className="col-md-4">
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-5">
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Оберіть категорію</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-3 text-end">
                    <button type="submit" className="btn btn-primary w-100">
                        Створити
                    </button>
                </div>
            </div>
        </form>
    );
};