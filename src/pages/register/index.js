import React from 'react';
import Logo from '../../component/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {ErrorMSG} from "./style";

//stateless component
const Register=(props)=> {
        const RadioItem = Radio.RadioItem;
        const {
            type,pwd, verifyPWD, msg, user,redirectTo,
            handleInputChange, handleRegister } = props;
        return (
            <div>
                {redirectTo?<Redirect to={redirectTo}/>:null}
                <Logo/>
                <h2 className="sign-title">Register</h2>
                <WingBlank>
                    {msg?<ErrorMSG className="error-message">{msg}</ErrorMSG>:null}
                    <List>
                        <InputItem
                            onChange={val => handleInputChange('user', val)}>Username</InputItem>
                        <InputItem type="password"
                                   onChange={val => handleInputChange('pwd', val)}>Password</InputItem>
                        <InputItem type="password"
                                   onChange={val => handleInputChange('verifyPWD', val)}>Verify PWD</InputItem>
                    </List>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <List>
                        <RadioItem
                            onChange={() => handleInputChange('type', 'Genius')}
                            checked={type === 'Genius'}>Genius</RadioItem>
                        <RadioItem
                            onChange={() => handleInputChange('type', 'Boss')}
                            checked={type === 'Boss'}>Boss</RadioItem>
                    </List>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button type="primary"
                            onClick={() => handleRegister({ user,type,pwd, verifyPWD})}>Register</Button>

                </WingBlank>
            </div>
        )
    }


const mapState = (state) => ({
    type: state.getIn(['register', 'type']),
    user: state.getIn(['register', 'user']),
    pwd: state.getIn(['register', 'pwd']),
    verifyPWD: state.getIn(['register', 'verifyPWD']),
    msg: state.getIn(['register', 'msg']),
    isAuth: state.getIn(['register', 'isAuth']),
    redirectTo: state.getIn(['register', 'redirectTo']),

})
const mapDispatch = (dispatch) => ({
    handleInputChange(key, val) {
        dispatch(actionCreators.getChangeInputAction(key, val));
    },
    handleRegister(data) {
        dispatch(actionCreators.getRegisterAction(data))
    }
})
export default connect(mapState, mapDispatch)(Register);