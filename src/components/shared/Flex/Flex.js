import React from 'react'
import c from './Flex.module.css'
import { justifyHelper, alignHelper } from './utils'
export const Flex = ({ children, justify, className, align, wrap }) => {
  const styles = [c.flex, className]
  justifyHelper(styles, justify, c)
  alignHelper(styles, align, c)
  switch (wrap) {
    case 'nowrap':
      styles.push(c.noWrap)
      break
    case 'wrap':
      styles.push(c.wrap)
      break
    default:
      break
  }
  return <div className={styles.join(' ')}>{children}</div>
}
