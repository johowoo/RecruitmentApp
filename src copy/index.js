import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import store from './store/index';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Login from './pages/login';
import Register from './pages/register';
import BossInfo from './pages/bossinfo';
import GeniusInfo from './pages/geniusinfo';
import Dashboard from './pages/dashboard';
import ValidateRoute from './component/validateRoute';
import Chat from './component/chat';
import './style/globalStyle';
import './assets/iconfont/iconfont';
//
// const Chat=()=>(
//    <h2>Chat</h2>
// )
ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment>
                    <ValidateRoute></ValidateRoute>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/boss/info" component={BossInfo}/>
                        <Route path="/genius/info" component={GeniusInfo}/>
                        <Route path="/chat/:user" component={Chat}/>
                        <Route component={Dashboard}/>
                    </Switch>

                </Fragment>
            </BrowserRouter>
        </Provider>
    )
    ,
    document.getElementById('root'));
