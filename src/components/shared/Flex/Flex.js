import React from 'react'
import c from './Flex.module.css'
import { justifyHelper, alignHelper } from './utils'

export const Flex = ({ children, justify, className, align }) => {
  const styles = [c.flex, className]
  justifyHelper(styles, justify, c)
  alignHelper(styles, align, c)
  return <div className={styles.join(' ')}>{children}</div>
}
