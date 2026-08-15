import { useEffect, useState } from 'react';
import { imagePaths } from '../../config/imagePaths';
import './Showcase.css';
import './Showcase.overrides.css';

const slides = [
  { label: 'Сайты', items: [
    ['Результат за один запрос', 'Отправляйте документ или ссылку на описание продукта — платформа собирает структуру'],
    ['Страница за минуту', 'В вашей дизайн-системе, с вашими шрифтами, сеткой и компонентами'],
    ['AI или визуальный редактор', 'Меняйте контент через чат или редактируйте вручную'],
    ['Адаптация под ЦА за один клик', 'Версия сайта под новый сегмент без работы дизайнеров и копирайтеров'],
  ]},
  { label: 'Изображения', items: [
    ['В стиле и цвете бренда', 'Изображения по композиционным правилам вашей дизайн-системы'],
    ['Попадание с первой генерации', 'Без часов промптинга и поиска на стоках'],
    ['Редактирование объектов', 'Меняйте композицию и удаляйте элементы прямо на изображении'],
    ['Любой стиль и формат', 'Портреты, иллюстрации, обложки — в нужном соотношении, до 4K'],
  ]},
  { label: 'Видео', items: [
    ['Изображения как ключевые кадры', 'Используйте графику из модуля изображений напрямую'],
    ['Контроль качества и формата', 'Длительность, соотношение, качество — под площадку'],
    ['Сохранение стиля и композиции', 'AI удерживает визуальную целостность ролика'],
    ['Один сценарий — десятки адаптаций', 'Версии под популярные форматы соцсетей и рекламных площадок'],
  ]},
  { label: 'Баннеры', items: [
    ['Креативы из одной идеи', 'Готовые баннеры в фирменном стиле для любой кампании'],
    ['Все размеры автоматически', 'Выбирайте готовые размеры для популярных площадок или задавайте собственные — без ручной пересборки'],
    ['Текст и графика под контролем', 'Редактируйте оффер, композицию и визуальные акценты'],
    ['Экспорт под площадку', 'Форматы и вес файлов соответствуют требованиям размещения'],
  ]},
  { label: 'Презентации', items: [
    ['Презентация из запроса', 'Платформа собирает структуру и черновик слайдов'],
    ['В вашей дизайн-системе', 'Шрифты, сетки и компоненты применяются автоматически'],
    ['Редактирование через AI', 'Меняйте отдельный слайд или всю историю через чат'],
    ['Экспорт в нужном формате', 'Собирайте презентации для встречи, рассылки или публикации'],
  ]},
];

const imagePath = (tab, step) => imagePaths.showcase[tab][step];

export function Showcase() {
  const [tab, setTab] = useState(0); const [step, setStep] = useState(0); const [progress, setProgress] = useState(0);
  const activateTab = (index) => { setTab(index); setStep(0); setProgress(0); };
  const activateStep = (index) => { setStep(index); setProgress(0); };
  useEffect(() => {
    const duration = 10000; const started = performance.now(); let frame;
    const tick = (now) => { const value = Math.min((now - started) / duration, 1); setProgress(value); if (value < 1) frame = requestAnimationFrame(tick); else { setStep(current => { if (current < 3) return current + 1; setTab(currentTab => (currentTab + 1) % slides.length); return 0; }); setProgress(0); } };
    frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame);
  }, [tab, step]);
  const active = slides[tab];
  return <section className="showcase" id="showcase"><h2>Любой контент в фирменном стиле за считанные минуты</h2><div className="showcase__tabs" role="tablist">{slides.map((item, index) => <button className={index === tab ? 'is-active' : ''} type="button" onClick={() => activateTab(index)} key={item.label}>{item.label}</button>)}</div>
    <div className="showcase__body"><div className="showcase__steps">{active.items.map(([title, text], index) => <button className={index === step ? 'is-open' : ''} type="button" onClick={() => activateStep(index)} key={title}><span className="showcase__step-title">{title}</span>{index === step && <span className="showcase__step-description">{text}</span>}<span className="showcase__progress"><i style={{ transform: `scaleX(${index === step ? progress : 0})` }} /></span></button>)}</div>
      <div className="showcase__media"><img src={imagePath(tab, step)} alt={`${active.label}: ${active.items[step][0]}`} /></div>
    </div>
  </section>;
}
