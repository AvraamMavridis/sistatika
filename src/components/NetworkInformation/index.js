import React, { PureComponent } from 'react';

/**
 * Provides info about the connection type/speed
 *
 * @class NetworkInformation
 * @extends {PureComponent}
 */
export default class NetworkInformation extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      downlink: Infinity,
      effectiveType: undefined,
      rtt: Infinity,
    };
  }

  updateConnectionStatus() {
    this.setState({
      downlink: this.connection.downlink,
      effectiveType: this.connection.effectiveType,
      rtt: this.connection.rtt,
    });
  }

  componentWillMount() {
    this.connection = window.navigator.connection ||
      window.navigator.mozConnection ||
      window.navigator.webkitConnection;
    if(this.connection) {
      this.updateConnectionStatus();
      this.connection.addEventListener('typechange', this.updateConnectionStatus);
    }
  }

  componentWillUnmount() {
    this.connection.removeEventListener(this.updateConnectionStatus);
  }

  render() {
    return React.Children.map(this.props.children, child => React.cloneElement(child, this.state));
  }
}

