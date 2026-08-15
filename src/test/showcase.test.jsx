import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Showcase } from '../components/Showcase/Showcase';

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('витрина', () => {
  it('переключает вкладки и шаги', () => {
    render(<Showcase />);
    fireEvent.click(screen.getByRole('tab', { name: 'Изображения' }));
    expect(screen.getByRole('button', { name: /В стиле и цвете бренда/ })).toHaveClass('is-open');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'showcase-tab-1');
    const steps = document.querySelectorAll('.showcase__steps button');
    fireEvent.click(steps[1]);
    expect(steps[1]).toHaveClass('is-open');
  });

  it('продвигает шаг после завершения анимации', () => {
    vi.spyOn(performance, 'now').mockReturnValue(0);
    let frame = 0;
    vi.stubGlobal('requestAnimationFrame', callback => {
      frame += 1;
      if (frame === 1) callback(10001);
      return frame;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    act(() => render(<Showcase />));
    expect(document.querySelectorAll('.showcase__steps button')[1]).toHaveClass('is-open');
  });
});
