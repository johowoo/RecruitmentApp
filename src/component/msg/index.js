import React, {Component} from 'react';
import {List, Badge} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


class Msg extends Component {
    render() {
        const ListItem = List.Item;
        const Brief = ListItem.Brief;
        const userId = localStorage.getItem('_id');
        const {chatMsg, users} = this.props;
        const msgGroup = {};
        chatMsg.forEach(item => {
            msgGroup[item.chat_id] = msgGroup[item.chat_id] || [];
            msgGroup[item.chat_id].push(item);
        })

        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = getLast(a).create_time
            const b_last = getLast(b).create_time
            return b_last - a_last
        })


        return (
            <div>
                {chatList.map((item,index) => {
                        const lastItem = getLast(item);
                        const targetId = (item[0].from === userId) ? item[0].to : item[0].from;
                        const unreadNum = item.filter(v => !v.read && v.to === userId).length
                        return targetId ? (
                            <List  key={item.create_time+index}>
                                <ListItem
                                    extra={<Badge text={unreadNum}/>}
                                    thumb={
                                        <svg className="icon icon-avatar icon-avatar-small" aria-hidden="true">
                                            <use
                                                xlinkHref={`#icon-${users[targetId] ? users[targetId].avatarName : null}`}></use>
                                        </svg>
                                    }
                                    arrow="horizontal"
                                    onClick={()=>{
                                        this.props.history.push(`/chat/${targetId}`)
                                    }}
                                >
                                    {lastItem.content}
                                    <Brief>{users[targetId] ? users[targetId].name : null}</Brief>
                                </ListItem>
                            </List>
                        ) : null
                    }
                )
                }


            </div>

        )
    }
}

const mapState = state => ({
    chatMsg: state.toJS().chat.chatMsg,
    users: state.toJS().chat.users,
})

function getLast(arr) {
    return arr[arr.length - 1];
}

export default withRouter(connect(mapState, null)(Msg));