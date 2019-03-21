import * as actionTypes from './actionTypes';
import axios from 'axios';

//internal action

const getUpdateSuccessAction=()=>({
    type:actionTypes.UPDATE_SETTING
})

//normal action
export const getChangeInputAction = (key, val) => ({
    type: actionTypes.CHANGE_INPUT,
    key,
    val
});

export const getSelectAvatarAction = (avatarEle, imgName) => ({
    type: actionTypes.SELECT_AVATAR,
    avatar: imgName,
    avatarEle
});

//async action

export const updateServerInfo = (data) => (dispatch=>{
    console.log(data);
    axios.post('/user/update',data)
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                //update settings successfully
                dispatch(getUpdateSuccessAction());
            }
        })
})


