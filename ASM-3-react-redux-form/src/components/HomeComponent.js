import React from 'react';
//import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';


function Home(props) {
    return ( 
        <div className = "container" >
            <div className = "row align-items-start" >
                <div className = "col-12 col-md-4 text-light" >
                    <img src = "assets/images/logo.png" height = "300" width = "400" alt = "Ristorante Con Fusion" />
                </div>
                <div className = "col-12 col-md-8 mt-5" style = {{ color: "#2EFEF7", marginBottom:"400px"}}>
                    <h2 style = {{ fontSize: "45px" }}> <b> <i> Chào mừng đến với phần mềm quản lý nhân sự công ty TNHH... </i></b> </h2> 
                </div>
            </div>
        </div> 
        
    );
        
}

export default Home;