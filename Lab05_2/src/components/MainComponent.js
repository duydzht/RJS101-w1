import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
//import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
        };
    }

    render() {
        const HomePage = () => {
            return (
                <Home/>
            );
        }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    {/* HomePage trả về kết quả <Home/> quy định ở trên */}
                    <Route exact path="/menu" component={() => <Menu dishes = {this.state.dishes}/>} />
                    <Redirect to="/home" />
                    {/* khi các link không có đích đến nó sẽ dẫn về home */}
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default Main;