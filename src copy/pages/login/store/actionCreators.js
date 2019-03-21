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
    type:actionTypes.LOGIN_SUCCESS
})

//normal action
export const getChangeInputAction=(key,val)=>({
    type:actionTypes.CHANGE_INPUT,
    key,
    val
});


//for redux-thunk's action
export const getLoginAction=({user,pwd})=>{
    if(!user||!pwd){
        return getErrorAction('Insufficient Info')
    };
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if(res.status==200&&res.data.code===0){
                    //login successfully
                    console.log(res.data);
                    dispatch(getSuccessAction({...res.data.data,pageType:'login'}))
                }else{
                    dispatch(getErrorAction(res.data.msg));
                }
            })
    }
}
