import React, { Component } from 'react';
import styles from './Button.scss';

export default class Button extends Component {
  render () {
    return (
      <button className={styles.default}>
        {this.props.children}
      </button>
    )
  }
}