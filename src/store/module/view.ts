import storeService, { IStoreService } from '../store';
import { INamespacedState } from '../store';
import * as stateTypes from '../state-types'

export interface IViewService {
    /**
     * 添加标签
     * @param tab 
     */
    add_tabs(tab: any): void;

    /**
     * 删除标签
     * @param route 
     */
    delete_tabs(route: any): void;

    /**
     * 设置当前激活的标签
     * @param index 
     */
    set_active_index(index: string): void;
    getOpenTab();
    getActiveIndex();
}

class ViewService implements IViewService {
    private _store: INamespacedState;
    private _openTab = new Array<any>();

    constructor() {
        this._store = storeService.createNamespace(stateTypes.VIEW.NAMESPACE, {
            [stateTypes.VIEW.OPENTAB]:Array<any>(),
            [stateTypes.VIEW.ACTIVEINDEX]: '/main',
        });
    }

    getOpenTab() {
        return this._store.getData(stateTypes.VIEW.OPENTAB);
    }

    getActiveIndex() {
        return this._store.getData(stateTypes.VIEW.ACTIVEINDEX);
    }

    add_tabs(tab: any): void {
        this._openTab = this._store.getData(stateTypes.VIEW.OPENTAB);       
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
        this._store.setData(stateTypes.VIEW.OPENTAB, this._openTab.splice(index, 1));

    }
    set_active_index(index: string): void {
        this._store.setData(stateTypes.VIEW.ACTIVEINDEX, index);
    }

}

const viewService: IViewService = new ViewService();

export default viewService;