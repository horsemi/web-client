import storeService, { IStoreService } from '../store';
import { INamespacedState } from '../store';
import authService, { IAuth } from '@/utils/auth';
import * as userApi from '@/api/user';

export interface IUserService {
    token: string;
    id: number;
    name: string;
    /**
     * @description 头像
     */
    avatar: string;         
    /**
     * @description 角色 K3一个用户拥有多个角色
     */
    roles: string[];
    /**
     * @description 权限
     */
    permissions: string[];
    /**
     * @description 登录
     * @param userInfo 
     */
    login(userInfo: {userName: string, userPassword: string}): Promise<any>;
    /**
     * @description 获取客户明细
     */
    getInfo(): Promise<any>;
    /**
     * @description 重置token
     */
    removeToken(): Promise<any>;
}

const stateTypes = {
    NAMESPACE: "user",
    TOKEN: "token",
    ID: "id",
    NAME: "name",
    AVATAR: "avatar",
    ROLES: "roles",
    PERMISSIONS: "permissions"
};

class UserSerivce implements IUserService {
    private _store: INamespacedState;

    constructor() {
        this._store = storeService.createNamespace(stateTypes.NAMESPACE, {
            [stateTypes.ID]: "",
            [stateTypes.NAME]: "",
            [stateTypes.AVATAR]: "",
            [stateTypes.ROLES]: [],
            [stateTypes.PERMISSIONS]: [],
        });
    }

    login(userInfo: {userName: string, userPassword: string}) {
        // TODO: 调用登录接口
        return new Promise((resolve, reject) => {
            userApi.login(userInfo)
            .then(response => {
                const { data } = response;
                this.setToken(data.token.data);
                resolve();
            })
            .catch(error => {
                reject(error);
            })
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            userApi.logout().then(response => {
                const { data } = response;
                if (data.result === 'sueecss') {
                    resolve();
                } else {
                    reject("登出失败！");
                }
            })
        })
    }

    getInfo() {
        return new Promise((resolve, reject) => {
            userApi.getInfo(this.token).then(response => {
                const { data } = response;
                if (!data) {
                    this.removeToken();
                    reject('无法获取用户信息, 请重新登录!');
                } else {
                    const { id, name, avatar, roles, permissions} = data.userInfo;

                    if (!permissions || permissions.length <= 0) {
                        this.removeToken();
                        reject('获取权限失败，请重新登录!');
                    } else {
                        this.setId(id);
                        this.setName(name);
                        this.setAvatar(avatar);
                        this.setRoles(roles);
                        this.setPermissions(permissions);
                        resolve(data.userInfo);
                    }
                }
            })
        })
    }

    removeToken() {
        return new Promise((resolve) => {
            authService.removeToken();
            this.setRoles([]);
            resolve();
        })
    }

    get token() {
        if (authService.Token) {
            return authService.Token as string;
        } else {
            console.error("token is null");
            return '';
        }
    }

    private setToken(val: string) {
        if (!val) {
            console.error("token is null");
            return;
        }
        authService.Token = val;
    }

    get id() {
        return this._store.getData(stateTypes.ID);
    }

    private setId(val: number) {
        this._store.setData(stateTypes.ID, val);
    }

    get avatar() {
        return this._store.getData(stateTypes.AVATAR);
    }

    private setAvatar(val: string) {
        this._store.setData(stateTypes.AVATAR, val);
    }

    get name() {
        return this._store.getData(stateTypes.NAME);
    }

    private setName(val: string) {
        this._store.setData(stateTypes.NAME, val);
    }

    get roles() {
        return this._store.getData(stateTypes.ROLES);
    }

    private setRoles(val: string[]) {
        this._store.setData(stateTypes.ROLES, val);
    }

    get permissions() {
        return this._store.getData(stateTypes.PERMISSIONS);
    }

    private setPermissions(val: string[]) {
        this._store.setData(stateTypes.PERMISSIONS, val);
    }
}

const userService: IUserService = new UserSerivce();

export default userService;