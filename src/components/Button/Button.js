import React from 'react'
import c from './Button.module.css'

export const Button = ({ onClick, children, type }) => {
  const styles = [c.buttonWrapper]
  switch (type) {
    case 'primary':
      styles.push(c.green)
      break
    case 'secondary':
      styles.push(c.blue)
      break
    default:
      styles.push(c.green)
      break
  }
  return (
    <div className={c.buttonWrapper}>
      <button onClick={onClick} className={styles.join(' ')}>
        {children}
      </button>
    </div>
  )
}

Button.defaultProps = {
  type: 'primary'
}
