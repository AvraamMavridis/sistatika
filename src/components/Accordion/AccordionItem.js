import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Accordion.scss';
import classNames from 'classnames';

/**
 * AccordionItem Component
 *
 * @export
 * @class AccordionItem
 * @extends {Component}
 */
export default class AccordionItem extends Component {

  /**
   * Default config
   *
   * @static
   * @memberof AccordionItem
   */
  static defaultProps = {
    expande: false,
    onToggle: () => void (0),
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
    const { onToggle, id } = this.props;
    this.setState({ expanded: !this.state.expanded }, () => {
      onToggle(id, this.state.expanded, e);
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
    const { children, header } = this.props;
    const accordionHeaderClass = styles.accordionHeader;
    const accordionChildrenClass = classNames(styles.accordionChildrenClass, {
      [styles.collapsed]: !expanded,
    });

    console.log(accordionChildrenClass);

    return (
      <div>
        <a className={accordionHeaderClass}
          href="#"
          onClick={this.toggleItem}
          role="button"
          tabIndex={0}>
          <div>{header}</div>
        </a>
        <p className={accordionChildrenClass}>
          { children }
        </p>
      </div>
    );
  }
}