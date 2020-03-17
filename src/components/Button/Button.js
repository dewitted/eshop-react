import React from 'react'
import c from './Button.module.css'

export const Button = ({ onClick, children, type, disabled }) => {
  const styles = [c.buttonWrapper]
  switch (type) {
    case 'primary':
      styles.push(c.green)
      break
    case 'secondary':
      styles.push(c.blue)
      break
    case 'danger':
      styles.push(c.red)
      break
    default:
      styles.push(c.green)
      break
  }
  if (disabled) styles.push(c.disabled)
  return (
    <div className={c.buttonWrapper}>
      <button
        onClick={onClick}
        className={styles.join(' ')}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  )
}

Button.defaultProps = {
  type: 'primary'
}
