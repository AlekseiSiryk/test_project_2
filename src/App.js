import React, { useState } from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import ClosedPage from './ClosedPage';

function App() {
  const [msg, setMsg] = useState('');
  const history = useHistory();
  return (
    <div className="App">
      <nav>
        <NavLink to="/" exact>Home Page</NavLink>
        <NavLink to="/closed">Closed Page</NavLink>
      </nav>
      <Route
        path="/"
        exact
        render={() => (
          <HomePage history={history} msg={msg} setMsg={setMsg} />)}
      />
      <Route
        path="/closed"
        render={() => <ClosedPage history={history} setMsg={setMsg} />}
      />
    </div>
  );
}

export default App;
