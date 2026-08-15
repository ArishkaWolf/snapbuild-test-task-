import { useRef } from 'react';
import './Comparison.css';
import './Comparison.overrides.css';

const columns = ['снэпбилд', 'Claude + Figma MCP', 'No-code платформы', 'Cursor', 'Традиционный'];
const rows = [
  ['Time-to-market', '5 минут', '30–60 мин', '2–3 дня', '1–2 дня', '3–5 недель'],
  ['Дизайн-система', <>100%<br/>точность</>, 'Частично, из Figma', 'Шаблоны', 'Вручную в коде', 'Вручную, через ревью'],
  ['Визуальный редактор', <><b className="check">✓</b> + ИИ</>, '—', <b className="check">✓</b>, '—', '—'],
  ['Требуемые навыки', 'Нет', 'Промпты + код', 'Дизайн', 'Разработка', 'Полная команда'],
];

export function Comparison() {
  const frameRef = useRef(null);
  const dragRef = useRef(null);
  const startDrag = event => {
    const frame = frameRef.current;
    if (!frame) return;
    dragRef.current = { x: event.clientX, scrollLeft: frame.scrollLeft };
    frame.setPointerCapture?.(event.pointerId);
    frame.classList.add('is-dragging');
  };
  const drag = event => {
    const frame = frameRef.current;
    const state = dragRef.current;
    if (!frame || !state) return;
    frame.scrollLeft = state.scrollLeft - (event.clientX - state.x);
  };
  const endDrag = event => {
    const frame = frameRef.current;
    dragRef.current = null;
    frame?.classList.remove('is-dragging');
    if (frame?.hasPointerCapture?.(event.pointerId)) frame.releasePointerCapture(event.pointerId);
  };
  const scrollWithKeyboard = event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    frameRef.current?.scrollBy({ left: event.key === 'ArrowRight' ? 260 : -260, behavior: 'smooth' });
  };
  return <section className="comparison" id="features"><h2>Почему команды выбирают Снэпбилд</h2><p>Вы получаете не редактор, а результат: готовые маркетинговые материалы без проблем с настройками</p>
    <div className="comparison__frame" ref={frameRef} tabIndex={0} aria-label="Сравнение решений: используйте горизонтальный скролл или клавиши со стрелками" onKeyDown={scrollWithKeyboard} onPointerDown={startDrag} onPointerMove={drag} onPointerUp={endDrag} onPointerCancel={endDrag}><div className="comparison__brand-outline" />
      <div className="comparison__table" role="table"><div className="comparison__row comparison__row--header" role="row"><div>Особенности</div>{columns.map((item, index) => <div className={index === 0 ? 'comparison__brand' : ''} key={item}>{item}</div>)}</div>
      {rows.map(([label, ...values]) => <div className="comparison__row" role="row" key={label}><div className="comparison__label">{label}</div>{values.map((value, index) => <div className={index === 0 ? 'comparison__brand' : ''} key={index}>{value}</div>)}</div>)}</div>
    </div>
  </section>;
}
