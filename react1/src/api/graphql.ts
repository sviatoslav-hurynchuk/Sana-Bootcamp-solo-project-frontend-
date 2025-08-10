import type { ToDoItem, Category } from "../types/models.ts";

const GRAPHQL_ENDPOINT = "http://localhost:5145/graphql";

export const fetchTasks = async (source = "sql"): Promise<ToDoItem[]> => {
    const query = `
    query GetTasks($source: String) {
      tasks(source: $source) {
        id
        text
        isCompleted
        dueDate
        createdAt
        completedAt
        categoryId
      }
    }
  `;

    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "GraphQL-Require-Preflight": "1"
        },
        body: JSON.stringify({
            query,
            variables: { source },
        }),
    });

    const json = await response.json();
    return json.data.tasks as ToDoItem[];
};

export const fetchCategories = async (
    source: "sql" | "xml" = "sql"
): Promise<Category[]> => {
    const query = `
      query GetCategories($source: String) {
        categories(source: $source) {
          id
          name
        }
      }
    `;

    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "GraphQL-Require-Preflight": "1"
        },
        body: JSON.stringify({
            query,
            variables: { source },
        }),
    });

    const json = await response.json();

    if (json.errors) {
        throw new Error(json.errors[0].message);
    }

    return json.data.categories as Category[];
};
export const createTask = async (
    taskData: { text: string; dueDate?: string; categoryId?: number | string },
    source = "sql"
): Promise<ToDoItem> => {
    const mutation = `
    mutation CreateTask($text: String!, $dueDate: Date, $categoryId: Int, $source: String) {
      createTask(text: $text, dueDate: $dueDate, categoryId: $categoryId, source: $source) {
        id
        text
        isCompleted
        dueDate
        createdAt
        categoryId
      }
    }
  `;

    const variables = {
        text: taskData.text,
        dueDate: taskData.dueDate ? taskData.dueDate.substring(0, 10) : null,
        categoryId: taskData.categoryId ? Number(taskData.categoryId) : null,
        source,
    };

    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "GraphQL-Require-Preflight": "1"
        },
        body: JSON.stringify({
            query: mutation,
            variables,
        }),
    });

    const json = await response.json();

    if (json.errors) {
        throw new Error(json.errors[0].message);
    }

    return json.data.createTask as ToDoItem;
};

export const completeTask = async (
    id: number,
    source: "sql" | "xml" = "sql"
): Promise<boolean> => {
    const mutation = `
    mutation CompleteTask($id: Int!, $source: String) {
      updateTask(id: $id, source: $source)
    }
  `;

    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "GraphQL-Require-Preflight": "1"
        },
        body: JSON.stringify({
            query: mutation,
            variables: { id, source },
        }),
    });

    const json = await response.json();

    if (json.errors) {
        console.error("GraphQL Error:", json.errors);
        return false;
    }

    return json.data.updateTask as boolean;
};
