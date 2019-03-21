import * as actionTypes from './actionTypes';
import axios from 'axios';
import {fromJS} from 'immutable';

//internal action
const getErrorAction=(msg)=>({
    msg,
    type:actionTypes.ERROR_MESSAGE
})
const getSuccessAction=(data)=>({
    data:fromJS(data),
    type:actionTypes.REGISTER_SUCCESS
})

//normal action
export const getChangeInputAction=(key,val)=>({
    type:actionTypes.CHANGE_INPUT,
    key,
    val
});


//for redux-thunk's action
export const getRegisterAction=({user,pwd,verifyPWD,type})=>{
    if(pwd!==verifyPWD){
        return getErrorAction('Unmatched password')
    };
    if(!user||!pwd||!type||!verifyPWD){
        return getErrorAction('Insufficient Info')
    };
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                if(res.status==200&&res.data.code===0){
                    console.log(res.data);
                    //register successfully
                    // localStorage.setItem('userid',res.data._id);
                    dispatch(getSuccessAction({user,pwd,type}))
                }else{
                    dispatch(getErrorAction(res.data.msg));
                }
            })
    }

}