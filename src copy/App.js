import React, { Component } from 'react';
import {Button} from 'antd-mobile';
import axios from 'axios';
import './config/index';

class App extends Component {
  componentDidMount(){
    axios.get('/data')
        .then(res=>{
          console.log(res);
        })
  }
  render() {
    return (
      <div >
      </div>
    );
  }
}

export default App;
