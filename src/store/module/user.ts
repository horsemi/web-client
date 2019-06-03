import storeService, { IStoreService } from '../store';
import { INamespacedState } from '../store';
import authService, { IAuth } from '@/utils/auth';

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
    login(userInfo: {userName: string, userPassword: string}): boolean;
    /**
     * @description 获取客户明细
     * @param token 
     */
    getInfo(token: string);
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
        this.setToken(userInfo.userName);
        return true;
    }

    getInfo(token: string) {
        // TODO: 根据token获取用户信息
        this.setId(1);
        this.setName("Admin");
        this.setAvatar("https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif");
        this.setRoles(["admin"]);
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
        if (val === '') {
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