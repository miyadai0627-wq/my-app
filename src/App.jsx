import './App.css'

function App() {
  return (
    <div className="todo-app">
      <h1>TODO一覧</h1>
      <div className="input-area">
        <input type="text" placeholder="タイトル" />
        <input type="date" placeholder="yyyy/mm/dd" />
        <button>追加</button>
      </div>
    </div>
  )
}

export default App