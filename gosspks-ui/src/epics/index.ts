import { combineEpics, Epic } from "redux-observable"
import spkEpics from "../spk/epics"

const epics: Epic<any, any>[] = [
  ...spkEpics
];

/** Combines all epic's components */
export default (action$, store) =>
  combineEpics(...epics)(action$, store, {}).catch((err, source) => {
    return source;
  });
