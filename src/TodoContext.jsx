import { createContext, useReducer, useEffect, useRef } from 'react';

// ① 金庫（Context）の作成
export const TodoContext = createContext();

// ② 注文書（アクション）を受け取って、新しい状態（State）を作る「料理人（Reducer）」
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    case 'UPDATE_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.updates }
          : todo
      );
    default:
      return state;
  }
}
// LocalStorageからデータを読み込む関数
const getInitialTodos = () => {
  try {
    const savedTodos = localStorage.getItem('todos');
    // データがあればJSONとして解析して返す。なければ空の配列 [] を返す。
    return savedTodos ? JSON.parse(savedTodos) : [];
  } catch (error) {
    // 予期せぬエラー（データが壊れている等）が起きたら空の配列を返す
    console.error("データの読み込みに失敗しました", error);
    return [];
  }
};
// ③ 管理人（Provider）の設定
export function TodoProvider({ children }) {
  // --- ここから下がコンポーネントの中身（フックが使える場所） ---
  
  // useReducerの初期値に getInitialTodos() を指定
  const [todos, dispatch] = useReducer(todoReducer, getInitialTodos());

  // 自動保存：todosが更新されるたびにLocalStorageに書き込む
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // リマインダー通知
  const shownRef = useRef(
    new Set(JSON.parse(localStorage.getItem('shownReminders') || '[]'))
  );

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const check = () => {
      if (Notification.permission !== 'granted') return;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      todos.forEach(todo => {
        if (!todo.date || todo.reminder === 'none' || todo.reminder == null) return;
        const dueDate = new Date(todo.date);
        dueDate.setHours(0, 0, 0, 0);
        const diffDays = Math.round((dueDate - today) / (1000 * 60 * 60 * 24));
        const threshold = Number(todo.reminder);
        if (diffDays === threshold) {
          const key = `${todo.id}-${todo.reminder}`;
          if (!shownRef.current.has(key)) {
            shownRef.current.add(key);
            localStorage.setItem('shownReminders', JSON.stringify([...shownRef.current]));
            const label = threshold === 0 ? '本日期限' : `${threshold}日後が期限`;
            new Notification(`📌 ${todo.title}`, { body: `${label}のTODOがあります (${todo.date})` });
          }
        }
      });
    };

    check();
    const timer = setInterval(check, 60 * 1000);
    return () => clearInterval(timer);
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}