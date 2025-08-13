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
                                completedAt: now,
                            }
                            : t
                    )
                )
            );
        } else {
            alert("Error completing task");
        }
    };

    return (
        <>
            {/* Active Tasks Section */}
            <div className="table-container slide-in">
                <h3 className="section-header active">
                    <span className="task-status active"></span>
                    Active Tasks ({activeTasks.length})
                </h3>
                
                {activeTasks.length === 0 ? (
                    <div className="empty-state">
                        <i className="fas fa-check-circle fa-2x"></i>
                        <p>No active tasks. Great job!</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>Due Date</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeTasks.map((task) => (
                                    <tr key={task.id} className="fade-in">
                                        <td>
                                            <strong>{task.text}</strong>
                                        </td>
                                        <td>
                                            {task.dueDate ? (
                                                <span className="badge bg-info">
                                                    {task.dueDate.slice(0, 10)}
                                                </span>
                                            ) : (
                                                <span className="text-muted">No due date</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className="badge bg-secondary">
                                                {categories.find((c) => c.id === task.categoryId)?.name ?? "No category"}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-outline-success"
                                                onClick={() => handleComplete(task.id)}
                                                title="Mark as completed"
                                            >
                                                <i className="fas fa-check"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Completed Tasks Section */}
            {completedTasks.length > 0 && (
                <div className="table-container slide-in">
                    <h3 className="section-header completed">
                        <span className="task-status completed"></span>
                        Completed Tasks ({completedTasks.length})
                    </h3>
                    
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>Due Date</th>
                                    <th>Category</th>
                                    <th>Completed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {completedTasks.map(({ id, text, dueDate, categoryId, completedAt }) => {
                                    const categoryName =
                                        categories.find((c) => c.id === categoryId)?.name || "No category";

                                    return (
                                        <tr key={id} className="text-decoration-line-through fade-in">
                                            <td className="text-muted">{text}</td>
                                            <td>
                                                {dueDate ? (
                                                    <span className="badge bg-light">
                                                        {dueDate.slice(0, 10)}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted">No due date</span>
                                                )}
                                            </td>
                                            <td>
                                                <span className="badge bg-light">
                                                    {categoryName}
                                                </span>
                                            </td>
                                            <td>
                                                <small className="text-muted">
                                                    {completedAt ? new Date(completedAt).toLocaleDateString() : 'Unknown'}
                                                </small>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};
