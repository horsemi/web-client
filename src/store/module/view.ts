import storeService, { IStoreService } from '../store';
import { INamespacedState } from '../store';
import * as stateTypes from '../state-types'

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

class ViewService implements IViewService {
    private _store: INamespacedState;
    private _openTab = new Array<any>();

    constructor() {
        this._store = storeService.createNamespace(stateTypes.VIEW.NAMESPACE, {
            [stateTypes.VIEW.OPENTAB]: [{route: '/index/main', name: 'main'}],
            [stateTypes.VIEW.ACTIVEINDEX]: '/main',
        });
    }

    get openTab() {
        return this._store.getData(stateTypes.VIEW.OPENTAB);
    }

    get activeIndex() {
        return this._store.getData(stateTypes.VIEW.ACTIVEINDEX);
    }

    set activeIndex(val: string) {
        /**
         * 设置当前激活的标签
         */
        this._store.setData(stateTypes.VIEW.ACTIVEINDEX, val);
    }

    add_tabs(tab: any): void {
        this._openTab = this._store.getData(stateTypes.VIEW.OPENTAB);  
        this._openTab.push(tab);
        this._store.setData(stateTypes.VIEW.OPENTAB, this._openTab);
    }
    delete_tabs(route: any): void {
        let index = 0;
        this._openTab = this._store.getData(stateTypes.VIEW.OPENTAB);
        for (let option of this._openTab) {
            if (option.route === route) {
                break;
            }
            index++;
        }
        this._openTab.splice(index, 1);
        this._store.setData(stateTypes.VIEW.OPENTAB, this._openTab);

    }

}

const viewService: IViewService = new ViewService();

export default viewService;