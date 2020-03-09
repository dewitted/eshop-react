import React from 'react'
import c from './Container.module.css'

export const Container = ({ children }) => {
  return <div className={c.container}>{children}</div>
}
