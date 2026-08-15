import './ErrorPage.css';

export function ErrorPage({ code, title, description, onRetry }) {
  return <main className="error-page">
    <p className="error-page__code">{code}</p>
    <h1>{title}</h1>
    <p>{description}</p>
    <div className="error-page__actions">
      {onRetry && <button type="button" onClick={onRetry}>Попробовать снова</button>}
      <a href={import.meta.env.BASE_URL}>На главную</a>
    </div>
  </main>;
}
