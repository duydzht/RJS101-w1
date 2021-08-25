import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card} from 'reactstrap';
import { Link } from 'react-router-dom';

function Department(props) {

    const departments = props.department.map((department) => {
        return (
            <Card className="col-12 col-md-6 col-lg-4 mb-2 text-center bg-info text-light border-light">
                <h4>{department.name}</h4>
                <p>Số lượng nhân viên: {department.numberOfStaff}</p>
            </Card>
        );
    });
    

    return(
        <div className="container">
            <div className="row">
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

export default Department;    