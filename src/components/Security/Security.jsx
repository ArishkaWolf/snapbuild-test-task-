import { imagePaths } from '../../config/imagePaths';
import './Security.css';

const cards = [
  ['Только одобренные модели', 'Работаем только с российскими и локализованными моделями, без экспортных ограничений', imagePaths.securityModels],
  ['Ваш контур, ваша юрисдикция', 'Развертывание в частном облаке с полным соответствием 152-ФЗ и внутренними ИБ-требованиями', imagePaths.securityCloud],
  ['Собственный AI-стек', 'Вы сами определяете модели, хранилища, доступы и цепочки валидации', imagePaths.securityStack],
];

export function Security() { return <section className="security" id="security"><h2>Безопасность без компромиссов</h2><div className="security__grid">{cards.map(([title, description, src]) => <article key={title}><div className="security__image"><img src={src} alt="" /></div><h3>{title}</h3><p>{description}</p></article>)}</div></section>; }
