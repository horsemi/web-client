
const storer: { [key: string]: any } = {};

export interface INamespacedState {
  namespace: string;
  root: IStoreService;
  getData(key: string): any;
  setData(key: string, value: any): void;
}

export interface IStoreService {
  getStorer(): any;
  getData(key: string): any;
  setData(key: string, value: any): void;

  /**
   * 声明命名空间
   * @param namespace 命名空间名称 若命名空间已存在，则返回该命名空间
   * @param data state属性
   */
  createNamespace(name: string, data: any): INamespacedState;
}

/**
 * VUEX命名空间类
 */
class NamespaceState implements INamespacedState {

    /**
     * 声明命名空间
     * @param namespace 命名空间的名称
     * @param root Store实体
     * @param state 属性
     */
  constructor(public namespace: string, public root: IStoreService, public state: { [key: string]: any }) {
    root.setData(namespace, this.state);
  }

  getData(key: string): any {
    return this.state[key];
  }

  setData(key: string, value: any) {
    this.state[key] = value;
  }
}

/**
 * Store服务层
 */
class StoreService implements IStoreService {
  private _namespances = new Array<INamespacedState>();

  getStorer() {
    return storer;
  }

  getData(key: string): any {
    return storer[key];
  }

  setData(key: string, value: any) {
    storer[key] = value;
  }

  createNamespace(namespace: string, data: { [key: string]: any }): INamespacedState {
    let found = this._namespances.find(a => a.namespace === name);
    if (!found) {
      found = new NamespaceState(namespace, this, data);
      this._namespances.push(found);
    }
    return found;
  }
}

const storeService: IStoreService = new StoreService();

export default storeService;