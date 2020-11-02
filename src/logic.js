import * as axios from 'axios';

const root = axios.create({baseURL: 'http://142.93.134.108:1111/'})
export const signIn = (email, pass, setMsg, history) => {
  const reqStr = `login?email=${email}&password=${pass}`;
  root.post(reqStr).then(res => {
    if (res.data.status === 'error' || (res.data.body && res.data.body.status === 'error')) {
      return setMsg('Wrong pass or email');
    }
    if (res.data.body && res.data.body.access_token) {
      setMsg('Welcome!');
      localStorage.setItem('access_token', res.data.body.access_token);
      localStorage.setItem('refresh_token', res.data.body.refresh_token);
      history.push('/closed');
    }
    return true;
  }).catch(() => setMsg('Network Error'));
};

export const signUp = (email, pass, setMsg, history) => {
  const body = { email, password: pass };
  root.post('sign_up', body)
  .then((res) => {
    if (res.data.status === 'error') {
      setMsg('Account is already exist');
      return false;
    }
    if (res.data.status === 'Ok') {
      signIn(email, pass, setMsg, history);
    }
    return true;
  })
  .catch(() => setMsg('Network Error'));
};

export const getMe = (history, updateAccess, setMsg, refresh_token = null) => {
  const access_token = localStorage.getItem('access_token');
  if (access_token && !refresh_token) {
    root.get('me', { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => {
      if (res.data.body && res.data.body.status === 'ok')
        return updateAccess(true);
      if (refresh_token === false) { // Если ошибка после refresh
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setMsg('Authorization required');
        updateAccess(false);
        history.push('/');
        return false;
      }
      getMe(history, updateAccess, setMsg, localStorage.getItem('refresh_token'));
    })
    .catch(() => setMsg('Network Error'));
  }
  if (refresh_token) {
    root.post(`refresh`, null, { headers: { Authorization: `Bearer ${refresh_token}` } })
    .then((res) => {
      if (res.data.body && res.data.body.access_token) {
        localStorage.setItem('access_token', res.data.body.access_token);
        localStorage.setItem('refresh_token', res.data.body.refresh_token);
        getMe(history, updateAccess, setMsg, false);
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setMsg('Authorization required');
        updateAccess(false);
        history.push('/');
      }
    })
    .catch(() => setMsg('Network Error'));
  }
  if (!access_token && !refresh_token) {
    setTimeout(() => {
      setMsg('Authorization required');
      history.push('/');
    },0);
  }
};