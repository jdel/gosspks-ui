import { Epic } from "redux-observable";

import {
  Actions,
  LOAD_SYNOS_ACTION,
  LOAD_PACKAGES_ACTION,
  FILTER_OUT_BETA_ACTION,
  LoadSynos,
  LoadPackages,
  FilterOutBeta,
  synosLoaded,
  packagesLoaded
} from "../actions";
import { SPKState } from "../reducers";
import * as apis from "../../apis/spk";

const loadSynosEpic: Epic<Actions, SPKState> = (action$, store) =>
  action$
    .ofType(LOAD_SYNOS_ACTION)
    .flatMap((a: LoadSynos) =>
      apis.fetchSynoModels().map(synos => synosLoaded(synos))
    );

const loadPackagesEpic: Epic<Actions, SPKState> = (action$, store) =>
  action$
    .ofType(LOAD_PACKAGES_ACTION)
    .flatMap((a: LoadPackages) =>
      apis.fetchSynoPackages().map(pkgs => packagesLoaded(pkgs))
    );

const filterOutBetaEpic: Epic<Actions, SPKState> = (action$, store) =>
  action$
    .ofType(FILTER_OUT_BETA_ACTION)
    .flatMap((a: FilterOutBeta) =>
      apis.fetchSynoPackages().map(pkgs => packagesLoaded(pkgs))
    );

export default [loadSynosEpic, loadPackagesEpic, filterOutBetaEpic];
