import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';
import {getRedirectPath} from "../../../utils/utils";

const defaultState = fromJS({
    user: '',
    pwd: '',
    msg:'',
    type:'',
    redirectTo:false,
    payload:{}
});
export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_INPUT:
            return state.merge({
                [action.key]: action.val
            });
        case actionTypes.LOGIN_SUCCESS:
            // console.log(action.data.get('user'));
            localStorage.setItem('type',action.data.get('type'));
            localStorage.setItem('_id',action.data.get('_id'));
            return state.merge({
                user: action.data.get('user'),
                type: action.data.get('type'),
                redirectTo:getRedirectPath(action.data.toJS())
            });
        // case actionTypes.LOAD_DATA:
        //     return state.merge({
        //         payload:action.payload
        //     });
        case actionTypes.ERROR_MESSAGE:
            return state.merge({
                msg: action.msg,
            });
        default:
            return state;

    }
}