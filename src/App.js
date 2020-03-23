import React, { useState, useEffect } from 'react'
import './App.css'
import Nav from './components/Nav'
import { Container } from './components/shared/Container/Container'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { routes } from './routes'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:4000/products')
      const products = await response.json()
      dispatch({ type: 'UPLOAD_PRODUCTS', products })
    }
    fetchProducts()
  }, [])
  return (
    <BrowserRouter>
      <Container>
        <Nav />
        <main>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                component={() => <route.component />}
                exact={route.isExact}
              />
            ))}
            <Redirect from='*' to='/404' />
          </Switch>
        </main>
        <footer>Cia yra footeri</footer>
      </Container>
    </BrowserRouter>
  )
}

export default App
