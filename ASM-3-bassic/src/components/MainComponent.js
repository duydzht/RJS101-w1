import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Payroll from './PayrollComponent';
import StaffDetail from './StaffdetailComponent';
import { DEPARTMENTS, ROLE, STAFFS } from '../shared/staffs';
import Department from './DepartmentComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            staffs: STAFFS,
            departments: DEPARTMENTS,
            role: ROLE,
        };
    }

    onAddStaff = (staffs) => {
        this.setState({staffs: staffs});
    }

    render() {
        const HomePage = () => {
            return (
                <Home staff = {this.state.staffs}
                    department = {this.state.departments}
                    role = {this.state.role}
                />
            );
        }

        const StaffWithId = ({match}) => {
            return (
                <StaffDetail staff = {this.state.staffs.filter((staff)=> staff.id === parseInt(match.params.id,10))[0]}/>
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/departments" component={() => <Department department = {this.state.departments}/>}/>
                    <Route exact path="/stafflist" component={() => <Menu staffs = {this.state.staffs} onAddStaff={(staffs) => this.onAddStaff(staffs)}/>}  />
                    {/* exact để ngăn đường dẫn chọn sai vì có 2 /menu */}
                    <Route path = "/menu/:id" component = {StaffWithId}/>
                    <Route exact path="/payroll" component={() => <Payroll payroll = {this.state.staffs}/>}/>
                    <Redirect to="/home" />
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default Main;