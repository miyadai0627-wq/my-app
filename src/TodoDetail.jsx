import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TodoContext } from './TodoContext';

export default function TodoDetail() {
  // 1. URLの末尾にある「:id」の部分を取り出す魔法のフック
  const { id } = useParams();

  // 2. 共通の金庫から、すべてのTODOデータを引き出す
  const { todos } = useContext(TodoContext);

  // 3. 引き出したTODOリストの中から、URLのIDと一致する「1つ」を特定する
  // ※ useParamsで取れる値は「文字列」なので、Number() で数字に変換して比較します
  const todo = todos.find((t) => t.id === Number(id));

  // もしTODOが見つからなかった時のための安全策
  if (!todo) {
    return (
      <div>
        <p>TODOが見つかりませんでした。</p>
        <Link to="/">一覧に戻る</Link>
      </div>
    );
  }

  return (
    <div className="todo-app">
      <Link to="/" className="back-link">← 一覧に戻る</Link>
      
      <h1>詳細画面</h1>
      <p>ID: {id} の内容を表示しています</p>
      
      {/* 次のチケットでここに入力欄を作ります */}
      <h2>タイトル: {todo.title}</h2>
      <p>期限: {todo.date}</p>
    </div>
  );
}
