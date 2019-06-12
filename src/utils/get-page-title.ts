import defaultSetting from '@/settings';

const title = defaultSetting.title || 'web-client';

const getPageTitle = (pageTitle: string) => {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`;
}

export default getPageTitle;