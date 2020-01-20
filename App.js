/** @format */

import { registerRootComponent } from 'expo';
import React, {Component} from 'react';
import Main from './src/App';

export default  class App extends React.Component{ 
    render() {
        return (
            <Main/>
        )
    }
}
