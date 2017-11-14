import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Steps.scss';

/**
 * Step Component
 *
 * @export
 * @class Step
 * @extends {PureComponent}
 */
export default class Step extends PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
  }

  /**
   * Render Step
   *
   * @returns {JSX.Element}
   */
  render() {
    const {
      index, selectedIndex, onSelect, onKeyDown,
    } = this.props;
    const stepClass = classNames(styles.step, {
      [styles.selected]: index <= selectedIndex - 1,
    });

    const numberClass = classNames(styles.stepNumber, {
      [styles.selectedNumber]: index <= selectedIndex,
    });

    return (
      <span className={stepClass}>
        <span
          data-index={index}
          tabIndex={0}
          role="button"
          className={numberClass}
          onClick={onSelect}
          onKeyDown={onKeyDown}
        >
          { index }
        </span>
      </span>
    );
  }
}
