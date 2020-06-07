import history from '../History';
import auth0 from 'auth0-js';

export default class Auth0Authorization {
    // TO DO: Consider using cookies instead of localStorage

    auth0 = new auth0.WebAuth({
        domain: 'jz-projects.auth0.com',
        clientID: 'RVXLklWGkLaU9jiK7p5G4BGuz2r3DHKz',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid profile email'
    });

    userProfile = {};

    login = () => {
        this.auth0.authorize();
    }

    logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.userProfile = null;
        history.replace('/authcheck');
    }

    setSession = (authRes) => {
        let expiresAt = JSON.stringify((authRes.expiresIn * 1000 + new Date().getTime()));
        localStorage.setItem('access_token', authRes.accessToken);
        localStorage.setItem('id_token', authRes.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    handleAuthentication = () => {
        this.auth0.parseHash((err, authRes) => {
            if (authRes && authRes.accessToken && authRes.idToken) {
                this.setSession(authRes);
                this.getProfile();
                setTimeout(function() { history.replace('/authcheck')}, 2000);
            } else if (err) {
                history.replace('/');
                alert(`Error: ${err.error}. Check console for further details.`);
            }
        });
    }

    getAccessToken = () => {
        if (localStorage.getItem('access_token')) {
            const accessToken = localStorage.getItem('access_token');
            return accessToken;
        }
        return null;
    }

    getProfile = () => {
        let accessToken = this.getAccessToken();
        if (accessToken) {
            this.auth0.client.userInfo(accessToken, (err, profile) => {
                if (profile) {
                    this.userProfile = { profile };
                }
            });
        }
    }

    isAuthenticated = () => {
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}