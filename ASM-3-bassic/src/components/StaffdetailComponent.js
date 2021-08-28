import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';



function RenderStaff({staff}) {
    if (staff != null) {
        return(
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 col-md-4 col-lg-3">
                        <img width="100%" height="280px" src={staff.image} alt={staff.name} />
                    </div>
                    <div className="col-12 col-md-8 col-lg-9 text-warning bg-success rounded">
                        <h5 className="mt-2 text-light">Họ và Tên: {staff.name}</h5>
                        <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy h:MM TT")}</p>
                        <p>Hệ số lương: {staff.salaryScale}</p>
                        <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy h:MM TT")}</p>
                        <p>Bộ phận: {staff.department.name}</p>
                        <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                        <p>Số ngày làm thêm: {staff.overTime}</p>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        )
    }
}

const  StaffDetail = (props) => {
    if (props.staff != null)
        return (
            <div className="container">
                <div className="row text-light">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.staff.name}</h3>
                        <hr />
                    </div>
                </div>
                <div>
                    <RenderStaff staff = {props.staff}/>
                </div>
            </div>
        )
    else
        return (
            <div></div>
        );
} 

export default StaffDetail;