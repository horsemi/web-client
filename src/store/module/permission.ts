import storeService, { IStoreService } from '../store';
import { INamespacedState } from '../store';
import { constantRoutes, asyncRoutes } from '@/router/router';

export interface IPermissionService {
    routes: [];

    /**
     * @description 递归函数 动态加载路由，将所有拥有权限的页面组装起来
     * @param routes 
     * @param permissions 
     */
    filterAsyncRoutes(routes: any, permissions: []): any[];
    /**
     * @description 路由初始化，根据权限动态加载路由，若角色为"admin"，获取所有路由
     * @param permissions 
     * @param roles 
     */
    generateRoutes(permissions: string[], roles: string[]);
}

const stateTypes = {
    NAMESPACE: "permission",
    ROUTES: "routes",
    ADDROUTES: "addRoutes",
}

class PermissionService implements IPermissionService {
    private _store: INamespacedState;

    constructor() {
        this._store = storeService.createNamespace(stateTypes.NAMESPACE, {
            [stateTypes.ROUTES]: [],
            [stateTypes.ADDROUTES]: []
        });
    }

    filterAsyncRoutes(routes: any, permissions: string[]): any[] {
        const res = Array<any>();
        // 遍历所有拥有权限的页面
        routes.forEach((route: any) => {
            const tmp = { ...route }
            if (this.hasPermission(permissions, tmp)) {
            if (tmp.children) {
                // 递归函数 动态加载路由，将所有拥有权限的页面组装起来
                tmp.children = this.filterAsyncRoutes(tmp.children, permissions)
            }
            res.push(tmp)
            }
        })

        return res
    }

    generateRoutes(permissions: string[], roles: string[]) {
        let accessedRoutes;
        if (roles.includes('admin')) {
            accessedRoutes = asyncRoutes || [];
        } else {
            accessedRoutes = this.filterAsyncRoutes(asyncRoutes, permissions);
        }
        this.setRoutes(accessedRoutes);
    }

    /**
     * @description 重置路由，把默认路由 + 动态路由组合并赋值
     * @param routes 
     */
    private setRoutes(routes: []) {
        this._store.setData(stateTypes.ADDROUTES, routes);
        this._store.setData(stateTypes.ROUTES, constantRoutes.concat(routes));
    }

    get routes() {
        return this._store.getData("routes");
    }

    /**
     * @description 遍历出所有拥有权限的路由
     * @param permissions 
     * @param route 
     */
    private hasPermission(permissions: string[], route: any): boolean {
        if (route.meta && route.meta.permission) {
            return permissions.some(permission => route.meta.permission.includes(permission));
        } else {
            return true;
        }
    }
}

const permissionService: IPermissionService = new PermissionService();

export default permissionService;