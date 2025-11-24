import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('study_todos.db');

export const initDb = () => {
  db.execSync(
    `CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      isDone INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL
    );`
  );
};

export const getAllTasks = async (): Promise<any[]> => {
  const result = await db.getAllAsync('SELECT * FROM tasks ORDER BY createdAt DESC');
  return result;
};

export const insertTask = async (title: string): Promise<void> => {
  const createdAt = new Date().toISOString();
  await db.runAsync(
    'INSERT INTO tasks (title, isDone, createdAt) VALUES (?, 0, ?)',
    [title, createdAt]
  );
};

export const toggleTaskDone = async (id: number, isDone: boolean): Promise<void> => {
  await db.runAsync(
    'UPDATE tasks SET isDone = ? WHERE id = ?',
    [isDone ? 1 : 0, id]
  );
};

export const deleteTask = async (id: number): Promise<void> => {
  await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
};

export const getTaskById = async (id: number): Promise<any | null> => {
  const result = await db.getFirstAsync('SELECT * FROM tasks WHERE id = ?', [id]);
  return result ?? null;
};
