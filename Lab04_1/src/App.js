import { DISHES } from './shared/dishes';
import './App.css';
import {Component} from "react";
import React from 'react';
import Main from './components/MainComponent';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }
    render() {
        return (
            <div className="App">
                <Main />
            </div>
        );
    }
}

export default App;