import React,{Component} from 'react';
import {NavBar,Button,InputItem,TextareaItem,WhiteSpace} from 'antd-mobile';
import AvatarSelector from '../../component/avatarSelector'
import {connect} from 'react-redux';
import {Redirect,Link} from 'react-router-dom';
import {actionCreators} from "./store";
import './style.less';
import axios from "axios/index";

class Genius extends Component{

    render(){
        const {
            objective, resume , redirectTo,avatarName,user,
            handleInputChange,handleSelectAvatar,handleSaveInfo
        }=this.props;
        const path=this.props.location.pathname;
        return(
            <div>
                {redirectTo&&redirectTo!==path?<Redirect to={redirectTo}/>:null}
                <NavBar
                    mode="dark"
                >Personal Settings</NavBar>
                <AvatarSelector
                selectAvatar={handleSelectAvatar}></AvatarSelector>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <InputItem onChange={val => handleInputChange('objective', val)} >
                    Objective
                </InputItem>
                <TextareaItem onChange={val => handleInputChange('resume', val)} title="Resume" autoHeight>
                </TextareaItem>
                <WhiteSpace/>
                <WhiteSpace/>
                <Button type="primary" onClick={()=>handleSaveInfo({objective,resume,avatarName,user})}>Save</Button>
            </div>
        )
    }
}
const mapState = (state) => ({
    objective: state.getIn(['geniusInfo', 'objective']),
    resume: state.getIn(['geniusInfo', 'resume']),
    redirectTo: state.getIn(['geniusInfo', 'redirectTo']),
    avatarName: state.getIn(['geniusInfo', 'avatarName']),
    user: state.getIn(['register', 'avatarName'])
})
const mapDispatch = (dispatch) => ({
    handleInputChange(key, val) {
        dispatch(actionCreators.getChangeInputAction(key, val));
    },
    handleSelectAvatar(imgName){
        dispatch(actionCreators.getSelectAvatarAction(imgName));
    },
    handleSaveInfo(data){
        dispatch(actionCreators.updateServerInfo(data));
    }

})
export default connect(mapState, mapDispatch)(Genius);
