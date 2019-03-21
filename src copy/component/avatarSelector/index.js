import React, {Component, Fragment} from 'react';
import propTypes from 'prop-types';
import {List} from 'antd-mobile';
import {AvatarWrapper, ImgContainer,ChosenAvatar,ChosenAvatarContainer} from './style';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {actionCreators as bossActionCreators} from "../../pages/bossinfo/store";
import {actionCreators as geniusActionCreators} from "../../pages/geniusinfo/store";

class AvatarSelector extends Component {
static propTypes={
    handleSelectAvatar:propTypes.func
}
    render() {
        const {handleSelect, avatarEle,handleSelectAvatar} = this.props;
        const list = ['anchundan', 'baicai', 'danjiao', 'dougan1', 'nangua', 'xihongshi', 'xilanhua1', 'xianggu', 'xiepai', 'youyu', 'yumi', 'yumichang'];
        const avatarChosenDisplay = (avatarEle ?
                <ChosenAvatarContainer>
                    <p>The Chosen avatar: </p>
                    <ChosenAvatar  dangerouslySetInnerHTML={{__html:avatarEle.innerHTML}}>{}</ChosenAvatar>
                </ChosenAvatarContainer>
                : <p>Please choose your avatar: </p>
        );
        const {pathname}=this.props.location;
        return (
            <AvatarWrapper>
                <Fragment>
                    <List renderHeader={
                        avatarChosenDisplay
                    }>
                        {
                            list.map((item) => {
                                return (
                                    <ImgContainer
                                        key={item}
                                        onClick={
                                            (e) => {
                                                handleSelectAvatar(pathname,item);
                                                handleSelect(e, item, avatarEle);
                                            }
                                        }
                                        style={{overflow: 'hidden'}}
                                    >
                                        <svg className="icon icon-avatar" aria-hidden="true"
                                             style={{width: 100, fontSize: 20}}>
                                            <use xlinkHref={'#icon-' + item}></use>
                                        </svg>
                                    </ImgContainer>
                                )
                            })
                        }
                    </List>
                </Fragment>
            </AvatarWrapper>
        )
    }
}

const mapState = (state) => ({
    avatarEle: state.getIn(['bossInfo', 'avatarEle'])
})

const mapDispatch = (dispatch) => ({
    handleSelect(e, imgName, avatarEle) {
        if (avatarEle) {
            console.log(avatarEle);
            avatarEle.style = "#fff";
        }
        e.currentTarget.style.background = "#c69";
        dispatch(bossActionCreators.getSelectAvatarAction(e.currentTarget, imgName));
    },
    handleSelectAvatar(pathname,imgName){
        if(pathname==='/genius'){ geniusActionCreators.getSelectAvatarAction(imgName)}
       else if(pathname==='/commonlist'){ bossActionCreators.getSelectAvatarAction(imgName)}

    }
})
export default withRouter(connect(mapState, mapDispatch)(AvatarSelector));