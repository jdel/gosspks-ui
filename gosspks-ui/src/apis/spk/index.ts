import { AjaxError, AjaxResponse, Observable } from "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";
import { get, _catch } from "../common";
import Syno from "../../models/Syno";
import Package from "../../models/Package";

export const fetchSynoModels = (): Observable<Syno[]> =>
  get("/api/v1/models")
    .catch(_catch)
    .map((synos: Syno[]) => synos);

export const fetchSynoPackages = (): Observable<Package[]> =>
  get("/api/v1/packages?latest=true")
    .catch(_catch)
    .map((pkgs: Package[]) => pkgs);
