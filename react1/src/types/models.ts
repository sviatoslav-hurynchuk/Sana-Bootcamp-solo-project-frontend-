export type ToDoItem = {
    id: number;
    text: string;
    isCompleted: boolean;
    createdAt?: string;
    completedAt?: string;
    dueDate?: string;
    categoryId?: number;
};

export interface Category {
    id: number;
    name: string;
}
