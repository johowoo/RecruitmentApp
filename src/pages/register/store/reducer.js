import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';
import {getRedirectPath} from "../../../utils/utils";

const defaultState = fromJS({
    redirectTo: '',
    user: '',
    pwd: '',
    verifyPWD: '',
    type: '',
    msg: '',
    isAuth: false

});
export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_INPUT:
            return state.merge({
                [action.key]: action.val
            });
        case actionTypes.REGISTER_SUCCESS:
            localStorage.setItem('type',action.data.get('type'));
            localStorage.setItem('_id',action.data.get('_id'));
            return state.merge({
                msg: '',
                isAuth: true,
                ...action.data,
                redirectTo: getRedirectPath(action.data.toJS())
            });
        case actionTypes.ERROR_MESSAGE:
            return state.merge({
                msg: action.msg,
                isAuth: false,
            });
        default:
            return state;
    }
}