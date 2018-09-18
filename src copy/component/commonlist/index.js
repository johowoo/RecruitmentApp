import React, {Component, Fragment} from 'react';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';
import {ResumeDivider,DescCaption} from './style';
import {withRouter} from 'react-router-dom';
import axios from 'axios';


class CommonList extends Component {
    state = {
        data: [],
        path:this.props.location.pathname,
    }
    handleClick(item){
        this.props.history.push(`/chat/${item._id}`)
    }

    componentDidMount() {
        // console.log(this.state.path);
        let query=this.state.path==='/boss'?'Genius':'Boss';
        axios.get(`/user/list?type=${query}`)
            .then(res => {
                if (res.data.code == 0) {
                    this.setState({data: res.data.data});
                }
            })
    }

    render() {
        const CardHeader = Card.Header;
        const CardBody = Card.Body;
        return (
            <WingBlank>
                <WhiteSpace/>
                <WhiteSpace/>
                {
                    this.state.data.map(item => (
                        item.user ? (
                            <Fragment key={item.user} >
                                <Card
                                    onClick={()=>this.handleClick(item)}
                                >
                                    <CardHeader
                                        title={item.vacancy||item.user}
                                        extra={<span>{item.objective?item.objective:item.company}</span>}
                                        thumb={
                                            <div key={item}>
                                                <svg className="icon icon-avatar" aria-hidden="true">
                                                    <use xlinkHref={'#icon-' + item.avatarName}></use>
                                                </svg>
                                            </div>
                                        }>
                                    </CardHeader>
                                    <CardBody>
                                        {item.requirement?<ResumeDivider><DescCaption>Requirement: </DescCaption>${item.requirement}</ResumeDivider>:null}

                                        {item.desc?<DescCaption>Description:<br/></DescCaption>:null}
                                        {item.resume?divideDesc(item.resume):divideDesc(item.desc,true)}
                                        </CardBody>
                                </Card>
                                <WhiteSpace/>
                            </Fragment>
                        ) : null
                    ))
                }
                <WhiteSpace/>
            </WingBlank>
        )
    }
}

function divideDesc(prop,isIndent){
    if(prop) {
        return prop.split('\n').map(item => (
            <ResumeDivider key={item} className={isIndent ? 'text-indent' : ''}>{item}</ResumeDivider>
        ))
    }
}

export default withRouter(CommonList);