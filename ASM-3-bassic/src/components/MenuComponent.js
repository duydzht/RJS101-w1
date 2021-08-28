import React, { Component } from 'react';
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, Form, FormGroup, Input, Button, Label,
    Modal, ModalHeader, ModalBody, Col,FormFeedback } from 'reactstrap';
import {Link} from 'react-router-dom';
import { DEPARTMENTS } from '../shared/staffs';



class Menu extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            staffs: this.props.staffs,
            name:'',
            isModalOpen: false,
            fullname:'',
            dob:'',
            startDate:'',
            department:'',
            salaryScale:'',
            annualLeave:'',
            overTime:'',
            touched: {
                fullname:false,
                salaryScale: false,
                annualLeave: false,
                overTime: false,
            }
        }
        this.searchName = this.searchName.bind(this);
        this.handleInputChanged = this.handleInputChanged.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    // phương thức lọc input value trong staffs nhận value cả chữ hoa và chữ thường
    searchName(event) {
        const result = this.props.staffs.filter(s => s.name.toLowerCase().match(this.state.name));
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
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState ({
            [name]:value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const department = DEPARTMENTS.find(department => department.id === this.state.department);
        const newStaff = {

            id:this.props.staffs.length,
            name: this.state.fullname,
            doB: this.state.dob,
            salaryScale: this.state.salaryScale,
            startDate: this.state.startDate,
            department: department,
            annualLeave: this.state.annualLeave,
            overTime: this.state.overTime,
            image: '/assets/images/alberto.png',
            
        };
        const newStaffs = [...this.props.staffs, ...[newStaff]];
        alert("Thêm nhân viên " + newStaff.name + " thành công!");
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

    handleBlur=(field)=>(evt)=>{
        this.setState ({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(fullname, salaryScale, annualLeave, overTime){
        const errors = {
            fullname:'',
            salaryScale: '',
            annualLeave: '',
            overTime: '',
        };
        //validate tên
        if(this.state.touched.fullname && fullname.length < 5)
            errors.fullname = 'Vui lòng nhập họ tên đầy đủ (tối thiểu 5 kí tự)';
        else if(this.state.touched.fullname && fullname.length >30)
            errors.fullname = 'Tên của bạn không dài quá 30 kí tự';

        //valid hệ số lương
        if(this.state.touched.salaryScale && salaryScale.length > 3)
            errors.salaryScale = 'Hệ số không nhiều hơn 3 kí tự';
        else if(this.state.touched.salaryScale  && salaryScale.split('').filter(x => x==='.').length !==1)
            errors.salaryScale = 'Hệ số lương của bạn phải có dấu chấm ở giữa (ví dụ 1.5)';
        else if(this.state.touched.salaryScale && salaryScale > 3.0 || salaryScale < 0.0)
            errors.salaryScale = 'Hệ số lương phải từ 0.1 đến 3.0';

        //valid số ngày nghỉ còn lại
        if(this.state.touched.annualLeave && annualLeave.length > 3)
            errors.annualLeave = 'Số ngày nghỉ không nhiều hơn 3 kí tự';
        else if(this.state.touched.annualLeave  && annualLeave.split('').filter(x => x==='.').length !==1)
            errors.annualLeave = 'Số ngày nghỉ của bạn phải có dấu chấm ở giữa (ví dụ 1.5)';

        // valid số ngày làm thêm
        if(this.state.touched.overTime && overTime.length > 3)
            errors.overTime = 'Số ngày làm thêm không nhiều hơn 3 kí tự';
        else if(this.state.touched.overTime  && overTime.split('').filter(x => x==='.').length !==1)
            errors.overTime = 'Số ngày làm thêm của bạn phải có dấu chấm ở giữa (ví dụ 1.5)';

        return errors;

    }

    render() {
        const errors = this.validate(this.state.fullname, this.state.salaryScale, this.state.annualLeave, this.state.overTime);

        

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
                        <Button onClick={this.toggleModal}>
                            <span className="fa fa-plus-square"></span>
                        </Button>
                        <hr />
                    </div>
                </div>
                <Form onSubmit={this.searchName}>
                    <FormGroup>
                        <Input className="form-control mb-3" type="text" id="search" name="search"  
                            placeholder='Nhập tên nhân viên muốn tìm'
                            onChange={this.handleInputChanged}
                            innerRef = {(input) => this.name = input}  />
                    </FormGroup>
                    <Button type="submit" value="submit" color="primary" className="mb-2"> Tìm </Button>
                </Form>

                <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal} >
                    <ModalHeader toggle = {this.toggleModal}>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                        <div className="row row-content">
                            <div className="col-12 text-center">
                                <h3>Vui lòng điền chính xác và đầy đủ thông tin vào form sau:</h3>
                            </div>
                            <div className="col-12">
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup row>
                                        <Label htmlFor="fullname" md={3}>Họ Tên</Label>
                                        <Col md={9}>
                                            <Input type="text" id="fullname" name="fullname" placeholder="từ 5 - 30 kí tự"
                                                value = {this.state.fullname}
                                                valid = {errors.fullname === ''}
                                                invalid = {errors.fullname !== ''}
                                                onBlur={this.handleBlur('fullname')}
                                                onChange={this.handleInputChange} />
                                            <FormFeedback>{errors.fullname}</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="dob" md={3}>Ngày sinh</Label>
                                        <Col md={9}>
                                            <Input type="date" id="dob" name="dob" 
                                                value = {this.state.dob}
                                                onChange={this.handleInputChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="startDate" md={3}>Ngày vào</Label>
                                        <Col md={9}>
                                            <Input type="date" id="startDate" name="startDate" 
                                                value = {this.state.startDate}
                                                onChange={this.handleInputChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="department" md={3}>Bộ phận</Label>
                                        <Col md={9}>
                                            <Input type="select" id="department" name="department" 
                                                value={this.state.department}
                                                onChange={this.handleInputChange} >
                                                <option value="Dept01" selected>Sale</option>
                                                <option value="Dept02">HR</option>
                                                <option value="Dept03">Marketing</option>
                                                <option value="Dept04">IT</option>
                                                <option value="Dept05">Finance</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="salaryScale" md={3}>Hệ số lương</Label>
                                        <Col md={9}>
                                            <Input type="number" id="salaryScale" name="salaryScale" placeholder="1.0 -> 3.0"
                                                value = {this.state.salaryScale}
                                                valid = {errors.salaryScale === ''}
                                                invalid = {errors.salaryScale !== ''}
                                                onBlur={this.handleBlur('salaryScale')}
                                                onChange={this.handleInputChange} />
                                            <FormFeedback>{errors.salaryScale}</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="annualLeave" md={3}>Ngày nghỉ còn lại</Label>
                                        <Col md={9}>
                                            <Input type="number" id="annualLeave" name="annualLeave" placeholder="ex: 1.5"
                                                value = {this.state.annualLeave}
                                                valid = {errors.annualLeave === ''}
                                                invalid = {errors.annualLeave !== ''}
                                                onBlur={this.handleBlur('annualLeave')}
                                                onChange={this.handleInputChange} />
                                            <FormFeedback>{errors.annualLeave}</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="overTime" md={3}>Số ngày làm thêm</Label>
                                        <Col md={9}>
                                            <Input type="number" id="overTime" name="overTime" placeholder="ex: 1.5"
                                                value = {this.state.overTime}
                                                valid = {errors.overTime === ''}
                                                invalid = {errors.overTime !== ''}
                                                onBlur={this.handleBlur('overTime')}
                                                onChange={this.handleInputChange} />
                                            <FormFeedback>{errors.overTime}</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={{size:10}}>
                                            <Button type="submit" color="primary">
                                                Thêm
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
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