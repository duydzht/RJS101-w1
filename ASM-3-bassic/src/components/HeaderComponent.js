import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import {NavLink} from 'react-router-dom';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this); // bind() để toggleNav có thể gọi được bên trong render
    }

    //responsive của Navbar
    toggleNav () {
        this.setState ({
            isNavOpen: !this.state.isNavOpen, //khi toggleNav được click, giá trị của nó luôn luôn khác isOpen
        })
    }
    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md" className="sticky-top">
                    <div className="container">
                        <NavbarToggler onClick = {this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion"/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to = "/home">
                                        <span className="fa fa-home fa-lg"></span> Home 
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to = "/departments">
                                        <span className="fa fa-suitcase fa-lg"></span> Phòng ban
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to = "/stafflist">
                                        <span className="fa fa-users fa-lg"></span> Nhân viên 
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to = "/payroll">
                                        <span className="fa fa-address-card fa-lg"></span> Bảng lương 
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    };
}
export default Header;