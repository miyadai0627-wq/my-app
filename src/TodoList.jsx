import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { TodoContext } from './TodoContext'
import './App.css'

function TodoList() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [reminder, setReminder] = useState('none');
  const [titleError, setTitleError] = useState(false);
  const [dateError, setDateError] = useState(false);
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
        description: '',
        reminder: reminder,
      };
      // 注文を送るだけでOK！
      dispatch({ type: 'ADD_TODO', payload: newTodo }); 

      // ② 入力欄を空っぽにリセットする
      setTitle('');
      setDate('');
      setReminder('none');
    }
  }
    // 削除ボタンが押された時の処理（どのTODOを消すか判断するために id を受け取る）
  const onClickDelete = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }
  return (
    <div className="todo-app">
      <div className="tab-nav">
        <span className="tab active">TODO一覧</span>
        <Link to="/calendar" className="tab">カレンダー</Link>
      </div>
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
        <div className="input-group">
          <select
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            className="reminder-select"
          >
            <option value="none">リマインダーなし</option>
            <option value="0">当日</option>
            <option value="1">1日前</option>
            <option value="3">3日前</option>
            <option value="7">1週間前</option>
          </select>
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