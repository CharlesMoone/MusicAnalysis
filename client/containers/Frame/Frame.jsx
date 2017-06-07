import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';


function mapStateToProps(state) {
  return {
    state: state.musicPlay,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Frame extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    children: PropTypes.object,
  };

  static childContextTypes = {
    state: PropTypes.object,
    actions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  getChildContext() {
    return {
      state: this.props.state,
      actions: this.props.actions,
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}