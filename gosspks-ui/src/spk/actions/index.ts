import { Action } from 'redux'
import Syno from '../../models/Syno'
import Package from '../../models/Package'

export type LoadSynos = Action & {}
export const LOAD_SYNOS_ACTION = "spk#loadSynos"

export type SynosLoaded = Action & {
    synos: Syno[]
}
export const SYNOS_LOADED_ACTION = "spk#synoLoaded"

export type LoadPackages = Action & {}
export const LOAD_PACKAGES_ACTION = "spk#loadPackages"

export type PackagesLoaded = Action & {
    packages: Package[]
}
export const PACKAGES_LOADED_ACTION = "spk#packagesLoaded"

export type SelectSyno = Action & {
    name: string
}
export const SELECT_SYNO_ACTION = "spk#selectSyno"

export type FilterPackages = Action & {
    rule: string
}
export const FILTER_PACKAGES_ACTION = "spk#filterPackages"

export type FilterOutBeta = Action & {}

export type FilteredOutBeta = Action & {
    packages: Package[]
}
export const FILTER_OUT_BETA_ACTION = "spk#filterOutBeta"

export function filterPackages(rule: string): FilterPackages {
    return { type: FILTER_PACKAGES_ACTION, rule: rule }
}

export function loadSynos(): LoadSynos {
    return { type: LOAD_SYNOS_ACTION }
}

export function loadPackages(): LoadPackages {
    return { type: LOAD_PACKAGES_ACTION }
}

export function packagesLoaded(pkgs: Package[]): PackagesLoaded {
    return { type: PACKAGES_LOADED_ACTION, packages: pkgs}
}

export function synosLoaded(synos: Syno[]): SynosLoaded {
    return { type: SYNOS_LOADED_ACTION, synos: synos } 
}

export function selectSyno(synoName: string): SelectSyno {
    return { type: SELECT_SYNO_ACTION, name: synoName }
}

export function filterOutBeta(pkgs: Package[]): FilteredOutBeta {
    var inputElement = <HTMLInputElement>document.getElementById('search');
    inputElement.value = ""
    return { type: FILTER_OUT_BETA_ACTION, packages: pkgs }
}

export type Actions = SelectSyno | LoadSynos | SynosLoaded | LoadPackages | PackagesLoaded | FilterPackages | FilterOutBeta