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

const TIME_ZONE_GAP = (-1*(new Date().getTimezoneOffset()))/60;

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

    static setOpenCloseMarker(data) {
        let startEndTimeArr = [],
            today = new Date(),
            currentDay = today.getDay(),
            currentHour = today.getUTCHours(),
            currentMinutes = today.getMinutes(),
            startTime,
            endTime;

        if (currentDay == 0) {
            currentDay = 7;
        }

        for (let i = 0; i < data.length; i++) {
            //the dash: (– 8211  2013 &ndash; EN DASH)
            if (data[i].open) {
                startEndTimeArr = data[i].workingTime[currentDay-1].split('–');

                if (startEndTimeArr[0]) {
                    startTime = startEndTimeArr[0].split(':');
                    endTime = startEndTimeArr[1].split(':');

                    //hours '-2': data is with GMT -2 (Sofia...)
                    if ((currentHour > parseInt(startTime[0]) - TIME_ZONE_GAP) && (currentHour < parseInt(endTime[0]) - TIME_ZONE_GAP)) {
                        data[i].isOpen = true;
                    } else if ((currentHour == parseInt(startTime[0]) - TIME_ZONE_GAP)  && (currentMinutes > parseInt(startTime[1]))) {
                        data[i].isOpen = true;
                    }  else if ((currentHour == parseInt(endTime[0]) - TIME_ZONE_GAP)  && (currentMinutes < parseInt(endTime[1]))) {
                        data[i].isOpen = true;
                    } else {
                        data[i].isOpen = false;
                    }
                } else {
                    data[i].isOpen = false;
                }
            } else {
                data[i].isOpen = false;
            }
        }

        return data;
    }
}