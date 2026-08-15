import { Button } from '../Button/Button';
import { imagePaths } from '../../config/imagePaths';
import './Hero.css';
import './Hero.overrides.css';
import './Hero.layout.css';

export function Hero() {
  return <section className="hero" id="top">
    <div className="hero__inner">
      <div className="hero__copy">
        <h1>Платформа, где все<br/>создается в рамках вашего<br/>бренда и дизайн - системы</h1>
        <p>Подключите дизайн-систему к Снэпбилду, чтобы каждый участник команды мог создавать профессиональные материалы в фирменном стиле за минуты, а не дни.</p>
        <Button className="button--hero" href="https://builder.snapbuild.ru/auth?redirect=%2F">Начать сейчас</Button>
      </div>
      <div className="hero__preview"><img src={imagePaths.heroPreview} alt="Интерфейс Снэпбилд" /></div>
    </div>
  </section>;
}
