// components/TaskList.tsx
import { useDispatch } from "react-redux";
import { completeTask } from "../api/graphql";
import { setTasks } from "../store/actions/taskActions";
import type { ToDoItem } from "../types/models";

type Props = {
    tasks: ToDoItem[];
    source: "sql" | "xml";
    categories: { id: number; name: string }[];
};

export const TaskList = ({ tasks, source, categories }: Props) => {
    const dispatch = useDispatch();

    const activeTasks = tasks.filter((t) => !t.isCompleted);
    const completedTasks = tasks
        .filter((t) => t.isCompleted)
        .sort((a, b) => {
            const dateA = new Date(a.completedAt ?? 0).getTime();
            const dateB = new Date(b.completedAt ?? 0).getTime();
            return dateB - dateA;
        });



    const handleComplete = async (taskId: number) => {
        const success = await completeTask(taskId, source);
        if (success) {
            const now = new Date().toISOString();

            dispatch(
                setTasks(
                    tasks.map((t) =>
                        t.id === taskId
                            ? {
                                ...t,
                                isCompleted: true,
                                completedAt: now, // ← ДОДАЙ ЦЕ
                            }
                            : t
                    )
                )
            );
        } else {
            alert("Помилка при завершенні задачі");
        }
    };


    return (
        <>
            <h4 className="text-success mb-3">Активні завдання</h4>
            <table className="table table-hover table-bordered">
                <thead>
                <tr>
                    <th>Текст</th>
                    <th>Дедлайн</th>
                    <th>Категорія</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {activeTasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.text}</td>
                        <td>{task.dueDate?.slice(0, 10)}</td>
                        <td>
                            {categories.find((c) => c.id === task.categoryId)?.name ??
                                "Без категорії"}
                        </td>
                        <td>
                            <button
                                className="btn btn-sm btn-outline-success"
                                onClick={() => handleComplete(task.id)}
                            >
                                ✓
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h4 className="text-muted mt-5 mb-3">Виконані завдання</h4>
            <table className="table table-bordered text-muted">
                <thead>
                <tr>
                    <th>Текст</th>
                    <th>Дедлайн</th>
                    <th>Категорія</th>
                </tr>
                </thead>
                <tbody>
                {completedTasks
                    .map(({ id, text, dueDate, categoryId }) => {
                    const categoryName =
                        categories.find((c) => c.id === categoryId)?.name || "Без категорії";

                    return (
                        <tr key={id} className="text-decoration-line-through">
                            <td>{text}</td>
                            <td>{dueDate?.slice(0, 10)}</td>
                            <td>{categoryName}</td>
                        </tr>
                    );
                })}
                </tbody>

            </table>
        </>
    );
};
