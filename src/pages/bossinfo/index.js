import React,{Component} from 'react';
import {NavBar,Button,InputItem,TextareaItem,WhiteSpace} from 'antd-mobile';
import AvatarSelector from '../../component/avatarSelector'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {actionCreators} from "./store";
import './style.less';

class BossInfo extends Component{

    render(){
        const {
            avatarName, vacancy, company,salary, requirement, desc,redirectTo,
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
                <InputItem onChange={val => handleInputChange('vacancy', val)} >
                    Vacancy
                </InputItem>
                <InputItem onChange={val => handleInputChange('company', val)} >
                    Company
                </InputItem>
                <InputItem onChange={val => handleInputChange('salary', val)} >
                    Salary
                </InputItem>
                <InputItem onChange={val => handleInputChange('requirement', val)} >
                    Requirement
                </InputItem>
                <TextareaItem onChange={val => handleInputChange('desc', val)} title="Description" autoHeight>
                </TextareaItem>
                <WhiteSpace/>
                <WhiteSpace/>
                <Button type="primary" onClick={()=>handleSaveInfo({avatarName, vacancy, company, requirement, desc,salary})}>Save</Button>
            </div>
        )
    }
}
const mapState = (state) => ({
    avatar: state.getIn(['bossInfo', 'avatar']),
    vacancy: state.getIn(['bossInfo', 'vacancy']),
    avatarName: state.getIn(['bossInfo', 'avatarName']),
    company: state.getIn(['bossInfo', 'company']),
    salary: state.getIn(['bossInfo', 'salary']),
    requirement: state.getIn(['bossInfo', 'requirement']),
    desc: state.getIn(['bossInfo', 'desc']),
    redirectTo: state.getIn(['bossInfo', 'redirectTo'])
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
export default connect(mapState, mapDispatch)(BossInfo);
