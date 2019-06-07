import request from '@/utils/request';

export const get = (params: any) => {
    return request.get('5cc00b8791c8495bfb9dff88/web-client/get_test', params); // get测试 来自 easy mock
}

export const post = (params: any) => {
    return request.post('5cc00b8791c8495bfb9dff88/web-client/post_test', params); // post测试 来自 easy mock
}

export const upload = (params: File | { key: string, file: File }) => {
    return request.upload('5cc00b8791c8495bfb9dff88/web-client/upload_test', params); // upload测试 来自 easy mock
}

export const download = (params?: any) => {
    return request.download('5cc00b8791c8495bfb9dff88/web-client/download_test', params); // download测试 来自 easy mock
}