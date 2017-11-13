import React, {PureComponent} from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import isNaN from 'lodash/isNaN';

/**
 * WorldPoint is represents a circle inside a map
 *
 * @export
 * @class WorldPoint
 * @extends {PureComponent}
 */
export default class WorldPoint extends PureComponent {

  static propTypes = {
    /** The radious of the data point circle */
    radius: PropTypes.number,
    /** The fill of the circle */
    fill: PropTypes.string,
    /** The text that will appear in the center of the circle */
    text: PropTypes.string,
    /** The color of the text that appears in the center of the circle */
    textColor: PropTypes.string,
    /** The font size of the text that appears in the center of the circle */
    textSize: PropTypes.string,
    /** The font weight of the text that appears in the center of the circle */
    textWeight: PropTypes.number,
    /** The text that appears next to the main text */
    subText: PropTypes.string,
    /** The color of the text that appears next to the main text */
    subTextColor: PropTypes.string,
    /** The size of the text that appears next to the main text */
    subTextSize: PropTypes.string,
    /** The font family of the texts */
    fontFamily: PropTypes.string,
    /** Percentage of the translate of the circle in the X axis, converted to px based on perent width */
    translateX: PropTypes.number,
    /** Percentage of the translate of the circle in the Y axis, converted to px based on perent height */
    translateY: PropTypes.number,
    /** Determine if the circle will animate */
    animate: PropTypes.bool,
    /** Object with attributes and their values to animate */
    animateAttributes: PropTypes.object,
    /** Event on which the animation is triggered */
    animateEvent: PropTypes.string,
    /** Event on which the object returns in its initial state (before animation) */
    animateResetEvent: PropTypes.string,
  }

  static defaultProps = {
    radius: 70,
    fill: 'rgba(38,47,58,0.3)',
    text: '10%',
    textColor: '#404040',
    textSize: '35px',
    textWeight: 300,
    fontFamily: '"Open Sans", "Segoe UI", Tahoma, sans-serif',
    subText: 'Europe',
    subTextColor: '#404040',
    subTextSize: '20px',
    translateX: 50,
    translateY: 50,
    animate: false,
    animateAttributes: {
      r: 90,
    },
    animateEvent: 'mouseover',
    animateResetEvent: 'mouseleave',
  };

  constructor(props) {
    super(props);
    this.renderText = this.renderText.bind(this);
  }

  componentDidMount() {
    const { animate, animateEvent, animateAttributes, animateResetEvent } = this.props;
    if(animate) {
      const circle = d3.select(this.circle);
      const group = d3.select(this.g);
      const animateKeys = Object.keys(animateAttributes);
      let initialProps = {};

      animateKeys.forEach(key => {
        initialProps[key] = circle.attr(key);
      });

      group.on(animateEvent, () => {
        const transition = circle.transition();
        animateKeys.forEach(key => {
          transition.attr(key, animateAttributes[key]);
        });
      });

      group.on(animateResetEvent, () => {
        const transition = circle.transition();
        animateKeys.forEach(key => {
          transition.attr(key, initialProps[key]);
        });
      });
    }
  }


  renderText(g) {
    this.g = g;
    const group = d3.select(g);
    const {
      text,
      fontFamily,
      textSize,
      textWeight,
      textColor,
      subText,
      subTextColor,
      subTextSize,
    } = this.props;

    group
      .append('text')
      .text(text)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('font-size', textSize)
      .attr('font-weight', textWeight)
      .attr('color', textColor)
      .attr('font-family', fontFamily);

    group
      .append('text')
      .text(subText)
      .attr('dx', 40)
      .attr('alignment-baseline', 'middle')
      .attr('font-size', subTextSize)
      .attr('font-weight', textWeight)
      .attr('color', subTextColor)
      .attr('font-family', fontFamily);
  }

  render() {
    const {translateX, translateY, radius, fill, mapWidth} = this.props;

    // Convert percentages to actual px
    let x = (translateX / 100) * mapWidth;
    let y = (translateY / 100) * mapWidth;

    x = isNaN(x) ? 0 : x;
    y = isNaN(y) ? 0 : y;

    return (
      <g ref={this.renderText} transform={`translate(${x},${y})`}>
        <circle ref={(circle) => (this.circle = circle)} r={radius} fill={fill} />
      </g>
    );
  }
}