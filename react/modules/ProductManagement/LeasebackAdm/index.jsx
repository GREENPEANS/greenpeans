/*客户管理-用户基本信息*/
import React from 'react';
import List from './Components/List';
export default React.createClass({

  getInitialState() {
    return {
      params: {}
    }
  },
  passParams(params) {
    this.setState({
      params: params
    });
  },
  render() {
    return <div>
      <List params={this.state.params}/>
    </div>
  }
});

