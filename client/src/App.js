import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ErrorProvider from './contexts/ErrorContext'

import HomeScreen from './screens/HomeScreen'
import PageNotFound from './screens/PageNotFound'

function App() {
  return (
  	<ErrorProvider>
    	<Router>
    		<Switch>
    			<Route path='/' exact component={HomeScreen} />
    			<Route default component={PageNotFound} />
    		</Switch>
   	    </Router>
    </ErrorProvider>
  );
}

export default App;
