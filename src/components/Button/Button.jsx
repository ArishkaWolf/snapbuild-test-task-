export function Button({ children = 'Начать сейчас', className = '', href = '#', ...props }) {
  return <a className={`button ${className}`.trim()} href={href} {...props}><span className="button__label" data-label={typeof children === 'string' ? children : ''}>{children}</span></a>;
}
