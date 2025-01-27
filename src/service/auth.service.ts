export const isLoggedIn = (): boolean => {
    const isAuthTokenAvailable = localStorage.getItem('auth_token') !== undefined
    const loggedInUser = localStorage.getItem('auth_user') !== undefined;
    return isAuthTokenAvailable && loggedInUser;
}

export const getToken = (): string | null => {
    const token = localStorage.getItem('auth_token');
    return token ? token : null;
}

export const setItem = (key: string, value: any) => {
    if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
    }
    localStorage.setItem(key, value);
}

export const getItem = (key: string): string | null => {
    const value = localStorage.getItem(key);
    if(!value) {
        return null;
    }
    return JSON.stringify(value);
}