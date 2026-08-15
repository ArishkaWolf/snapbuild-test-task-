import { useEffect, useState } from 'react';
import './Growth.css';

const roles = [
  { name: 'Маркетинг', number: '01', title: 'Запускайте кампании, пока идея актуальна', text: 'Из одного брифа соберите лендинг, баннеры, посты и презентацию. Все форматы связаны одной идеей и не выходят за рамки бренда.', tags: ['Лендинги', 'Креативы', 'Ресайзы'] },
  { name: 'Дизайн', number: '02', title: 'Масштабируйте систему, а не рутину', text: 'Передайте командам готовые правила и компоненты. Снэпбилд возьмёт на себя повторяющиеся макеты, а дизайнеры — новые решения.', tags: ['Компоненты', 'Гайдлайны', 'Контроль'] },
  { name: 'Продажи', number: '03', title: 'Персонализируйте каждое предложение', text: 'Адаптируйте презентации и страницы под отрасль, клиента и этап сделки без очереди к дизайнерам.', tags: ['Питч-деки', 'Демо', 'ABM'] },
  { name: 'Продукт', number: '04', title: 'Проверяйте гипотезы на живом интерфейсе', text: 'Собирайте страницы для новых сегментов и функций, показывайте их пользователям и улучшайте через чат.', tags: ['MVP', 'Эксперименты', 'Исследования'] },
];

export function UseCases() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setTimeout(() => setActive(current => (current + 1) % roles.length), 10000);
    return () => window.clearTimeout(timer);
  }, [active]);
  const item = roles[active];
  return <section className="growth cases" id="cases">
    <header className="growth__header"><h2>Один бренд — разные задачи</h2><p>Единая дизайн-система помогает каждой команде решать свои задачи быстрее и сохранять узнаваемость бренда в каждом материале.</p></header>
    <div className="cases__layout"><div className="cases__tabs" role="tablist">{roles.map((role, index) => <button type="button" role="tab" aria-selected={active === index} className={active === index ? 'is-active' : ''} onClick={() => setActive(index)} key={role.name}><span>{role.number}</span>{role.name}<i>↗</i></button>)}</div>
      <article className="cases__story"><span className="cases__eyebrow">Сценарий / {item.name}</span><h3>{item.title}</h3><p>{item.text}</p><div>{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>
    </div>
  </section>;
}

const stats = [
  ['10×', 'быстрее запуск материалов', 'От первого брифа до готовой кампании — за часы вместо недель.', '/images/speed-1.png'],
  ['100%', 'соответствие дизайн-системе', 'Цвета, шрифты, сетки и компоненты применяются автоматически.', '/images/speed-2.png'],
  ['−70%', 'рутинных дизайн-задач', 'Команда меньше пересобирает макеты и больше работает над новыми идеями.', '/images/speed-3.png'],
  ['1', 'источник правды для бренда', 'Все форматы используют единые правила и обновляются вместе с системой.', '/images/speed-4.png'],
];
export function Impact() {
  return <section className="growth impact" aria-label="Результаты внедрения"><div className="impact__intro"><h2>Скорость растёт — бренд остаётся</h2><p>Снэпбилд превращает дизайн-систему в рабочую среду для всей компании. Команды самостоятельно выпускают больше материалов, а бренд-команда сохраняет контроль без дополнительных согласований и ручных проверок.</p></div><div className="impact__grid">{stats.map(([value, label, description, image]) => <article key={label}><div className="impact__photo"><img src={image} alt="" /></div><strong>{value}</strong><h3>{label}</h3><p>{description}</p></article>)}</div></section>;
}

