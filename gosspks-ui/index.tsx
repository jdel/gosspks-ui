import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App } from './src/core/App';
import './index.scss'

interface NodeRequire {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

declare global {
    type StyleDefinition = { [className : string] : { [cssProperty : string] : string } };
    type StylesCtor<P> = (style ?: {}) => P;
    type Styles<P> = P&StylesCtor<P>;
}

ReactDOM.render( <App/>, document.getElementById( 'app' ) );
