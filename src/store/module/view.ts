import storeService, { IStoreService } from '../store';
import { INamespacedState } from '../store';

export interface IViewService {
    openTab: any[];
    activeIndex: string;
    /**
     * 添加标签
     * @param tab 
     */
    add_tabs(tab: {route: string, name: string | undefined}): void;

    /**
     * 删除标签
     * @param route 
     */
    delete_tabs(route: any): void;
}

const stateTypes = {
    NAMESPACE: "view",
    OPENTAB: "openTab",
    ACTIVEINDEX: "activeIndex"
};

class ViewService implements IViewService {
    private _store: INamespacedState;
    private _openTab = new Array<any>();

    constructor() {
        this._store = storeService.createNamespace(stateTypes.NAMESPACE, {
            [stateTypes.OPENTAB]: [{route: '/index/main', name: 'main'}],
            [stateTypes.ACTIVEINDEX]: '/main',
        });
    }

    get openTab() {
        return this._store.getData(stateTypes.OPENTAB);
    }

    get activeIndex() {
        return this._store.getData(stateTypes.ACTIVEINDEX);
    }

    set activeIndex(val: string) {
        /**
         * 设置当前激活的标签
         */
        this._store.setData(stateTypes.ACTIVEINDEX, val);
    }

    add_tabs(tab: any): void {
        this._openTab = this._store.getData(stateTypes.OPENTAB);  
        this._openTab.push(tab);
        this._store.setData(stateTypes.OPENTAB, this._openTab);
    }
    delete_tabs(route: any): void {
        let index = 0;
        this._openTab = this._store.getData(stateTypes.OPENTAB);
        for (let option of this._openTab) {
            if (option.route === route) {
                break;
            }
            index++;
        }
        this._openTab.splice(index, 1);
        this._store.setData(stateTypes.OPENTAB, this._openTab);

    }

}

const viewService: IViewService = new ViewService();

export default viewService;