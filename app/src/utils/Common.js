import translations from './translations';

(function setLocale () {
    if (localStorage && localStorage.getItem('vp_ul')) {
        window.appLang = localStorage.getItem('vp_ul');
    } else if (window.navigator.language && window.navigator.language.indexOf('bg') > 0) {
        window.appLang = 'bg';
        localStorage.setItem('vp_ul', 'bg');
    } else {
        window.appLang = 'en';
        localStorage.setItem('vp_ul', 'en');
    }
})();

export default class Common {
    static getChangeLang(lang) {
        if (window.appLang && lang && window.appLang !== lang) {
            window.appLang = lang;
            localStorage.setItem('vp_ul', lang);
            window.location.reload();
        }
    }

    static getActiveLang () {
        return window.appLang;
    }

    static getTranslation(props) {
        return window.appLang && this.getFinalProp(translations[window.appLang], props) || '';
    }

    static getFinalProp(mainObj, props) {
        let result = mainObj,
            array = props.split('.'),
            tempProp = array.shift();

        while (tempProp) {
            result = result[tempProp];
            tempProp = array.shift();
        }

        return result;
    }
}