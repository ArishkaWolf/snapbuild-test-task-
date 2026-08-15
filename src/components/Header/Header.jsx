import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import './Header.css';
import './Header.overrides.css';

const navItems = [['Возможности', '#showcase'], ['Сценарии', '#cases'], ['Тарифы', '#pricing'], ['FAQ', '#faq']];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = event => { if (event.key === 'Escape') setMenuOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);
  return <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
    <div className="site-header__panel">
      <Logo />
      <nav id="primary-navigation" aria-label="Основная навигация" className={menuOpen ? 'site-nav site-nav--open' : 'site-nav'}>
        <Logo />
        {navItems.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <Button className="nav__cta button--dark" href="https://builder.snapbuild.ru/auth?redirect=%2F" onClick={() => setMenuOpen(false)}>Начать сейчас</Button>
      </nav>
      <Button className="button--dark" href="https://builder.snapbuild.ru/auth?redirect=%2F">Начать сейчас</Button>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(current => !current)}><span /><span /><span /></button>
    </div>
  </header>;
}
