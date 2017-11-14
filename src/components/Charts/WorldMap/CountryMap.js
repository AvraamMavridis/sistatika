import React, { PureComponent } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import PropTypes from 'prop-types';
import worldData from './countries.json';

/**
 * The Country Map component is used by the WolrdMap
 *
 * @export
 * @class CountryMap
 * @extends {PureComponent}
 */
export default class CountryMap extends PureComponent {
  static propTypes = {
    /** Classname attached to path */
    className: PropTypes.string,
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
  };

  static defaultProps = {
    mapWidth: window.innerWidth,
    mapHeight: 600,
    projectionTranslateY: 70,
    projectionTranslateX: 0,
    fill: '#F3F3F3',
    className: 'country',
  };

  getProjection() {
    const {
      mapWidth,
      mapHeight,
      projectionTranslateX,
      projectionTranslateY,
    } = this.props;

    return geoMercator()
      .fitSize([mapWidth, mapHeight], worldData)
      .scale(mapWidth / 2 / Math.PI)
      .translate([
        (mapWidth / 2) + projectionTranslateX,
        (mapHeight / 2) + projectionTranslateY,
      ]);
  }

  render() {
    // eslint-disable-next-line
    const { d } = this.props;

    return (
      <path
        {...this.props}
        id={d.properties.name}
        d={geoPath().projection(this.getProjection())(d)}
      />
    );
  }
}
