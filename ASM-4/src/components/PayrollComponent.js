import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { Fade } from "react-animation-components";
import { fetchPayroll } from "../redux/ActionCreator";
import { connect } from "react-redux";

// connect với store
const mapStateToProps = (state) => {
  return {
    payroll: state.payroll,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPayroll: (payrollId) => dispatch(fetchPayroll(payrollId)),
});

class Payroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      showFaded: false,
    };

    this.sortStaffId = this.sortStaffId.bind(this);
    this.sortStaffSalary = this.sortStaffSalary.bind(this);
    this.toggleDrop = this.toggleDrop.bind(this);
  }

  //dropdown menu
  toggleDrop() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      showFaded: false,
    });
  }

  //onclick sắp xếp id giảm dần
  sortStaffId() {
    const newPayroll = this.props.payroll.payroll.sort((a, b) => b.id - a.id);

    this.setState({
      payroll: { ...this.props.payroll, ...{ staffs: newPayroll } },
    });
  }
  //lương tăng dần
  sortStaffSalary() {
    const newPayroll = this.props.payroll.payroll.sort(
      (a, b) => a.salary - b.salary
    );

    this.setState({
      payroll: { ...this.props.payroll, ...{ staffs: newPayroll } },
    });
  }

  componentDidMount() {
    this.props.fetchPayroll(this.props.payrollId);
    this.setState({ showFaded: true });
  }

  //Sort theo lương tăng dần

  render() {
    const payroll = this.props.payroll.payroll.map((payroll) => {
      return (
        <div className="col-12 col-md-6 col-lg-4 mb-2" key={payroll.id}>
          <RenderPayroll payroll={payroll} showFaded={this.state.showFaded} />
        </div>
      );
    });

    if (this.props.payroll.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.payroll.errMess) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4>{this.props.payroll.errMess}</h4>
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div className="container">
          <div className="row mt-5">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/home">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Payroll</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12 text-light">
              <h3>Bảng Lương nhân viên</h3>
              <hr />
              <Dropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleDrop}
                className="mb-3"
              >
                <DropdownToggle caret>Sắp xếp</DropdownToggle>
                <DropdownMenu className="bg-warning">
                  <DropdownItem
                    className="fa fa-sort-numeric-desc"
                    onClick={this.sortStaffId}
                  >
                    Mã nhân viên
                  </DropdownItem>
                  <DropdownItem
                    className="fa fa-arrow-up"
                    onClick={this.sortStaffSalary}
                  >
                    Lương
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="row">{payroll}</div>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payroll);


//tạo class cpn mới để dùng life cycle, nếu showFade không thay đổi thì sẽ không cập nhật lại
class RenderPayroll extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.showFaded === nextProps.showFaded) {
      return false;
    } else return true;
  }

  render() {
    const { payroll } = this.props;
    return (
      <Fade in>
        <Card className="text-light bg-info border border-light">
          <CardTitle className="text-center pt-2">{payroll.name}</CardTitle>
          <div className="pl-2">
            <p>Mã nhân viên: {payroll.id}</p>
            <p>Hệ số lương: {payroll.salaryScale}</p>
            <p>Số giờ làm thêm: {payroll.overTime}</p>
          </div>
          <p className="btn btn-dark text-center ">Lương: {payroll.salary}</p>
        </Card>
      </Fade>
    );
  }
}
