import React, { Component }  from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import dateFormat from 'dateformat'; 




class Menu extends Component {

    //khởi tạo this 
    constructor(props) {
        super(props);
        this.state = {
            clickStaff: null,
            columSet: "col-sm-12 col-md-6 col-lg-4 pb-2 pt-2 text-center",
        };
    }
    //Chuyển chế độ xem 2 cột
    onDownClick(){
        this.setState({ columSet: "col-sm-12 col-md-6 col-lg-6 p-3 text-center"});
    }
    //chế độ xem 3 cột
    onMidClick(){
        this.setState({ columSet: "col-sm-12 col-md-4 col-lg-4 p-3 text-center"});
    }
    //chế độ xem 4 cột
    onUpClick(){
        this.setState({ columSet: "col-sm-12 col-md-3 col-lg-3 p-3 text-center"});
    }
    //hàm onclick vào card (tên nhân viên) sẽ thay đổi giá trị null của clickStaff để nhận tham số staff
    onStaffClick(staff){
        this.setState({clickStaff: staff});
    }
    //render giá trị staff khi được click
    renderStaff(staff){
        if (staff != null){
            return (
                <Card className="col-sm-12 col-md-6 col-lg-4 ml-3 bg-dark text-light">
                    <CardBody>
                        <CardTitle>{staff.name}</CardTitle>
                        <CardText>
                            Day of Birth: {dateFormat(staff.doB, "dd/mm/yyyy h:MM TT")}
                            <br />
                            Start of Date: {dateFormat(staff.startDate, "dd/mm/yyyy h:MM TT")}
                            <br />
                            Department: {staff.department.name}
                            <br />
                            Annual Leave: {staff.annualLeave}
                            <br />
                            OverTime: {staff.overTime}
                        </CardText>
                    </CardBody>
                </Card>
            );
        }else{
            return (
                <div>
                </div>
            );
        }
    }


    
    //render ra tên nhân viên
    render() {
        
        const menu = this.props.member.map((staff) => {
            return(
                <div className={this.state.columSet}>
                    <div key={staff.id}>
                        <Card className="btn btn-warning border-info" onClick={()=>this.onStaffClick(staff)}>
                            <CardTitle className="text-black">{staff.name}</CardTitle>
                        </Card>
                    </div>
                </div>
            );
        });
        return ( 
            
            <div className = "container" >
                <div>
                    <p className = "text-white ">Đổi chế độ xem:</p>
                    <button className = "btn btn-info ml-2"onClick={()=>this.onDownClick()}>2 Cột</button>
                    <button className = "btn btn-success ml-2"onClick={()=>this.onMidClick()}>3 Cột</button>
                    <button className = "btn btn-danger ml-2"onClick={()=>this.onUpClick()}>4 Cột</button>
                </div>
                <div className = "row">
                    {menu}
                </div>
                <p className="col-sm-12 col-md-6 col-lg-4 pt-2 text-warning">Nhấp vào nhân viên để xem thêm thông tin!</p>
                <div className = "row">
                    {this.renderStaff(this.state.clickStaff)}
                </div>
            </div>
        );
    }
    
}

export default Menu;