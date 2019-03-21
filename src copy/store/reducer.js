import {combineReducers} from 'redux-immutable';
import {reducer as registerReducer} from '../pages/register/store/index';
import {reducer as loginReducer} from '../pages/login/store/index';
import {reducer as bossInfoReducer} from '../pages/bossinfo/store/index';
import {reducer as geniusInfoReducer} from '../pages/geniusinfo/store/index';
import {reducer as chatReducer} from '../component/chat/store/index';
export default combineReducers({
    register:registerReducer,
    login:loginReducer,
    bossInfo:bossInfoReducer,
    geniusInfo:geniusInfoReducer,
    chat:chatReducer
})
