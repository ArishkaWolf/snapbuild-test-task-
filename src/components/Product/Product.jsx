import { imagePaths } from '../../config/imagePaths';
import './Product.css';

const cards = [
  ['Дизайн-система — ядро платформы', 'Ваши компоненты, цвета и шрифты — единственный источник стиля', imagePaths.productDesignSystem],
  ['Гибкая конфигурация', 'Правила бренда задаются один раз — работают в каждой генерации', imagePaths.productConfiguration],
  ['Соответствие по умолчанию', 'AI не может нарушить бренд: сайты, изображения, видео, баннеры и презентации — строго по вашим правилам', imagePaths.productCompliance],
];

export function Product() {
  const mobileBrandSources = [
    imagePaths.brandLogos[4],
    imagePaths.brandLogos[0],
    imagePaths.brandLogos[1],
    imagePaths.brandLogos[2],
  ];
  const logos = mobileBrandSources.map((src, index) => <img src={src} alt="" key={src} className={`brand-logo brand-logo--${index + 1}`} />);
  return <><section className="brands" aria-label="Клиенты Снэпбилд"><div className="brands__viewport"><div className="brands__logos">
    {logos}
    <span className="brands__loop-copy" aria-hidden="true">{mobileBrandSources.map((src, index) => <img src={src} alt="" key={`loop-${src}`} className={`brand-logo brand-logo--${index + 1}`} />)}</span>
  </div></div><p>С платформой работают команды, для которых бренд — закон</p></section>
  <section className="product" id="product"><h2>Одна платформа — весь маркетинг</h2><p className="product__intro">Сайты, изображения, видео, баннеры и презентации — из одной идеи, в вашем стиле</p>
    <div className="product__grid">{cards.map(([title, text, src]) => <article className="product-card" key={title}><div className="product-card__image"><img src={src} alt="" /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
  </section></>;
}
