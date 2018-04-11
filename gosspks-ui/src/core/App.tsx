import "rxjs"; // import all Observable operators
import * as React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import reducers, { State as StoreState } from "../reducers";
import epics from "../epics";
// components
import SPKComponent from "../spk/SPK";

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers<StoreState>({
    ...reducers
  }),
  composeWithDevTools(applyMiddleware(createEpicMiddleware(epics)))
);

export const App: React.StatelessComponent<{}> = () => {
  return (
    <Provider store={store}>
      <SPKComponent />
    </Provider>
  );
};
