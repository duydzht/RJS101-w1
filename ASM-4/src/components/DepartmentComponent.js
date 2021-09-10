import React from 'react';
import { Breadcrumb, BreadcrumbItem, CardText, Card} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Loading} from './LoadingComponent';
import { Fade } from 'react-animation-components';


class Department extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            departments: this.props.departments,
            staffs: this.props.staffs,
        }
    }
    render() {
        const departments = this.state.departments.departments.map((department) => {
            return (
                <Fade in className="col-12 col-md-6 col-lg-4" key={department.id}>
                    <Card className="ml-2 mb-4 text-center bg-dark text-light border-light">
                        <Link to={`/departments/${department.id}`}>
                            <CardText className="m-3 text-warning">
                                {department.name} <br/>
                                Số lượng nhân viên: {department.numberOfStaff}
                            </CardText>
                        </Link>
                    </Card>
                </Fade>
            );
        });

        if (this.state.departments.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.state.departments.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{this.state.departments.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else
        return(
            <div className="container">
                <div className="row mt-5">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Departments</BreadcrumbItem>
                    </Breadcrumb>              
                </div>
                <div className="text-light">
                    <h3>Các phòng ban</h3>
                    <br/>
                </div>
                <div className="row mb-5">
                    {departments}
                </div>
            </div>
        );
    }
}

export default Department;    