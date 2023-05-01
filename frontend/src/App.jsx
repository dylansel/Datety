
import React from 'react';
import { Route, Link, Switch } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import APP from './pages/APP';
import Settings from './pages/Settings';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Header from "./components/utils/Header"
import Input from './components/utils/Input';


function App() {

  return (
    <>
      <Switch>
        <Route exact path="/" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/settings" component={Settings} />
        <Route path="/app" component={APP} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
