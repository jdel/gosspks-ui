import { AjaxError, AjaxResponse, Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'

/** UUID generator */
export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const get = (route: string) => (ajax.getJSON(route))

/** API errors handler */
export const _catch = (err: AjaxError) => {
    console.log(err);
    throw { id: guid(), value: `${err.status}` }
};