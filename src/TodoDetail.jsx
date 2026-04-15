import { Link } from 'react-router-dom';

export default function TodoDetail() {
  return (
    <div>
      <h1>ここは詳細画面です</h1>
      <Link to="/">← 一覧に戻る</Link>
    </div>
  );
}
