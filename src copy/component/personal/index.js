import React, {Component} from 'react';
import {List, Result, WhiteSpace, WingBlank, Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import {JobTitle, Brief, DescSubTitle} from './style';
import browserCookie from 'browser-cookies';
import {withRouter} from 'react-router-dom';
import axios from 'axios';


class Personal extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    state = {
        personalData: {}
    }

    logout() {
        const alert = Modal.alert;
        alert('Logout', 'Are you sure???', [
            {text: 'Cancel', onPress: () => console.log('cancel')},
            {
                text: 'Yes', onPress: () => {
                    this.setState({
                        personalData:{}
                    });
                    browserCookie.erase('userid');
                    this.props.history.push('/login');
                }
            },
        ])
    }

    componentDidMount() {
        axios.get('/user/info')
            .then(res => {
                if (res.status == 200) {
                    if (res.data.code == 0) {
                        console.log(res.data.data);
                        this.setState({
                            personalData: res.data.data
                        })
                    }
                }
            })
    }

    render() {
        const ListItem = List.Item;
        // const Brief = ListItem.Brief;
        const {user, type, company, avatarName, vacancy, objective, desc, resume, salary, requirement} = this.state.personalData;
        // console.log(this.state.personalData.resume);
        return (
            <WingBlank style={{marginTop: 55}}>
                <Result
                    img={<svg className="icon icon-avatar icon-avatar-big" aria-hidden="true">
                        <use xlinkHref={`#icon-${avatarName}`}></use>
                    </svg>}
                    title={user}
                    message={company ? company : null}/>
                <List renderHeader={() => 'Personal'}>
                    <ListItem multipleLine={true}>
                        <JobTitle>{vacancy ? vacancy : objective}</JobTitle>
                        {resume ? <DescSubTitle>Resume:</DescSubTitle> : null}
                        {resume ? divideDesc(resume) : null}
                        {requirement ? <DescSubTitle>Requirement:</DescSubTitle> : null}
                        {requirement ? divideDesc(requirement) : null}
                        {desc ? <DescSubTitle>Description:</DescSubTitle> : null}
                        {desc ? divideDesc(desc) : null}
                        {salary ? <DescSubTitle>{`Salary: ${salary}`}</DescSubTitle> : null}
                    </ListItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <ListItem onClick={this.logout}><JobTitle>Logout</JobTitle></ListItem>
                </List>
            </WingBlank>
        )
    }
}

function divideDesc(prop) {
    return prop.split('\n').map(item => {
        return <Brief key={item}>{item}</Brief>
    });
}

export default withRouter(connect(null, null)(Personal));