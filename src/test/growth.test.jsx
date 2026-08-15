import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Contact, Impact, Pricing, Stories, UseCases } from '../components/Growth/Growth';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe('динамические секции', () => {
  it('переключает сценарии кликом и по таймеру', () => {
    vi.useFakeTimers();
    render(<UseCases />);
    fireEvent.click(screen.getByRole('tab', { name: /Дизайн/ }));
    expect(screen.getByText(/Масштабируйте систему/)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(10000));
    expect(screen.getByText(/Персонализируйте каждое предложение/)).toBeInTheDocument();
  });

  it('переключает отзывы в обе стороны', async () => {
    const user = userEvent.setup();
    render(<Stories />);
    await user.click(screen.getByRole('button', { name: 'Следующий отзыв' }));
    expect(screen.getByText('Алексей Серов')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Предыдущий отзыв' }));
    expect(screen.getByText('Мария Волкова')).toBeInTheDocument();
  });

  it('пересчитывает тариф и рендерит показатели', async () => {
    const user = userEvent.setup();
    render(<><Pricing /><Impact /></>);
    expect(screen.getByText('39 000')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Месяц' }));
    expect(screen.getByText('49 000')).toBeInTheDocument();
    expect(screen.getByText('10×')).toBeInTheDocument();
  });

  it('показывает подсказки и фокусирует первое ошибочное поле', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.click(screen.getByRole('button', { name: /Запросить демо/ }));
    expect(screen.getAllByText(/минимум 2 символа/)).toHaveLength(2);
    expect(screen.getByLabelText(/Имя/)).toHaveFocus();
    await user.type(screen.getByLabelText(/Рабочая почта/), 'bad-email');
    await user.click(screen.getByRole('button', { name: /Запросить демо/ }));
    expect(screen.getByText(/name@company.ru/)).toBeInTheDocument();
  });

  it('объясняет отсутствие endpoint вместо ложного успеха', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.type(screen.getByLabelText(/Имя/), 'Анна');
    await user.type(screen.getByLabelText(/Рабочая почта/), 'anna@company.ru');
    await user.type(screen.getByLabelText(/Компания/), 'Компания');
    await user.click(screen.getByRole('button', { name: /Запросить демо/ }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Отправка пока не настроена');
  });

  it('обрабатывает успешную отправку и позволяет открыть новую форму', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://example.test/contact');
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    render(<Contact />);
    await user.type(screen.getByLabelText(/Имя/), 'Анна');
    await user.type(screen.getByLabelText(/Рабочая почта/), 'anna@company.ru');
    await user.type(screen.getByLabelText(/Компания/), 'Компания');
    await user.type(screen.getByLabelText(/Что хотите ускорить/), 'Запуск кампаний');
    await user.click(screen.getByRole('button', { name: /Запросить демо/ }));
    expect(await screen.findByRole('status')).toHaveTextContent('Заявка уже у нас');
    expect(fetchMock).toHaveBeenCalledWith('https://example.test/contact', expect.objectContaining({ method: 'POST' }));
    await user.click(screen.getByRole('button', { name: 'Отправить ещё одну' }));
    expect(screen.getByLabelText(/Имя/)).toHaveValue('');
  });

  it('показывает ошибку при неуспешном ответе', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://example.test/contact');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/Имя/), { target: { value: 'Анна' } });
    fireEvent.change(screen.getByLabelText(/Рабочая почта/), { target: { value: 'anna@company.ru' } });
    fireEvent.change(screen.getByLabelText(/Компания/), { target: { value: 'Компания' } });
    fireEvent.submit(screen.getByRole('button', { name: /Запросить демо/ }).closest('form'));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Не удалось отправить'));
  });
});
