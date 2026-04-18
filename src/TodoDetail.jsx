import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TodoContext } from './TodoContext';

export default function TodoDetail() {
  const { id } = useParams();
  // ★金庫から dispatch を取り出す
  const { todos, dispatch } = useContext(TodoContext);

  const todo = todos.find((t) => t.id === Number(id));

  // ...!todo の処理はそのまま...

  // タイトル更新の関数
  const onChangeTitle = (e) => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: {
        id: todo.id,
        updates: { title: e.target.value }
      }
    });
  };

  // 詳細メモ更新の関数
  const onChangeDescription = (e) => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: {
        id: todo.id,
        updates: { description: e.target.value }
      }
    });
  };
  return (
    <div className="todo-app">
      <Link to="/" className="back-link">← 一覧に戻る</Link>
      
      <h1>詳細画面</h1>
      <p>ID: {id} の内容を表示しています</p>
      <div className="input-group">
        <label>タイトル</label>
        <input 
        type="text" 
        value={todo.title} 
        onChange={onChangeTitle} />
      </div>

      <div className="input-group">
        <label>詳細</label>
        <textarea 
        name="description" 
        id="" placeholder="詳細を記入してください" 
        value={todo.description || ''} 
        onChange={onChangeDescription}
        ></textarea>
      </div>
      <p>期限: {todo.date}</p>
    </div>
  );
}
