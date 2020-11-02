import React, { useState } from 'react';
import { getMe } from './logic';

const ClosedPage = ({ history, setMsg }) => {
  const [access, updateAccess] = useState(false);
  if (!access) getMe(history, updateAccess, setMsg);
  if (!access) return null;
  const onExit = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setMsg('');
    updateAccess(false);
    history.push('/');
  };
  return (
    <div className="closedPage">
      Welcome to closed page!
      <button className="exitBtn" onClick={ onExit }>
        Exit
      </button>
    </div>
  );
};
export default ClosedPage;
