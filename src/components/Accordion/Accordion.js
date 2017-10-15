import React, { Component } from 'react';
import styles from './Accordion.scss';

class Accordion extends Component {
  render() {
    return (
      <div className={styles.accordionWrapper}>
        { this.props.children }
      </div>
    );
  }
}

export default Accordion;