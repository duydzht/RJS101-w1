import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardTitle } from 'reactstrap';
import {Link} from 'react-router-dom';




class Payroll extends Component   {
    
    constructor(props) {
        super(props);

        this.state = {
            payroll: this.props.payroll,
        }
        this.sortStaffId = this.sortStaffId.bind(this);
        this.sortStaffSalary = this.sortStaffSalary.bind(this);
    }

    //onclick sắp xếp id giảm dần
    sortStaffId() {
        this.setState({
            payroll: this.props.payroll.sort((a,b) => b.id - a.id),
        })
    }

    //Sort theo lương tăng dần
    sortStaffSalary() {
        this.setState({
            payroll: this.props.payroll.sort((a,b) => {
                //Công thức tính lương
                const basicSalary = 3000000;
                const overTimeSalary = 200000;
                const salaryA = (a.salaryScale * basicSalary) + (a.overTime * overTimeSalary);
                const salaryB = (b.salaryScale * basicSalary) + (b.overTime * overTimeSalary);
                return (salaryA - salaryB);
            })
            
        })
    }


    render() {
    
        const RenderPayroll = ({payroll}) => {

            //Công thức tính lương
            const basicSalary = 3000000;
            const overTimeSalary = 200000;
            const a = payroll.salaryScale;
            const b = payroll.overTime;
            const salary = (a * basicSalary) + (b * overTimeSalary);


            return (
                <Card className="bg-info text-light border-light">
                    <CardTitle className="text-center pt-2">{payroll.name}</CardTitle>
                    <div className="pl-2">
                        <p>Mã nhân viên: {payroll.id}</p>
                        <p>Hệ số lương: {payroll.salaryScale}</p>
                        <p>Số giờ làm thêm: {payroll.overTime}</p>
                    </div>
                    <p className="btn btn-dark text-center ">Lương: {salary}</p>
                </Card>
            );
        }
        // var sortedPayroll = this.props.payroll;
        // sortedPayroll.map(element => {
            
        //     //Công thức tính lương
        //     const basicSalary = 3000000;
        //     const overTimeSalary = 200000;
        //     const salary = (element.salaryScale * basicSalary) + (element.overTime * overTimeSalary);
        //     element.salary = salary;
        //     return element;
        // });
        //     sortedPayroll.sort(function (a,b)  {
            
        //         return (a.salary - b.salary);
        //     });



        const payroll = this.state.payroll.map((payroll) => {
            return (
                <div className="col-12 col-md-6 col-lg-4 mb-2" key={payroll.id}  >
                    <RenderPayroll payroll={payroll} />
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Payroll</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12 text-light">
                        <h3>Bảng Lương nhân viên</h3>
                        <hr />
                        <button type="button" className="btn btn-warning m-2 fa fa-sort-numeric-desc" onClick={this.sortStaffId}> Mã nhân viên</button>
                        <button type="button" className="btn btn-warning m-2 fa fa-arrow-up" onClick={this.sortStaffSalary}> Lương</button>
                    </div>
                </div>
                <div className="row">
                    {payroll}
                </div>
            </div>
        );
    }
}


export default Payroll;