import React, {Component} from 'react';
import {NavBar} from 'antd-mobile';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import NavLinkBar from '../../component/navlinkbar';
import Boss from '../../component/commonlist';
import Genius from '../../component/commonlist';
import Personal from '../../component/personal';
import Msg from '../../component/msg';
import {Redirect} from 'react-router-dom'
import {actionCreators} from '../../component/chat/store';
import QueueAnim from 'rc-queue-anim';

class Dashboard extends Component {
    componentDidMount() {
        if (!this.props.chatMsg.length ) {
            this.props.sendMsgListRequest();
            this.props.recvMsgRequest();
        }
    }

    componentDidCatch() {
        this.props.history.push('/login');
    }

    render() {
        const {pathname} = this.props.location;
        const navList = [
            {
                path: '/boss',
                text: 'Boss',
                icon: 'boss',
                title: 'Genius List',
                component: Boss,
                hide: localStorage.getItem('type') === 'Genius'
            }, {
                path: '/genius',
                text: 'Job',
                icon: 'genius',
                title: 'Job List',
                component: Genius,
                hide: localStorage.getItem('type') === 'Boss'
            }, {
                path: '/msg',
                text: 'Message',
                icon: 'msg',
                title: 'Message List',
                component: Msg,

            }, {
                path: '/personal',
                text: 'personal',
                icon: 'personal',
                title: 'Personal',
                component: Personal,
            },

        ];
        // const page = navList.find(v => v.path === pathname);
        let title = navList.find(v => v.path === pathname) ? navList.find(v => v.path === pathname).title : '';
        const page = navList.find(v => v.path === pathname);
        // page?this.props.history.push('/login'):null;
        return (
            page?(<div>
                <NavBar mode="dark" className="fixed-header">
                    {title}
                </NavBar>
                <div style={{margin: '45px 0'}}>
                    <Switch>
                        {/*{navList.map(item => (*/}
                        {/*//only one route can be wrapped in QueueAnim*/}
                        <QueueAnim delay={100} type={'left'} duration={400}>
                            <Route key={page.path} path={page.path} component={page.component}/>
                        </QueueAnim>
                        {/*))}*/}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>):<Redirect to="/login"></Redirect>
        )
    }


}

const mapState = (state) => ({
    type: state.getIn(['login', 'type']) ? state.getIn(['login', 'type']) : state.getIn(['register', 'type']),
    chatMsg: state.getIn(['chat', 'chatMsg'])

})
const mapDispatch = (dispatch) => ({
    sendMsgListRequest() {
        dispatch(actionCreators.getMsgList())
    },
    recvMsgRequest() {
        dispatch(actionCreators.recvMsg());
    }
})
export default connect(mapState, mapDispatch)(Dashboard);
