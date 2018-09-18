import * as actionTypes from './actionTypes';
import axios from 'axios';
import {fromJS} from 'immutable';
import io from 'socket.io-client';

const chat = {};
chat.socket = io('ws://localhost:9093');

//normal action
export const getMsgRecvAction = (msg, userid) => ({
    type: actionTypes.MSG_RECV,
    payload: msg,
    userid
});
export const getMsgListAction = (msgs, users, userid) => ({
    type: actionTypes.MSG_LIST,
    payload: fromJS({msgs, users, userid})
});

export const getMsgReadAction = ({from, userid, num}) => ({
    type: actionTypes.MSG_READ,
    payload: fromJS({from, userid, num})
});


//for redux-thunk's action
export const getMsgList = () => {
    return (dispatch) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    if (res.data.msgs.length > 0)
                        dispatch(getMsgListAction(res.data.msgs, res.data.users, localStorage.getItem('_id')))
                } else {

                }
            })
    }
}
let timer=null;
// let count=0;
export const recvMsg = () => {
    return dispatch => {
        chat.socket.on('recvMsg', function (data) {
            if(typeof timer ==='number'){clearTimeout(timer) ;console.log('clearTimer')};
            timer=setTimeout(function(){
                console.log('recvMsg', 'x');
                dispatch(getMsgRecvAction(data, localStorage.getItem('_id')));
                if(document.documentElement.scrollTop){
                    document.documentElement.scrollTop=document.documentElement.scrollTop+45;}
                else{
                    window.pageYOffset=window.pageYOffset+45;//safari
                }
            },100)

        });
    }
};
export const sendMsg = ({from, to, msg}) => {
    return dispatch => {
        chat.socket.emit('sendMsg', {from, to, msg});
    }
};

export const readMsg = (from) => {
    return dispatch => {
        // console.log(from);
        axios.post('/user/readmsg', {from})
            .then(res => {
                console.log(from);
                    const userid = localStorage.getItem('_id');
                    if (res.status === 200 && res.data.code === 0) {
                        dispatch(getMsgReadAction({from , userid , num:res.data.num}));
                    }
                }
            )
    }
};
