import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';
import Calendar from './Calendar';
import { TodoProvider } from './TodoContext';

function App() {
  return (
    <TodoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/todo/:id" element={<TodoDetail />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}

export default App;