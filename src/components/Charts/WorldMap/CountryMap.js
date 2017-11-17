import React, { PureComponent } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import PropTypes from 'prop-types';
import worldData from './countries.json';

const MoveType = PropTypes.shape({
  x: PropTypes.number,
  y: PropTypes.number,
});

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

    /** How much to move the projection */
    translate: MoveType,
    rotate: MoveType,
  };

  static defaultProps = {
    mapWidth: window.innerWidth,
    mapHeight: 600,
    translate: {
      x: 0,
      y: 200,
    },
    rotate: {
      x: 0,
      y: 0,
    },
    fill: '#F3F3F3',
    className: 'country',
  };

  getProjection() {
    const {
      mapWidth,
      mapHeight,
    } = this.props;

    return geoMercator()
      .fitSize([mapWidth, mapHeight], worldData);
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
