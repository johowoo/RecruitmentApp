import React, {Component} from 'react';
import Logo from '../../component/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {LoginTitleWrapper, LoginWrapper,ErrorMSG} from './style';
import {actionCreators} from "./store";


class Login extends Component {
    render() {
        const {
            pwd, user,msg,
            handleInputChange,handleLogin,redirectTo,
            history
        } = this.props;
        return (
            <LoginWrapper>
                {redirectTo?<Redirect to={redirectTo}/>:null}
                <Logo/>
                <LoginTitleWrapper>
                    <h2 className="sign-title">Login</h2>
                </LoginTitleWrapper>
                <WingBlank>
                    {msg?<ErrorMSG className="error-message">{msg}</ErrorMSG>:null}
                    <List>
                        <InputItem onChange={val => handleInputChange('user', val)}>Username</InputItem>
                        <InputItem type="password" onChange={val => handleInputChange('pwd', val)}>Password</InputItem>
                    </List>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button type="primary" onClick={()=>handleLogin({user,pwd})}>Login</Button>
                    <WhiteSpace/>
                    {/*<Link to="/register">*/}
                    <Button type="primary" onClick={()=>history.push('/register')}>Register</Button>
                    {/*</Link>*/}
                </WingBlank>
            </LoginWrapper>
        )
    }


}

const mapState = (state) => ({
    user: state.getIn(['login', 'user']),
    msg: state.getIn(['login', 'msg']),
    pwd: state.getIn(['login', 'pwd']),
    redirectTo: state.getIn(['login', 'redirectTo']),

})
const mapDispatch = (dispatch) => ({
    handleInputChange(key, val) {
        dispatch(actionCreators.getChangeInputAction(key, val));
    },
    handleLogin(data){
        console.log('abc');
        dispatch(actionCreators.getLoginAction(data));
    }
})
export default connect(mapState, mapDispatch)(Login);
