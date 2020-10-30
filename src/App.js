import './App.css';
import React, {useState} from "react";
import {NavLink, Route, useHistory} from "react-router-dom";
import HomePage from "./HomePage";
import ClosedPage from "./ClosedPage";

function App() {
    const [msg, setMsg] = useState('');
    let history = useHistory();
    return (
        <div className="App">
            <nav>
                <NavLink to="/" exact={true}>Home Page</NavLink>
                <NavLink to="/closed">Closed Page</NavLink>
            </nav>
            <Route path="/" exact={true} render={() => (
                <HomePage history={history} msg={msg} setMsg={setMsg}/>)}/>
            <Route path="/closed" render={() =>
                <ClosedPage history={history} setMsg={setMsg}/>}/>
        </div>
    );
}

export default App;
