import { imagePaths } from '../../config/imagePaths';
import './Logo.css';

export function Logo() {
  return <a className="logo" href="/" aria-label="Снэпбилд — на главную"><img className="logo__image" src={imagePaths.logo} alt="Снэпбилд" /></a>;
}
