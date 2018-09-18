import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    chatMsg: [],
    unread: 0,
    users:''
});

export default (state = defaultState, action) => {
    let len=state.get('chatMsg').size;

    switch (action.type) {
        case actionTypes.MSG_LIST:
            let jsPayload=action.payload.toJS();
            return state.merge({
                chatMsg: fromJS([state.get('chatMsg')?state.get('chatMsg'):null,...action.payload.get('msgs').toJS()]),
                users:fromJS(jsPayload.users),
                unread:jsPayload.msgs.filter(v=>!v.read&&v.to===jsPayload.userid).length,
            });
        case actionTypes.MSG_READ:
            const {from} =action.payload.toJS();
            return state.merge({
                chatMsg:state.toJS().chatMsg.map(v=>({...v,read:from===v.from?true:v.read})),
                unread:state.get('unread')-action.payload.get('num')
            });
        case actionTypes.MSG_RECV:
            const n=action.payload.to===action.userid?1:0
            return state.merge({
                chatMsg:state.get('chatMsg').insert(len,action.payload),
                unread:state.get('unread')+n
            });
        default:
            return state;

    }
}