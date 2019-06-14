import Vue from 'vue';
import { ICommomUtil, commonUtil } from '@/utils/common-utils';
import requestService, { IRequest } from '@/utils/request';

Vue.prototype.$utils = {
    common: commonUtil,
    request: requestService
}

declare module 'vue/types/vue' {
    interface Vue {
        $utils: {
            common: ICommomUtil,
            request: IRequest
        },
    }
}
