const root = 'http://142.93.134.108:1111';
export const signIn = (email, pass, setMsg, history) => {
    const reqStr = `${root}/login?email=${email}&password=${pass}`;
    fetch(reqStr, {method: 'POST'})
        .then(res => {
            return res.json()
        })
        .then(res => {
            if (res.status === 'error' || (res.body && res.body.status === 'error')) {
                return setMsg('Wrong pass or email');
            }
            if (res.body && res.body.access_token) {
                setMsg('Welcome!');
                localStorage.setItem('access_token', res.body.access_token);
                localStorage.setItem('refresh_token', res.body.refresh_token);
                history.push('/closed')
            }
        });
};

export const signUp = (email, pass, setMsg, history) => {
    const reqStr = `${root}/sign_up`;
    const body = JSON.stringify({email: email, password: pass});
    fetch(reqStr, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: body
    })
        .then(res => res.json())
        .then(res => {
            if (res.status === "error") {
                setMsg('Account is already exist')
                return false;
            }
            if (res.status === 'Ok') {
                signIn(email, pass, setMsg, history)
            }
        });
};

export const getMe = (history, updateAccess, setMsg, refresh_token = null) => {
    const access_token = localStorage.getItem('access_token');
    if (access_token && !refresh_token) {
        fetch(root + "/me", {method: "GET", headers: {'Authorization': `Bearer ${access_token}`}})
            .then((res) => {
                return res.json();
            })
            .then(res => {
                if (res.body && res.body.status === 'ok')
                    return updateAccess(true);
                else {
                    if (refresh_token === false) {  //Если ошибка после refresh
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                        setMsg('Authorization required');
                        updateAccess(false);
                        history.push('/');
                        return;
                    }
                    getMe(history, root, updateAccess, setMsg, localStorage.getItem('refresh_token'));
                }
            });
    }
    if (refresh_token) {
        fetch(root + "/refresh", {method: "POST", headers: {'Authorization': `Bearer ${refresh_token}`}})
            .then((res) => {
                return res.json();
            })
            .then(res => {
                if (res.body && res.body.access_token) {
                    localStorage.setItem('access_token', res.body.access_token);
                    localStorage.setItem('refresh_token', res.body.refresh_token);
                    getMe(history, root, updateAccess, setMsg, false);
                } else {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    setMsg('Authorization required');
                    updateAccess(false);
                    history.push('/');
                }
            });
    }
    if (!access_token && !refresh_token) {
        setMsg('Authorization required');
        history.push('/');
    }
};