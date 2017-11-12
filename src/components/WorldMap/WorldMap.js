import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {geoMercator, geoPath} from 'd3-geo';
import worldData from './countries';

export default class WorldMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapWidth: props.mapWidth,
      mapHeight: 600,
    };
  }

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
  }

  static defaultProps = {
    mapWidth: window.innerWidth,
    mapHeight: 600,
    projectionTranslateY: 70,
    projectionTranslateX: 0,
    fill: '#F3F3F3',
  };

  getProjection() {
    const { mapWidth, mapHeight } = this.state;
    const { projectionTranslateX, projectionTranslateY } = this.props;

    return geoMercator()
      .fitSize([mapWidth, mapHeight], worldData)
      .scale(mapWidth / 2 / Math.PI)
      .translate([mapWidth / 2 + projectionTranslateX, mapHeight / 2 + projectionTranslateY]);
  }

  componentDidMount() {
    this.setState({
      mapWidth: this.el.parentElement.clientWidth,
      mapHeight: this.props.mapHeight,
    });
  }

  render() {
    const { children, fill } = this.props;
    const { mapWidth, mapHeight } = this.state;

    return (
      <svg
        ref={(el) => (this.el = el)}
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        preserveAspectRatio="xMinYMin meet">
        <g className="countries">
          {
            worldData.features.map((d, i) => (
              <path
                id={d.properties.name}
                key={`path-${i}`}
                d={geoPath().projection(this.getProjection())(d)}
                className="country"
                fill={fill}
              />
            ))}
        </g>
        { React.Children.map(children, child => React.cloneElement(child, this.state)) }
      </svg>
    );
  }
}
