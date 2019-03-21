import React, {Component, Fragment} from 'react';
import {List, InputItem, NavBar, Icon, Grid, WingBlank} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import io from 'socket.io-client';
import * as actionCreators from './store/actionCreators'
import {getChatId} from "../../utils/utils";
// import QueueAnim from 'rc-queue-anim';

const chat = {};
chat.socket = io('ws://localhost:9093');

class Chat extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        }
    }

    fixCarousel() {
        //fix the bug of antD-Grid
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 0)
    }

    handleSubmit() {
        const from = localStorage.getItem('_id');
        const to = this.props.match.params.user;
        const msg = this.state.text;
        actionCreators.sendMsg({from, to, msg})();
        this.setState({
            text: '',
            showEmoji: false
        })
    }

    componentDidMount() {
        // console.log('chat component loaded');
        let currentPath=this.props.location.pathname;
        console.log('currentPath',currentPath)
        console.log(currentPath.indexOf('/chat'))
        if (!this.props.chatMsg.size&&currentPath.indexOf('/chat')>-1) {
            this.props.sendMsgListRequest();
            this.props.recvMsgRequest();
        }

    }
    componentWillUnmount(){
        const targetId=this.props.match.params.user;
        this.props.readMsgRequest(targetId);
        console.log(targetId);
    }

    render() {
        const {chatMsg, users} = this.props;
        const userTargetId = this.props.match.params.user;
        const ListItem = List.Item;

        const chatId = getChatId(userTargetId, localStorage.getItem('_id'));
        let isChatMsgsEmpty=false;
        if (!users[userTargetId]) {
            isChatMsgsEmpty= true;
        }
        //filter msgs to the given id
        const chatMsgs = chatMsg.toJS().filter(v => v.chat_id === chatId);

        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({text: v}))
        return (
            <Fragment>
                <div>abc</div>
                <div id="chat-page">
                    <NavBar
                        className="fixed-top-bar"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {
                            this.props.history.goBack();
                        }}
                    >
                        {users[userTargetId] ? users[userTargetId].name : null}
                    </NavBar>

                    {!isChatMsgsEmpty?(<WingBlank style={{margin: '30px 0 45px 0'}}>
                        {/*<QueueAnim delay={300}>*/}
                        {chatMsgs.map((item, index) => {
                            // console.log('chatkey',item);
                                return item.from === userTargetId ?
                                    (<List key={item.create_time}>
                                            <ListItem thumb={ (
                                                <svg className="icon icon-avatar icon-avatar-small" aria-hidden="true">
                                                    <use xlinkHref={`#icon-${users[userTargetId].avatarName}`}></use>
                                                </svg>)}>{item.content}</ListItem>
                                        </List>
                                    ) :
                                    (<List key={item.create_time} style={{border: 'none'}}>
                                        <ListItem className="chat-to-me" extra={<svg className="icon icon-avatar icon-avatar-small" aria-hidden="true">
                                            <use xlinkHref={`#icon-${users[localStorage.getItem('_id')].avatarName}`}></use>
                                        </svg>}>{item.content}</ListItem>
                                    </List>)

                            }
                        )}
                        {/*</QueueAnim>*/}
                    </WingBlank>):null}


                    <div className="stick-footer">
                        <List>
                            <InputItem className="fixed-bottom-bar"
                                       placeholder="Please input text"
                                       value={this.state.text}
                                       onChange={(v) => {
                                           this.setState({
                                               text: v
                                           })
                                       }}
                                       extra={
                                           <div>
                                               <span style={{marginRight: 8}} onClick={() => {
                                                   this.setState({
                                                       showEmoji: !this.state.showEmoji
                                                   })
                                                   this.fixCarousel()
                                               }
                                               }>😘</span>
                                               <span onClick={this.handleSubmit}>Send</span>
                                           </div>
                                       }/>

                        </List>

                        {this.state.showEmoji ? (<Grid data={emoji}
                                                       columnNum={9}
                                                       carouselMaxRow={4}
                                                       isCarousel={true}
                                                       onClick={el=>{
                                                           this.setState({
                                                               text:this.state.text+el.text
                                                           })
                                                       }}
                        />) : null}
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapState = state => ({
    users: state.toJS().chat.users,
    chatMsg: state.getIn(['chat', 'chatMsg'])
})
const mapDispatch = dispatch => ({
    sendMsgListRequest() {
        dispatch(actionCreators.getMsgList())
    },
    recvMsgRequest() {
        dispatch(actionCreators.recvMsg());
    },
    readMsgRequest(targetId){
        dispatch(actionCreators.readMsg(targetId));
    }

})

export default withRouter(connect(mapState, mapDispatch)(Chat));