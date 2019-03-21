import React,{Component} from 'react';
import {LogoContainer}from './style';
import logoImg from '../../assets/logo.svg';
class Logo extends Component{
    render(){
        return (
            <LogoContainer>
                <img src={logoImg} alt=""/>
            </LogoContainer>
        )
    }
}
export default Logo;