import React, { useState } from 'react';
import { signIn, signUp } from './logic';

const HomePage = ({ history, msg, setMsg }) => {
  const [email, emailUpdate] = useState('');
  const [pass, passUpdate] = useState('');
  return (
    <div className="form">
      <h3>Sign in / Sign up</h3>
      <label> Email
        <input value={email} onChange={(e) => emailUpdate(e.target.value)} type="text" />
      </label>
      <label> Password
        <input value={pass} onChange={(e) => passUpdate(e.target.value)} type="password" />
      </label>
      <button onClick={() => signIn(email, pass, setMsg, history)}>Sign in</button>
      <button onClick={() => signUp(email, pass, setMsg, history)}>Sign up</button>
      <h3>{msg}</h3>
    </div>
  );
};
export default HomePage;
