import { useRef } from 'react';
import './Roadmap.css';
import './Roadmap.overrides.css';
import './Roadmap.layout.css';

const releases = [
  ['Сайты за 5 минут', 'Генерация корпоративных сайтов по вашей дизайн-системе — 100% консистентность, без разработчиков', 'Декабрь, 2025'],
  ['Консистентные AI-иллюстрации', 'Настраиваете фирменный стиль один раз — графика для каждой секции сайта в едином виде через стилевые пресеты', 'Январь, 2026'],
  ['Дизайн-система из вашего сайта', 'Сканируем существующие страницы и собираем из них готовую дизайн-систему; AI сам выстраивает структуру', 'Февраль, 2026'],
  ['Режим изображений', 'Брендовая графика в один клик: управление стилями и темами, десятки параметров редактирования', 'Март, 2026'],
  ['Генерация видео', 'Видео из ваших изображений с ключевыми кадрами; AI точнее на 78%, панель рассуждений и управление правами', 'Апрель, 2026'],
  ['Ресайзы изображений', 'Одна фокус-точка → все форматы (16:9, 9:16, 1:1 и другие) с автоматическим бюджетом веса на экспорт', 'Май, 2026'],
  ['Расширенный редактор, как в Figma', 'Слои, изменение размеров любого контейнера, превью структуры в чате, версии промптов и ветвление диалогов', 'Июнь, 2026'],
  ['Канвас, баннеры и презентации', 'Канвас во всех режимах; новые режимы — генерация рекламных баннеров и корпоративных презентаций', 'Июль, 2026'],
  ['ИИ-маркетолог', 'Следит за данными, сам обновляет ваши материалы и собирает кампанию целиком — от изображений до сайта', 'Август, 2026'],
  ['Компонентный подход', 'AI сам компонует секции сайтов из элементов вашей дизайн-библиотеки', 'Сентябрь, 2026'],
  ['Предиктивные рекомендации', 'Платформа сама предлагает, что обновить в кампаниях — от секций сайта до баннеров', 'Октябрь, 2026'],
  ['Инфраструктура', 'Развертывание в вашей сети и контуре', 'Ноябрь, 2026'],
];

export function Roadmap() {
  const scroller = useRef(null); const drag = useRef(null);
  const pointerDown = (event) => {
    if (event.pointerType === 'touch' || event.pointerType === 'pen') return;
    const el = scroller.current;
    drag.current = { startX: event.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture?.(event.pointerId);
    el.classList.add('is-dragging');
  };
  const pointerMove = (event) => {
    if (!drag.current) return;
    scroller.current.scrollLeft = drag.current.startLeft - (event.clientX - drag.current.startX);
  };
  const pointerEnd = (event) => {
    const el = scroller.current;
    drag.current = null;
    el?.classList.remove('is-dragging');
    if (el?.hasPointerCapture?.(event.pointerId)) el.releasePointerCapture(event.pointerId);
  };
  const keyDown = event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    scroller.current?.scrollBy({ left: event.key === 'ArrowRight' ? 320 : -320, behavior: 'smooth' });
  };
  return <section className="roadmap" id="roadmap"><header><h2>Каждый день — новый релиз</h2><p>Приоритизируем бэклог для ваших целей</p></header>
    <div className="roadmap__hint">Удерживайте и тяните <span>↔</span></div>
    <div className="roadmap__scroller" ref={scroller} tabIndex={0} aria-label="Дорожная карта: используйте горизонтальный скролл или клавиши со стрелками" onKeyDown={keyDown} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd}>
      <div className="roadmap__canvas"><div className="roadmap__track"><div className="roadmap__track-fill" /></div>
      <div className="roadmap__items">{releases.map(([title, description, date], index) => <article className={index <= 8 ? 'is-passed' : ''} key={date}><span className="roadmap__dot"/><h3>{title}</h3><p>{description}</p><time>{date}</time></article>)}</div></div>
    </div>
  </section>;
}
