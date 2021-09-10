import React, { Component } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Payroll from "./PayrollComponent";
import StaffDetail from "./StaffdetailComponent";
import Department from "./DepartmentComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchStaffs,
  postStaff,
  fetchDepartments,
  deleteStaff,
  editStaff,
} from "../redux/ActionCreator";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Staffofdepart from "./StaffofDepart";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    role: state.role,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  postStaff: (newStaff) => dispatch(postStaff(newStaff)),
  deleteStaff: (id) => dispatch(deleteStaff(id)),
  editStaff: (staff) => dispatch(editStaff(staff)),
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
  }
  render() {
    const HomePage = () => {
      return <Home />;
    };

    const StaffWithId = ({ match, history }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.id, 10)
            )[0]
          }
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
          postStaff={this.props.postStaff}
          deleteStaff={this.props.deleteStaff}
          editStaff={this.props.editStaff}
          history={history}
        />
      );
    };

    const DepartWithId = ({ match }) => {
      return <Staffofdepart departId={match.params.id} />;
    };

    const PayrollId = ({ match }) => {
      return <Payroll payrollId={match.params.id} />;
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/departments"
                component={() => (
                  <Department departments={this.props.departments} />
                )}
              />
              <Route exact path="/departments/:id" component={DepartWithId} />
              <Route
                exact
                path="/stafflist"
                component={() => (
                  <Menu
                    postStaff={this.props.postStaff}
                    staffs={this.props.staffs}
                  />
                )}
              />
              {/* exact để ngăn đường dẫn chọn sai vì có 2 /menu */}
              <Route exact path="/stafflist/:id" component={StaffWithId} />
              <Route
                exact
                path="/payroll"
                component={() => <Payroll component={PayrollId} />}
              />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
