import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Accordion.scss';

/**
 * Accordion Wrapper
 *
 * @class Accordion
 * @extends {PureComponent}
 */
class Accordion extends PureComponent {

  /**
   * Component Interface
   *
   * @static
   * @memberof Accordion
   */
  static propTypes = {
    onToggle: PropTypes.func,
    accordionWrapperClass: PropTypes.string,
  }

  static defaultProps = {
    onToggle: () => void (0),
    accordionWrapperClass: '',
  }

  /**
   * Creates an instance of Accordion.
   * @param {any} props
   * @memberof Accordion
   */
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }

  /**
   * On AccordionItem toggle handler
   *
   * @param {string|number} id
   * @param {boolean} expanded
   * @param {event} event
   * @memberof Accordion
   */
  onToggle(id, expanded, event) {
    this.props.onToggle(id, expanded, event);
  }

  /**
   * Render Component
   *
   * @returns {JSX.Element}
   * @memberof Accordion
   */
  render() {
    const accordionWrapper = classNames('accordion', this.props.accordionWrapperClass);

    return (
      <div className={accordionWrapper} role="presentation">
        { React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, { onToggle: this.onToggle, index });
        })}
      </div>
    );
  }
}

export default Accordion;