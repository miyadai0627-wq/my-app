import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TodoContext } from './TodoContext';

export default function TodoDetail() {
  const { id } = useParams();
  // ★金庫から dispatch を取り出す
  const { todos, dispatch } = useContext(TodoContext);

  const todo = todos.find((t) => t.id === Number(id));

  // もしTODOが見つからなかった時のための安全策
  if (!todo) {
    return (
      <div className="todo-app">
        <p>TODOが見つかりませんでした。</p>
        <Link to="/">一覧に戻る</Link>
      </div>
    );
  }

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

  const onChangeReminder = (e) => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: { id: todo.id, updates: { reminder: e.target.value } }
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

      <div className="input-group">
        <label>リマインダー</label>
        <select
          value={todo.reminder ?? 'none'}
          onChange={onChangeReminder}
          className="reminder-select"
        >
          <option value="none">リマインダーなし</option>
          <option value="0">当日</option>
          <option value="1">1日前</option>
          <option value="3">3日前</option>
          <option value="7">1週間前</option>
        </select>
      </div>
    </div>
  );
}
