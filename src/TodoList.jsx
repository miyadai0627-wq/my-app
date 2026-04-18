import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { TodoContext } from './TodoContext'
import './App.css'

function TodoList() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [titleError, setTitleError] = useState(false); // タイトルが未入力かどうかの記憶（最初はfalse=エラーなし）
  const [dateError, setDateError] = useState(false);   // 期限が未入力かどうかの記憶（最初はfalse=エラーなし）
  const { todos, dispatch } = useContext(TodoContext);

  const onClickAdd = () => {
    // タイトルが空っぽ（''）ならエラーをtrue、入力されていればfalseにする
    if (title === '') {
      setTitleError(true)
    } else {
      setTitleError(false)
    }

    // 期限が空っぽ（''）ならエラーをtrue、入力されていればfalseにする
    if (date === '') {
      setDateError(true)
    } else {
      setDateError(false)
    }

    // もし両方とも入力されていたら...
    if (title !== '' && date !== '') {
      // ① 新しいTODOのデータを作る
      const newTodo = {
        id: Date.now(),
        title: title,
        date: date,
        description: '' // ← 【重要】レビュー指摘箇所：最初から空っぽのdescriptionを持たせておく！
      };
      dispatch({ type: 'ADD_TODO', payload: newTodo }); // setTodosの代わりに注文(dispatch)を送る

      // ② 古いTODOリストの最後に、新しいTODOを合体させて保存し直す
      setTodos([...todos, newTodo]);

      // ③ 入力欄を空っぽにリセットする
      setTitle('');
      setDate('');
    }
  }
    // 削除ボタンが押された時の処理（どのTODOを消すか判断するために id を受け取る）
  const onClickDelete = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }
  return (
    <div className="todo-app">
      <h1>TODO一覧</h1>
      <div className="input-area">
        <div className="input-group">
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={titleError ? 'error-input' : ''}
        />
        {titleError && <p className="error-text">未入力です</p>}
        </div>
        <div className="input-group">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={dateError ? 'error-input' : ''}
        />
        {dateError && <p className="error-text">未入力です</p>}
        </div>
        <button className="add-button" onClick={onClickAdd}>追加</button>
        </div>
      {/* --- ↓ ここから下がTODOリストの表示エリア ↓ --- */}
      {todos.length === 0 ? (
        // TODOが0件（配列が空っぽ）の時の表示
        <p className="empty-message">TODOがありません</p>
      ) : (
        // TODOが1件以上ある時の表示
        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <div className="todo-content">
                {/* ↓ pタグをLinkタグに変更し、移動先のURL（/todo/そのTODOのID）を指定します */}
                <Link to={`/todo/${todo.id}`} className="todo-title">
                  {todo.title}
                </Link>
                <p className="todo-date">{todo.date}</p>
              </div>
              <button className="delete-button" onClick={() => onClickDelete(todo.id)}>削除</button>
            </div>
          ))}
        </div>
      )}
     </div>
  )
}
export default TodoList