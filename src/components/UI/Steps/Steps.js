import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Steps.scss';
import Step from './Step';

/**
 * Steps Component
 *
 * @export
 * @class Steps
 * @extends {Component}
 */
export default class Steps extends Component {
  static propTypes = {
    /** The selected index */
    selectedIndex: PropTypes.number,
    /** Callback called when a step is selected
     *
     * @param {number} selectedIndex
     * @param {SyntheticEvent} e
     */
    onSelect: PropTypes.func,
    /** Array of steps */
    steps: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    selectedIndex: Infinity,
    onSelect: () => undefined,
    steps: [],
  };

  /**
   * Creates an instance of Steps.
   * @param {any} props
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: Infinity,
    };

    this.onSelect = this.onSelect.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  /**
   * Set state on mounting
   */
  componentWillMount() {
    const { selectedIndex } = this.props;
    this.setState({ selectedIndex });

    document.addEventListener('keydown', this.onKeyDown);
  }

  /**
   * Update the state on receive props
   *
   * @param {any} { selectedIndex }
   */
  componentWillReceiveProps({ selectedIndex }) {
    if (selectedIndex && this.props.selectedIndex !== selectedIndex) {
      this.setState({ selectedIndex });
    }
  }

  /**
   * Cleanup
   */
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  /**
   * On Select handler
   *
   * @param {Boolean} selectedIndex
   * @param {Event} e
   */
  onSelect(selectedIndex, event) {
    this.setState({ selectedIndex }, () => {
      this.props.onSelect(selectedIndex, event);
    });
  }

  /**
   * Listen to keyboard events
   *
   * @param {any} e
   */
  onKeyDown(e) {
    if (e.key === 'Enter' && this.steps.contains(document.activeElement)) {
      this.setState({ selectedIndex: parseInt(document.activeElement.dataset.index, 10) });
    }
  }

  /**
   * Render Steps
   *
   * @returns {JSX.Element}
   */
  render() {
    const { steps } = this.props;
    const { selectedIndex } = this.state;

    return (
      <span className={styles.steps} ref={s => (this.steps = s)}>
        {steps.map((text, i) => (
          <Step
            key={text}
            index={i}
            selectedIndex={selectedIndex}
            onSelect={e => this.onSelect(i, e)}
            onKeyDown={this.onKeyDown}
          />
        ))}
      </span>
    );
  }
}
