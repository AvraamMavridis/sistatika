import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import worldData from './countries.json';
import CountryMap from './CountryMap';

export default class WorldMap extends PureComponent {
  static propTypes = {
    /** The initial width of the map, the projection is adjusted based on the parent container */
    mapWidth: PropTypes.number,
    /** The initial height of the map, the projection is adjusted based on the parent container */
    mapHeight: PropTypes.number,
    /** The color of the map */
    fill: PropTypes.string,
    /** How much to move the projection in the Y axis */
    projectionTranslateY: PropTypes.number,
    /** How much to move the projection in the X axis */
    projectionTranslateX: PropTypes.number,
    children: PropTypes.node,
  };

  static defaultProps = {
    mapWidth: window.innerWidth,
    mapHeight: 600,
    projectionTranslateY: 70,
    projectionTranslateX: 0,
    fill: '#F3F3F3',
    children: [],
  };

  render() {
    const { children, mapWidth, mapHeight } = this.props;

    return (
      <svg
        ref={el => (this.el = el)}
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        preserveAspectRatio="xMinYMin meet"
      >
        <g className="countries">
          {worldData.features.map(d => (
            <CountryMap key={d.properties.name} {...this.props} {...this.state} d={d} />
          ))}
        </g>
        {React.Children.map(children, child =>
          React.cloneElement(child, this.state))}
      </svg>
    );
  }
}
