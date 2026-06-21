import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TodoContext } from './TodoContext';

const MONTH_NAMES = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
const DAY_NAMES = ['日','月','火','水','木','金','土'];

function Calendar() {
  const { todos } = useContext(TodoContext);
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const todosByDate = {};
  todos.forEach(todo => {
    if (todo.date) {
      todosByDate[todo.date] = todosByDate[todo.date] || [];
      todosByDate[todo.date].push(todo);
    }
  });

  const fmt = (d) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  return (
    <div className="todo-app">
      <Link to="/" className="back-link">← TODO一覧</Link>
      <div className="calendar-header">
        <button className="cal-nav-btn" onClick={prevMonth}>＜</button>
        <h2 className="calendar-title">{year}年 {MONTH_NAMES[month]}</h2>
        <button className="cal-nav-btn" onClick={nextMonth}>＞</button>
      </div>

      <div className="calendar-grid">
        {DAY_NAMES.map((d, i) => (
          <div key={d} className={`calendar-day-name ${i === 0 ? 'sun' : i === 6 ? 'sat' : ''}`}>{d}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} className="calendar-cell empty" />;
          const dateStr = fmt(day);
          const dayTodos = todosByDate[dateStr] || [];
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;
          const dow = (firstDayOfWeek + day - 1) % 7;
          return (
            <div key={dateStr} className={`calendar-cell${isToday ? ' today' : ''}${dow === 0 ? ' sun' : dow === 6 ? ' sat' : ''}`}>
              <span className="calendar-day-num">{day}</span>
              <div className="calendar-todos">
                {dayTodos.map(todo => (
                  <Link key={todo.id} to={`/todo/${todo.id}`} className="calendar-todo-badge">
                    {todo.title}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
