import { default as spkReducers, SPKState } from "../spk/reducers";

export type State = {
  spk: SPKState
}

export default {
  ...spkReducers
};