const quotes = [
  { quote: 'Раньше на адаптацию одной кампании под регионы уходило до двух недель: нужно было собрать вводные, поставить задачи дизайнерам и несколько раз проверить макеты. В Снэпбилде маркетологи сами создают нужные версии, а бренд-команда контролирует правила один раз — на уровне системы. Мы перестали выбирать между скоростью и качеством.', name: 'Мария Волкова', role: 'Директор по маркетингу', company: 'Retail Tech', result: '12 рынков', resultNote: 'запустили за 3 недели', initials: 'МВ' },
  { quote: 'Наша дизайн-система была подробной, но за пределами дизайн-команды ей почти никто не пользовался. Снэпбилд превратил её в понятный рабочий инструмент для всей компании. Коллеги получают готовый результат в правильных компонентах, а дизайнеры больше не тратят день на однотипные правки и ресайзы.', name: 'Алексей Серов', role: 'Head of Design', company: 'Fintech', result: '−68%', resultNote: 'ручных правок в макетах', initials: 'АС' },
  { quote: 'Для важных встреч мы всегда хотели делать персональные материалы, но процесс был слишком долгим. Теперь менеджер загружает контекст сделки и получает страницу и презентацию под конкретного клиента. Материалы появляются раньше, чем заканчивается подготовка к встрече, и помогают вести более предметный разговор.', name: 'Ирина Лебедева', role: 'Коммерческий директор', company: 'B2B Services', result: '+24%', resultNote: 'к конверсии в следующий этап', initials: 'ИЛ' },
];
export function Stories() {
  const [active, setActive] = useState(0);
  const item = quotes[active];
  return <section className="growth stories" id="stories">
    <header className="stories__header"><h2>Истории команд</h2><p>Как компании ускоряют производство контента и сохраняют единый бренд на каждом этапе.</p></header>
    <div className="stories__carousel">
      <button className="stories__arrow stories__arrow--prev" type="button" aria-label="Предыдущий отзыв" onClick={() => setActive(current => (current + quotes.length - 1) % quotes.length)}>←</button>
      <div className="stories__grid"><article className="is-accent" key={item.name}>
        <div className="stories__company"><span>{item.company}</span><i>0{active + 1} / 0{quotes.length}</i></div>
        <blockquote>«{item.quote}»</blockquote>
        <div className="stories__result"><strong>{item.result}</strong><span>{item.resultNote}</span></div>
        <footer><span className="stories__avatar">{item.initials}</span><div><strong>{item.name}</strong><span>{item.role}</span></div></footer>
      </article></div>
      <button className="stories__arrow stories__arrow--next" type="button" aria-label="Следующий отзыв" onClick={() => setActive(current => (current + 1) % quotes.length)}>→</button>
    </div>
    <div className="stories__dots" aria-hidden="true">{quotes.map((quote, index) => <i className={index === active ? 'is-active' : ''} key={quote.name} />)}</div>
  </section>;
}

const tiers = [
  { name: 'Команда', note: 'Для первых быстрых запусков', month: '49 000', year: '39 000', features: ['До 10 участников', 'Сайты, изображения и баннеры', '1 дизайн-система', 'Экспорт материалов'] },
  { name: 'Бизнес', note: 'Для нескольких команд и брендов', month: 'По запросу', year: 'По запросу', featured: true, features: ['Без ограничений по участникам', 'Все форматы контента', 'Несколько дизайн-систем', 'Роли, аналитика и приоритетная поддержка'] },
  { name: 'Контур', note: 'Для регулируемой инфраструктуры', month: 'Индивидуально', year: 'Индивидуально', features: ['Развёртывание в вашей сети', 'SSO и управление доступом', 'Собственные модели и хранилища', 'SLA и сопровождение внедрения'] },
];
export function Pricing() {
  const [annual, setAnnual] = useState(true);
  return <section className="growth pricing" id="pricing"><div className="pricing__head"><div><h2>Начните с команды — масштабируйте на компанию</h2><p className="pricing__subtitle">Варианты подключения для команды, нескольких брендов и закрытого корпоративного контура.</p></div><div className="pricing__toggle" aria-label="Период оплаты"><button className={!annual ? 'is-active' : ''} onClick={() => setAnnual(false)} type="button">Месяц</button><button className={annual ? 'is-active' : ''} onClick={() => setAnnual(true)} type="button">Год <i>−20%</i></button></div></div><div className="pricing__grid">{tiers.map(tier => <article className={tier.featured ? 'is-featured' : ''} key={tier.name}>{tier.featured && <span className="pricing__badge">Рекомендуем</span>}<h3>{tier.name}</h3><p className="pricing__note">{tier.note}</p><div className="pricing__price"><strong>{annual ? tier.year : tier.month}</strong>{tier.month.match(/\d/) && <span>₽ / месяц</span>}</div><ul>{tier.features.map(feature => <li key={feature}>✓ <span>{feature}</span></li>)}</ul><a href="#contact">Обсудить подключение <span>↗</span></a></article>)}</div></section>;
}

