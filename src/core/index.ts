import Vue from 'vue';
import { ICommomUtil, commonUtil } from '@/utils/commonUtils';

Vue.prototype.$utils = {
    common: commonUtil
}

declare module 'vue/types/vue' {
    interface Vue {
        $utils: {
            common: ICommomUtil,
        }
    }
}
