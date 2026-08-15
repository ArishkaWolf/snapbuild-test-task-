import { Component, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Product } from './components/Product/Product';
import { Showcase } from './components/Showcase/Showcase';
import { Faq } from './components/Faq/Faq';
import { Comparison } from './components/Comparison/Comparison';
import { Security } from './components/Security/Security';
import { Roadmap } from './components/Roadmap/Roadmap';
import { Footer } from './components/Footer/Footer';
import { UseCases, Impact, Stories, Pricing, Contact } from './components/Growth/Growth';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import './styles.css';
import './font.css';
import './layout.css';
import './interaction.css';
import './button-animation.css';
import './button-animation-once.css';
import './mobile.css';

class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error, info) { console.error('Application error', error, info); }
  render() {
    if (this.state.failed) return <ErrorPage code="500" title="Что-то пошло не так" description="Не удалось загрузить страницу. Обновите её или вернитесь на главную." onRetry={() => this.setState({ failed: false })} />;
    return this.props.children;
  }
}

function HomePage() {
  useEffect(() => {
    const elements = [...document.querySelectorAll('main > section, footer')];
    elements.forEach(element => element.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const updateCompactMode = () => {
      const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
      const renderedWidth = viewportWidth * window.devicePixelRatio;
      const windowWidth = window.outerWidth || renderedWidth;
      const isCompact = window.innerWidth <= 850
        || Math.min(renderedWidth, windowWidth) <= 1050
        || window.devicePixelRatio < 0.9;
      document.documentElement.classList.toggle('compact-view', isCompact);
    };
    updateCompactMode();
    window.addEventListener('resize', updateCompactMode);
    window.visualViewport?.addEventListener('resize', updateCompactMode);
    return () => {
      window.removeEventListener('resize', updateCompactMode);
      window.visualViewport?.removeEventListener('resize', updateCompactMode);
    };
  }, []);
  return <>
    <Header />
    <main>
      <Hero />
      <Product />
      <Showcase />
      <UseCases />
      <Impact />
      <Comparison />
      <Stories />
      <Security />
      <Pricing />
      <Roadmap />
      <Contact />
      <Faq />
    </main>
    <Footer />
  </>;
}

function App() {
  const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html';
  return isHome ? <HomePage /> : <ErrorPage code="404" title="Страница не найдена" description="Возможно, адрес изменился или в нём есть опечатка." />;
}

createRoot(document.getElementById('root')).render(<ErrorBoundary><App /></ErrorBoundary>);
