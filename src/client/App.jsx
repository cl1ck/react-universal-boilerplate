import React from 'react'
import {Switch, Route, Redirect} from 'react-router'
import NotFound from 'client/components/NotFound'
import Test from 'client/components/Test'
import DevTools from 'client/components/DevTools'

const App = () => {
  const redirect = () => <Redirect to='/test' />
  const routes = (
    <Switch>
      <Route path='/' exact render={redirect} />
      <Route path='/test' component={Test} />
      <Route component={NotFound} />
    </Switch>
  )

  if (
    __BROWSER__ &&
    __DEV__ &&
    typeof window['devToolsExtension'] === 'undefined'
  ) {
    return (
      <span>
        <DevTools />
        {routes}
      </span>
    )
  }

  return routes
}

export default App
