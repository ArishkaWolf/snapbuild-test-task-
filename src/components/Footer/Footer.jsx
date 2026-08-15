import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import './Footer.css';
import './Footer.overrides.css';
import './Footer.wide.css';

export function Footer() {
  return (
    <footer className="footer">
      <section className="footer__cta" id="cta">
        <h2>Профессиональные материалы в фирменном стиле<br />за минуты, а не дни</h2>
        <Button className="button--footer" href="https://builder.snapbuild.ru/auth?redirect=%2F">Начать сейчас</Button>
      </section>
      <div className="footer__content">
        <div className="footer__about">
          <Logo />
          <p>Платформа, где все создается в рамках вашего бренда и дизайн-системы</p>
        </div>
        <div className="footer__links">
          <div>
            <h3>Навигация</h3>
            <a href="#product">Продукт</a>
            <a href="#showcase">Возможности</a>
            <a href="#cases">Сценарии</a>
            <a href="#pricing">Тарифы</a>
            <a href="#features">Преимущества</a>
            <a href="#security">Безопасность</a>
            <a href="#roadmap">Роадмап</a>
            <a href="#faq">Частые вопросы</a>
          </div>
          <div>
            <h3>Документация</h3>
            <a href="https://snapbuild.ru/privacy">Политика конфиденциальности</a>
            <a href="#faq">FAQ</a>
          </div>
          <div>
            <h3>Контакты</h3>
            <a href="https://t.me/ochen_darya">Запросить демо</a>
            <a href="https://t.me/snapbuild">Telegram</a>
            <a className="footer__mobile-email" href="mailto:hey@snapbuild.ru">hey@snapbuild.ru</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© Сгенерировано в Снэпбилде. Все права защищены.</span>
          <a href="mailto:hey@snapbuild.ru">hey@snapbuild.ru</a>
        </div>
      </div>
    </footer>
  );
}
