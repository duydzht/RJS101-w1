import React, { Component, PropTypes } from 'react';
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';



class Menu extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            staffs: this.props.staffs,
            name:'',
            typing: false,
            typingTimeout: 0
        }
        this.searchName = this.searchName.bind(this);
    }
    // phương thức includes kiểm tra input value có nằm trong staffs hay không rồi lọc bằng filter cho ra kết quả khớp
    search = () => {
        const result = this.props.staffs.filter(s => s.name.includes(this.state.name))
        this.setState({ staffs: result })
    }
    // xét validate input và chạy hàm tìm kiếm sau khi người dùng ngừng gõ trong 2 giây
    searchName = (event) => {
        const self = this; //không dùng this vì sẽ bị lẫn với this trên
            if (self.state.typingTimeout) {
                clearTimeout(self.state.typingTimeout);
            }
        
        this.setState({
            name: event.target.value,
            typing: false,
            typingTimeout: setTimeout(function () {
                self.search();
            }, 2000)
        });
        }
    

    render() {
        const RenderMenuItem = ({staff}) => {
            return (
                <Card>
                    <Link to={`/menu/${staff.id}`}>
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                        <CardTitle className="text-center">{staff.name}</CardTitle>
                    </Link>
                </Card>
            );
        }

        const menu = this.state.staffs.map((staff) => {
            return (
                <div className="col-6 col-md-4 col-lg-2 mb-2"  key={staff.id}>
                    <RenderMenuItem staff={staff} />
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Staffs List</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12 text-white">
                        <h3>Danh sách nhân viên</h3>
                        <hr />
                        <input className="form-control mb-3 col-md-4" type="text"  placeholder='Tìm tên nhân viên.'  onChange={this.searchName} />
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}

export default Menu;