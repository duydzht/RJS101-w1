import React, { Component} from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import {STAFFS} from './shared/staffs';

class App extends Component {
    
    //khởi thạo this để truy cập
    constructor(props) {
        super(props);
        this.state = {
            member: STAFFS
        };
    }
    render() {
        return (
            <div className="banner">
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">Ứng dụng quản lí nhân sự v1.0</NavbarBrand>
                    </div>
                </Navbar>
                <Menu member={this.state.member} />
            </div>
        )
    }
}

export default App;