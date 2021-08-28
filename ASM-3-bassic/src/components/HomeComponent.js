import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';


function Home(props) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md-4 text-light">
                    <img src="assets/images/logo.png" height="300" width="400" alt="Ristorante Con Fusion"/>
                </div>
                <div className="col-12 col-md-8 mt-5" style={{color: "#2EFEF7"}}>
                    <h2 style={{fontSize: "45px"}}><b><i>Chào mừng đến với phần mềm quản lý nhân sự công ty TNHH...</i></b></h2>
                </div>
                <div className="col-12 col-md-8 mt-5 bg-info border border-light rounded">
                    <h3 className="text-white pt-3"><b>Bạn có biết?</b></h3>
                    <h5 className="text-warning p-4">
                        <i>
                            Làm việc nỗ lực là bạn đang xây dựng kỹ năng cho bản thân. Không có gì bạn học tập và tìm 
                            hiểu được là lãng phí cả. Bất kể mối quan hệ, kiến thức, ấn tượng hay kỹ năng gì mà chúng ta xây 
                            dượng nên, sẽ chỉ thuộc về chúng ta và không ai có thể lấy đi điều đó. Tóm lại, làm việc nỗ lực 
                            sẽ mang lại rất nhiều điều tốt đẹp cho chính bản thân chúng ta.<br/>
                            Vì vậy, hãy không ngừng lỗ lực cả trong công việc lẫn cuộc sống!
                        </i>
                    </h5>
                </div>
                <div className="col-12 col-md-4 mb-4 mt-5">
                    <img className="rounded" src="http://bit.vn/uploadkc/images/nga-tintuc/anthardworkimages.jpg" width="400px" height="260px" alt="example"/>
                </div>
            </div>
        </div>
    );
}

export default Home;