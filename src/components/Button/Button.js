import React, { PureComponent } from 'react';
import styles from './Button.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Button Component
 *
 * @export
 * @class Button
 * @extends {Component}
 */
export default class Button extends PureComponent {

  static propTypes = {
    /** Boolean specifying if the primary styling will be applied */
    primary: PropTypes.bool,
    /** Boolean specifying if the secondary styling will be applied */
    secondary: PropTypes.bool,
    /** Children that will be rendered inside the button */
    children: PropTypes.node.isRequired,
    /** Optional extra class passing to button */
    className: PropTypes.string,
    /** Callback called when the button is clicked
     *
     * @param {SyntheticEvent} e
    */
    onClick: PropTypes.func,
  }

  static defaultProps = {
    primary: false,
    secondary: false,
    className: '',
    onClick: () => void (0),
  }

  /**
   * Render Button
   *
   * @returns {JSX.Element}
   */
  render() {
    const { primary, secondary, className, onClick } = this.props;
    const buttonClass = classNames(styles.default, className, {
      [styles.primary]: primary,
      [styles.secondary]: secondary,
    });

    return (
      <button className={buttonClass} onClick={onClick}>
        {this.props.children}
      </button>
    );
  }
}