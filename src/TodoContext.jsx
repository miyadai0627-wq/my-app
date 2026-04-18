import { createContext, useReducer } from 'react';

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

// ③ 管理人（Provider）の設定
export function TodoProvider({ children }) {
  // useReducer(料理人, 初期値) を使います
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    // 金庫の中には「データ(todos)」と「注文窓口(dispatch)」を入れます
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}