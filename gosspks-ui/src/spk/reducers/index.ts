import { Action, Reducer } from "redux";
import Syno from "../../models/Syno";
import Package from "../../models/Package";
import {
  SynosLoaded,
  PackagesLoaded,
  SYNOS_LOADED_ACTION,
  PACKAGES_LOADED_ACTION,
  SELECT_SYNO_ACTION,
  SelectSyno,
  FILTER_PACKAGES_ACTION,
  FilterPackages,
  FILTER_OUT_BETA_ACTION,
  FilterOutBeta
} from "../actions";

namespace spk {
  export const reducer: Reducer<SPKState> = (
    state: SPKState = { synos: [], packages: [], synoPackages: [], synoPackagesFiltered: [], betaToggle: false },
    action: Action
  ) => {
    switch (action.type) {
      case SYNOS_LOADED_ACTION:
        return {
          ...state,
          synos: (action as SynosLoaded).synos
        };
      case PACKAGES_LOADED_ACTION:
        return {
          ...state,
          packages: (action as PackagesLoaded).packages
        };
      case SELECT_SYNO_ACTION:
      console.log(state.betaToggle)
        var filteredOutBeta: Package[]
        var sname = (action as SelectSyno).name
        var syno = state.synos.find(s => s.name === sname)
        var synoArch = syno ? syno.arch : ''
        var filtered = state.packages.filter(p => p.arch.toLowerCase().trim() === synoArch.toLowerCase().trim() || p.arch.toLowerCase().trim() === 'noarch')
        if (!state.betaToggle) {
          filteredOutBeta = filtered.filter(
            pkg =>
              pkg.beta == null
          )
        } else {
          filteredOutBeta = filtered
        }

        return {
          ...state,
          synoPackages: filtered,
          synoPackagesFiltered: filteredOutBeta,
          synoSelectedName: sname
        };
      case FILTER_PACKAGES_ACTION:
        var filteredOutBeta: Package[]
        var rule = `.*${(action as FilterPackages).rule.toLowerCase()}.*`;
        if (!state.betaToggle) {
          filteredOutBeta = state.synoPackages.filter(
            pkg =>
              pkg.beta == null
          )
        } else {
          filteredOutBeta = state.synoPackages
        }
        return {
          ...state,
          synoPackagesFiltered: filteredOutBeta.filter(
            pkg =>
              pkg.dname.toLowerCase().match(rule) ||
              pkg.package.toLowerCase().match(rule)
          )
        };
      case FILTER_OUT_BETA_ACTION:
        var filteredOutBeta: Package[]
        // reverse logic because the event happens before state is changed
        if (state.betaToggle) {
          filteredOutBeta = state.synoPackages.filter(
            pkg =>
              pkg.beta == null
          )
        } else {
          filteredOutBeta = state.synoPackages
        }
        return {
          ...state,
          synoPackagesFiltered: filteredOutBeta,
          betaToggle: !state.betaToggle,
        };
      default:
        return state;
    }
  };
}

export type SPKState = {
  /** current members */
  synos: Syno[];
  synoSelectedName?: string;
  packages: Package[];
  synoPackages: Package[];
  synoPackagesFiltered: Package[];
  betaToggle: boolean;
};

export default { spk: spk.reducer };
