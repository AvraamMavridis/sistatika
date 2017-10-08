import React, { PureComponent } from 'react';
import styles from './Steps.scss';
import classNames from 'classnames';

/**
 * Step Component
 *
 * @export
 * @class Step
 * @extends {PureComponent}
 */
export default class Step extends PureComponent {

  /**
   * Render Step
   *
   * @returns {JSX.Element}
   */
  render() {
    const { index, selectedIndex, onSelect } = this.props;
    const stepClass = classNames(styles.step, {
      [styles.selected]: index <= selectedIndex - 1,
    });

    const numberClass = classNames(styles.stepNumber, {
      [styles.selectedNumber]: index <= selectedIndex,
    });

    return (
      <span className={stepClass}>
        <span
          tabIndex={0}
          role="button"
          className={numberClass}
          onClick={ onSelect }>
          { index }
        </span>
      </span>
    );
  }
}
