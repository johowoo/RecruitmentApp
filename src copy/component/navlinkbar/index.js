import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {FooterWrapper} from './style';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class NavLinkBar extends Component {
    static  propTypes = {
        data: PropTypes.array.isRequired
    }

    render() {
        const TabBarItem = TabBar.Item;
        const {pathname} = this.props.location;
        const navList = this.props.data.filter(v => !v.hide);
        return (
            <FooterWrapper>
                <TabBar>
                    {navList.map(item => (
                        <TabBarItem
                            badge={item.path==='/msg'?this.props.unread:null}
                            key={item.path}
                            title={item.text}
                            icon={{uri: require(`../../assets/img/${item.icon}.png`)}}
                            selectedIcon={{uri: require(`../../assets/img/${item.icon}-active.png`)}}
                            selected={pathname === item.path}
                            onPress={()=>{
                                this.props.history.push(item.path)
                            }}
                        >

                        </TabBarItem>
                    ))}
                </TabBar>
            </FooterWrapper>
        )
    }
}
const mapState=(state)=>({
    unread:state.getIn(['chat','unread'])
})

export default withRouter(connect(mapState,null)(NavLinkBar));