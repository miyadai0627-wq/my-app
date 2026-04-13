import { useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [titleError, setTitleError] = useState(false) // タイトルが未入力かどうかの記憶（最初はfalse=エラーなし）
  const [dateError, setDateError] = useState(false)   // 期限が未入力かどうかの記憶（最初はfalse=エラーなし）
  const [todos, setTodos] = useState([]); // TODOリスト本体を保存する配列

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
        id: Date.now(), // 削除する時などに必要になる「絶対にかぶらないID」（現在時刻の数字を利用）
        title: title,
        date: date
      };

      // ② 古いTODOリストの最後に、新しいTODOを合体させて保存し直す
      setTodos([...todos, newTodo]);

      // ③ 入力欄を空っぽにリセットする
      setTitle('');
      setDate('');
    }
  }
    // 削除ボタンが押された時の処理（どのTODOを消すか判断するために id を受け取る）
  const onClickDelete = (id) => {
    // filterを使って、「クリックされたidと【違う】idを持っているTODO」だけを残す
  const newTodos = todos.filter((todo) => todo.id !== id);
    
    // その残ったTODOたちを、新しいリストとして保存し直す
    setTodos(newTodos);
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
                <p className="todo-title">{todo.title}</p>
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
export default App