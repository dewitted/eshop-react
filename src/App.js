import React, { useState } from 'react'
import Nav from './components/Nav'
import './App.css'
import { Container } from './components/shared/Container/Container'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { routes } from './routes'

function App() {
  const [cart, setCart] = useState([])

  // 1. Cia reikia pushinti produktus kurie yra carte
  // 2. Produktai cart'e turi buti sumuojami (quantity/suma)
  // 3. Carte negali buti daugiau produktu nei produkto quantity
  // 4. Naunaudoti localStorage
  // 5. Atvaizduoti produktus cart'e
  // 6. Virs "CART" turi buti burbuliukas indikuojantis produktu skaiciu

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
      </Container>
    </BrowserRouter>
  )
}

export default App
