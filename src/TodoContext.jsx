import { createContext, useState } from 'react';

// ① 空っぽの「金庫」の枠組みを作ります
export const TodoContext = createContext();

// ② 金庫の管理人（プロバイダー）を作ります
export function TodoProvider({ children }) {
  // TodoList.jsx にあった useState を、この金庫の中に引っ越します！
  const [todos, setTodos] = useState([]);

  return (
    // ③ 管理人が、アプリ全体（children）に todos と setTodos を貸し出します
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
}