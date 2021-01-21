import React, { Fragment } from 'react';
import './App.css';
import Home from './Components/Home.js'
import TransactionsPage from './Components/TransactionsPage'
import MakeATransaction from './Components/MakeATransaction.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NavBar from './Components/NavBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <NavBar />
        <Container className="mt-5">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/TransactionsPage" component={TransactionsPage} />
            <Route path="/MakeATransaction" component={MakeATransaction} />
          </Switch>
        </Container>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;