export function getToken() {
    try {
        return localStorage.getItem('authToken');
    } catch (error) {
        console.error('Error getting token', error);
    }
}

export function getUsername() {
    try {
        return localStorage.getItem('userName');
    } catch (error) {
        console.error('Error getting username', error);
    }
}

export function removeToken() {
    try {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userLoggedIn');
    } catch (error) {
        console.error('Error removing token', error);
    }
}

