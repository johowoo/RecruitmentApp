import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';
// import {getRedirectPath} from "../../../utils/utils";

const defaultState = fromJS({
    vacancy: '',
    company: '',
    requirement: '',
    salary: '',
    desc: '',
    avatarName: '',
    avatarEle: '',
    redirectTo: ''
});
export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_INPUT:
            return state.merge({
                [action.key]: action.val
            });
        case actionTypes.SELECT_AVATAR:
            return state.merge({
                avatarName: action.avatar,
                avatarEle: action.avatarEle
            });
        case actionTypes.UPDATE_SETTING:
            return state.merge({
                redirectTo: '/commonlist'
            });
        default:
            return state;

    }
}