import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Accordion.scss';
import classNames from 'classnames';

/**
 * AccordionItem Component
 *
 * @export
 * @class AccordionItem
 * @extends {Component}
 */
export default class AccordionItem extends PureComponent {

  /**
   * Default config
   *
   * @static
   * @memberof AccordionItem
   */
  static defaultProps = {
    expande: false,
    onToggle: () => void (0),
    accordionHeaderClass: '',
    accordionChildrenClass: '',
  }

  /**
   * Component Interface
   *
   * @static
   * @memberof AccordionItem
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    header: PropTypes.node.isRequired,
    accordionHeaderClass: PropTypes.string,
    accordionChildrenClass: PropTypes.string,
  }

  /**
   * Creates an instance of AccordionItem.
   * @param {any} props
   * @memberof AccordionItem
   */
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.toggleItem = this.toggleItem.bind(this);
  }

  /**
   * Toggle the item
   *
   * @param {Event} e
   * @memberof AccordionItem
   */
  toggleItem(e) {
    const { onToggle, id, index } = this.props;
    const key = id !== undefined ? id : index;
    this.setState({ expanded: !this.state.expanded }, () => {
      onToggle(key, this.state.expanded, e);
    });
  }

  /**
   * Render Item
   *
   * @returns {JSX.Element}
   * @memberof AccordionItem
   */
  render() {
    const { expanded } = this.state;
    const { children, header, id, index } = this.props;
    const key = id !== undefined ? id : index;
    const accordionHeaderClass = classNames('accordion-header', this.props.accordionHeaderClass, {
      'accordion-header--expanded': expanded,
    });
    const accordionChildrenClass = classNames('accordion-content', this.props.accordionChildrenClass, {
      'accordion-content--collapsed': !expanded,
    });

    const section = `section-${key}`;
    const buttonID = `accordion-${key}`;

    return (
      <div>
        <a className={accordionHeaderClass}
          href="#"
          id={buttonID}
          aria-controls={section}
          aria-expanded={expanded}
          onClick={this.toggleItem}
          role="button"
          tabIndex={0}>
          <div role="heading" aria-level="3">{header}</div>
        </a>
        <div className={accordionChildrenClass} aria-labelledby={buttonID} id={section} role="region">
          { children }
        </div>
      </div>
    );
  }
}