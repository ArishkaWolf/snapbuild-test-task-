import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../components/Button/Button';
import { Logo } from '../components/Logo/Logo';
import { Hero } from '../components/Hero/Hero';
import { Product } from '../components/Product/Product';
import { Security } from '../components/Security/Security';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { Faq } from '../components/Faq/Faq';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';
import { Comparison } from '../components/Comparison/Comparison';
import { Roadmap } from '../components/Roadmap/Roadmap';

describe('основные компоненты', () => {
  it('рендерит кнопку с настройками и значениями по умолчанию', () => {
    const { rerender } = render(<Button />);
    expect(screen.getByRole('link', { name: 'Начать сейчас' })).toHaveAttribute('href', '#');
    rerender(<Button href="/demo" className="extra">Демо</Button>);
    expect(screen.getByRole('link', { name: 'Демо' })).toHaveClass('extra');
  });

  it('рендерит статические секции и ссылки', () => {
    render(<><Logo /><Hero /><Product /><Security /><Footer /></>);
    expect(screen.getAllByRole('link', { name: /Снэпбилд|Начать сейчас/ }).length).toBeGreaterThan(1);
    expect(screen.getByText('Одна платформа — весь маркетинг')).toBeInTheDocument();
    expect(screen.getByText('Безопасность без компромиссов')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'hey@snapbuild.ru' })[0]).toHaveAttribute('href', 'mailto:hey@snapbuild.ru');
  });

  it('открывает мобильное меню и реагирует на прокрутку', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggle = screen.getByRole('button', { name: 'Открыть меню' });
    await user.click(toggle);
    expect(screen.getByRole('button', { name: 'Закрыть меню' })).toHaveAttribute('aria-expanded', 'true');
    await user.click(screen.getByRole('link', { name: 'FAQ' }));
    expect(screen.getByRole('button', { name: 'Открыть меню' })).toBeInTheDocument();
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 30 });
    fireEvent.scroll(window);
    expect(document.querySelector('.site-header')).toHaveClass('site-header--scrolled');
  });

  it('закрывает мобильное меню клавишей Escape', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole('button', { name: 'Открыть меню' }));
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Открыть меню' })).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
  });

  it('раскрывает и закрывает FAQ', async () => {
    const user = userEvent.setup();
    render(<Faq />);
    const question = screen.getByRole('button', { name: /Что можно создавать/ });
    await user.click(question);
    expect(question).toHaveAttribute('aria-expanded', 'true');
    await user.click(question);
    expect(question).toHaveAttribute('aria-expanded', 'false');
  });

  it('показывает страницу ошибки и вызывает повтор', async () => {
    const retry = vi.fn();
    const user = userEvent.setup();
    render(<ErrorPage code="500" title="Ошибка" description="Повторите позже" onRetry={retry} />);
    await user.click(screen.getByRole('button', { name: 'Попробовать снова' }));
    expect(retry).toHaveBeenCalledOnce();
    expect(screen.getByRole('link', { name: 'На главную' })).toHaveAttribute('href', '/');
  });

  it('поддерживает перетаскивание сравнения и дорожной карты', () => {
    const { unmount } = render(<Comparison />);
    const comparison = screen.getByLabelText(/Сравнение решений/);
    comparison.scrollLeft = 20;
    fireEvent.pointerDown(comparison, { clientX: 100, pointerId: 1 });
    fireEvent.pointerMove(comparison, { clientX: 50, pointerId: 1 });
    fireEvent.pointerUp(comparison, { pointerId: 1 });
    expect(comparison.scrollLeft).toBe(70);
    fireEvent.keyDown(comparison, { key: 'ArrowRight' });
    expect(comparison.scrollBy).toHaveBeenCalled();
    unmount();
    render(<Roadmap />);
    const roadmap = document.querySelector('.roadmap__scroller');
    roadmap.scrollLeft = 10;
    fireEvent.pointerDown(roadmap, { clientX: 100, pointerId: 1 });
    fireEvent.pointerMove(roadmap, { clientX: 80, pointerId: 1 });
    fireEvent.pointerCancel(roadmap, { pointerId: 1 });
    expect(roadmap.scrollLeft).toBe(30);
    const touchPointer = new MouseEvent('pointerdown', { bubbles: true, clientX: 100 });
    Object.defineProperty(touchPointer, 'pointerType', { value: 'touch' });
    fireEvent(roadmap, touchPointer);
    fireEvent.pointerMove(roadmap, { clientX: 20, pointerId: 2, pointerType: 'touch' });
    expect(roadmap.scrollLeft).toBe(30);
    fireEvent.keyDown(roadmap, { key: 'ArrowLeft' });
    expect(roadmap.scrollBy).toHaveBeenCalled();
  });
});
