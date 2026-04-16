import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';
import { TodoProvider } from './TodoContext';

function App() {
  return (
    // ↓ ★TodoProvider で全体を包むことで、どの画面からでも金庫を使えるようにする！
    <TodoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/todo/:id" element={<TodoDetail />} />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}

export default App;