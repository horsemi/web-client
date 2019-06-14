import request from '@/utils/request';

export const login = (userInfo: {userName: string, userPassword: string}) => {
    return request.post("5cc00b8791c8495bfb9dff88/web-client/login", userInfo); // 来自 easy mock
}

export const logout = () => {
    return request.get("5cc00b8791c8495bfb9dff88/web-client/logout"); // 来自 easy mock
}

export const getInfo = (token: string) => {
    return request.post("5cc00b8791c8495bfb9dff88/web-client/get_userInfo", token); // 来自 easy mock
}