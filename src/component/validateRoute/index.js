import React, {Component} from 'react';
// import {LogoContainer}from './style';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class ValidateRoute extends Component {
    componentDidMount() {
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;

        //Tell if it's the login or register page
        //True:don't bother
        if (publicList.indexOf(pathname) > -1) {
            return null;
        }
        //False:continue
        //Get information of the user
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                //If login information exists
                if (res.data.code === 0) {
                    // console.log(res.data.data._id);
                    localStorage.setItem('_id',res.data.data._id);
                    // this.props.loadData(res.data.data);
                } else {
                    this.props.history.push('/login');
                }
            }
        })
    }

    render() {
        return (
            <div>
                {/*validation*/}
            </div>
        )
    }
}

export default withRouter(ValidateRoute);