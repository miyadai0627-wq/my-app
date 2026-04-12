import { useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [titleError, setTitleError] = useState(false) // タイトルが未入力かどうかの記憶（最初はfalse=エラーなし）
  const [dateError, setDateError] = useState(false)   // 期限が未入力かどうかの記憶（最初はfalse=エラーなし）
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

    // もし両方とも入力されていたら、とりあえず入力欄を空っぽにリセットする
    if (title !== '' && date !== '') {
      setTitle('')
      setDate('')
    }
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
    </div>
  )
}

export default App