import React, { Component } from 'react';
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, Button, Label,
    Modal, ModalHeader, ModalBody, Col, Form, FormGroup, Input, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import { DEPARTMENTS } from '../shared/staffs';
import { Control, LocalForm, Errors} from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validScale = (val) => /^[0-9]+\.[0-9]+$/i.test(val);

class Menu extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            staffs: this.props.staffs,
            name:'',
            isModalOpen: false,
            
        }
        this.searchName = this.searchName.bind(this);
        this.handleInputChanged = this.handleInputChanged.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // phương thức lọc input value trong staffs nhận value cả chữ hoa và chữ thường
    searchName(event) {
        const result = this.props.staffs.filter(s => s.name.toLowerCase().match(this.state.name.toLowerCase()));
        this.setState({
            staffs: result,
            name: this.name.value
        });
        event.preventDefault();
    }

    //khi input có value ngay lập tức sẽ truyền vào name
    //sử dụng cho nút tìm kiếm
    handleInputChanged(event) {
        this.setState({
        name: event.target.value
        });
    }
    
    // dùng khi thêm nhân viên

    handleSubmit(values) {

        const department = DEPARTMENTS.find(department => department.id === values.department);
        const newStaff = {

            id:this.props.staffs.length,
            name: values.fullname,
            doB: values.dob,
            salaryScale: values.salaryScale,
            startDate: values.startDate,
            department: department,
            annualLeave: values.annualLeave,
            overTime: values.overTime,
            image: '/assets/images/alberto.png',
            
        };
        const newStaffs = [...this.props.staffs, ...[newStaff]];
        alert("Thêm nhân viên " + newStaff.name + " thành công!");
        // alert(JSON.stringify(values));
        this.setState({
            staffs: newStaffs
        })
        this.props.onAddStaff(newStaffs)
    }

    toggleModal(){
        this.setState ({
            isModalOpen: !this.state.isModalOpen,
        })
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
                        <Button onClick={this.toggleModal} >
                            <span className="fa fa-plus-square"> Thêm nhân viên</span>
                        </Button>
                        <hr />
                    </div>
                </div>
                <Form onSubmit={this.searchName} className="row">
                    <FormGroup md={6}>
                        <Input className="form-control mb-3" type="text" id="search" name="search"  
                            placeholder='Nhập tên nhân viên muốn tìm'
                            onChange={this.handleInputChanged}
                            innerRef = {(input) => this.name = input}  />
                    </FormGroup>
                    <Button md={3} type="submit" value="submit" color="primary" className="mb-5 ml-3"> Tìm </Button>
                </Form>

                <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal} >
                    <ModalHeader toggle = {this.toggleModal}>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                        <div className="row row-content">
                            <div className="col-12 text-center">
                                <h3>Vui lòng điền chính xác và đầy đủ thông tin vào form sau:</h3>
                            </div>
                            <div className="col-12">
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Label htmlFor="fullname" md={3}>Họ Tên</Label>
                                        <Col md={9}>
                                            <Control.text model=".fullname" id="fullname" name="fullname" placeholder="từ 5 - 30 kí tự"
                                                className="form-control"
                                                validators={{
                                                    required, minLength: minLength(5), maxLength: maxLength(30)
                                                }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".fullname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Không được để trống. ',
                                                        minLength: 'Họ tên tối thiểu 5 kí tự',
                                                        maxLength: 'Họ tên bạn không dài quá 30 kí tự',
                                                    }}
                                                />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="dob" md={3}>Ngày sinh</Label>
                                        <Col md={9}>
                                            <Control.text type="date" model=".dob" id="dob" name="dob" 
                                                className="form-control"
                                                validators={{
                                                    required,
                                                }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".dob"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Không được để trống. ',
                                                    }}
                                                />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="startDate" md={3}>Ngày vào</Label>
                                        <Col md={9}>
                                            <Control.text type="date" model=".startDate" id="startDate" name="startDate" 
                                                className="form-control"
                                                validators={{
                                                    required
                                                }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".startDate"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Không được để trống. ',
                                                    }}
                                                />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="department" md={3}>Bộ phận</Label>
                                        <Col md={9}>
                                            <Control.select model=".department" id="department" name="department" 
                                                className="form-control"
                                                >
                                                <option value="Dept01" selected>Sale</option>
                                                <option value="Dept02">HR</option>
                                                <option value="Dept03">Marketing</option>
                                                <option value="Dept04">IT</option>
                                                <option value="Dept05">Finance</option>
                                            </Control.select>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="salaryScale" md={3}>Hệ số lương</Label>
                                        <Col md={9}>
                                            <Control.text model=".salaryScale" id="salaryScale" name="salaryScale" placeholder="1.0 -> 3.0"
                                                className="form-control"
                                                validators={{
                                                    required, maxLength: maxLength(3), isNumber, validScale
                                                }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".salaryScale"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Không được để trống. ',
                                                        maxLength: 'Hệ số lương không dài quá 3 kí tự. ',
                                                        isNumber: 'Bắt buộc phải là số. ',
                                                        validScale: 'Hệ số phải chứa dấu chấm giữa 2 số(ví dụ 1.5)'
                                                    }}
                                                />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="annualLeave" md={3}>Ngày nghỉ còn lại</Label>
                                        <Col md={9}>
                                            <Control.text model=".annualLeave" id="annualLeave" name="annualLeave" placeholder="ex: 1.5"
                                                className="form-control"
                                                validators={{
                                                    required, maxLength: maxLength(3), isNumber, validScale
                                                }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".annualLeave"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Không được để trống. ',
                                                        maxLength: 'Số ngày nghỉ phép không dài quá 3 kí tự',
                                                        isNumber: 'Bắt buộc phải là số',
                                                        validScale: 'Hệ số phải chứa dấu chấm giữa 2 số(ví dụ 1.5)'
                                                    }}
                                                />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="overTime" md={3}>Số ngày làm thêm</Label>
                                        <Col md={9}>
                                            <Control.text model=".overTime" id="overTime" name="overTime" placeholder="ex: 1.5"
                                                className="form-control"
                                                validators={{
                                                    required, maxLength: maxLength(3), isNumber, validScale
                                                }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".overTime"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Không được để trống. ',
                                                        maxLength: 'Số ngày nghỉ phép không dài quá 3 kí tự',
                                                        isNumber: 'Bắt buộc phải là số',
                                                        validScale: 'Hệ số phải chứa dấu chấm giữa 2 số(ví dụ 1.5)'
                                                    }}
                                                />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={{size:10}}>
                                            <Button type="submit" color="primary">
                                                Thêm
                                            </Button>
                                        </Col>
                                    </Row>
                                </LocalForm>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}

export default Menu;