export function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', company: '', task: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const validate = values => {
    const next = {};
    const name = values.name.trim();
    const email = values.email.trim();
    const company = values.company.trim();
    if (name.length < 2) next.name = 'Введите имя — минимум 2 символа';
    else if (name.length > 80) next.name = 'Имя не должно быть длиннее 80 символов';
    if (!email) next.email = 'Укажите рабочую почту';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) next.email = 'Проверьте адрес, например name@company.ru';
    if (company.length < 2) next.company = 'Введите название компании — минимум 2 символа';
    else if (company.length > 120) next.company = 'Название не должно быть длиннее 120 символов';
    if (values.task.trim().length > 1000) next.task = 'Описание не должно быть длиннее 1000 символов';
    return next;
  };
  const submit = async event => {
    event.preventDefault();
    const next = validate(fields);
    setErrors(next);
    setSubmitError('');
    if (Object.keys(next).length) {
      event.currentTarget.querySelector(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
    if (!endpoint) {
      setSubmitError('Отправка пока не настроена. Напишите нам на hey@snapbuild.ru.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, value.trim()]))),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setSent(true);
      setFields({ name: '', email: '', company: '', task: '' });
    } catch {
      setSubmitError('Не удалось отправить заявку. Попробуйте ещё раз или напишите на hey@snapbuild.ru.');
    } finally {
      setSubmitting(false);
    }
  };
  const update = event => {
    const { name, value } = event.target;
    setFields(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: undefined }));
    setSubmitError('');
  };
  return <section className="growth contact" id="contact"><div className="contact__copy"><h2>Покажем, как ваш бренд работает в Снэпбилде</h2><p>Возьмём один из ваших материалов и соберём новую версию прямо на встрече. Без подготовки с вашей стороны.</p><div><span>01</span> Разберём задачу и дизайн-систему</div><div><span>02</span> Соберём материал за несколько минут</div><div><span>03</span> Подберём вариант внедрения</div></div>
    <div className="contact__form-wrap">{sent ? <div className="contact__success" role="status"><i>✓</i><h3>Заявка уже у нас</h3><p>Свяжемся с вами в течение рабочего дня и предложим время для демонстрации.</p><button type="button" onClick={() => setSent(false)}>Отправить ещё одну</button></div> : <form onSubmit={submit} noValidate><h3>Запросить демо</h3><label>Имя<input name="name" autoComplete="name" maxLength="81" value={fields.name} onChange={update} placeholder="Как к вам обращаться" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined}/>{errors.name && <small id="name-error">{errors.name}</small>}</label><div className="contact__row"><label>Рабочая почта<input name="email" type="email" autoComplete="email" maxLength="254" value={fields.email} onChange={update} placeholder="name@company.ru" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}/>{errors.email && <small id="email-error">{errors.email}</small>}</label><label>Компания<input name="company" autoComplete="organization" maxLength="121" value={fields.company} onChange={update} placeholder="Название" aria-invalid={!!errors.company} aria-describedby={errors.company ? 'company-error' : undefined}/>{errors.company && <small id="company-error">{errors.company}</small>}</label></div><label>Что хотите ускорить?<textarea name="task" maxLength="1001" value={fields.task} onChange={update} placeholder="Например, запуск рекламных кампаний" rows="3" aria-invalid={!!errors.task} aria-describedby={errors.task ? 'task-error' : undefined}/>{errors.task && <small id="task-error">{errors.task}</small>}</label>{submitError && <p className="contact__submit-error" role="alert">{submitError} <a href="mailto:hey@snapbuild.ru">Написать на почту</a></p>}<button type="submit" disabled={submitting}>{submitting ? 'Отправляем…' : 'Запросить демо'} <span>↗</span></button><p className="contact__legal">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p></form>}</div>
  </section>;
}
