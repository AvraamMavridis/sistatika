import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

/**
* @typedef {Object} donutChartProps
* @property {number} donutChartWidth
* @property {number} donutChartHeight
* @property {number} innerRadius
* @property {number} outerRadius
*/

/**
 * Simple DonutChart Component
 *
 * @export
 * @class DonutChart
 * @extends {PureComponent}
 */
export default class DonutChart extends PureComponent {
  static defaultProps = {
    donutChartWidth: 100,
    donutChartHeight: 150,
    innerRadius: 32,
    outerRadius: 46,
    padAngle: 0.05,
    dataset: {},
  };

  static propTypes = {
    /** The width of the donut container */
    donutChartWidth: PropTypes.number,
    /** The height of the donut container */
    donutChartHeight: PropTypes.number,
    /** The inner radius of the donut */
    innerRadius: PropTypes.number,
    /** The outer radius of the donut */
    outerRadius: PropTypes.number,
    /** The padding between the arcs of the donut */
    padAngle: PropTypes.number,
    /** JSON object from which the arcs of the donut are generated */
    dataset: PropTypes.shape({
      color: PropTypes.string,
      percent: PropTypes.number,
      name: PropTypes.string,
    }),
  }

  /**
   * Creates an instance of DonutChart.
   * @param {donutChartProps} props
   * @memberof DonutChart
   */
  constructor(props) {
    super(props);
    this.pie = d3.pie().value(d => d.percent).sort(null);

    this.arc = d3
      .arc()
      .outerRadius(props.outerRadius)
      .innerRadius(props.innerRadius)
      .padAngle(props.padAngle);
  }

  componentDidMount() {
    const color = d3.scaleOrdinal(d3.schemeCategory20b);
    const { donutChartWidth, donutChartHeight, dataset } = this.props;
    const svg = d3.select(this.svg);
    const g = svg
      .append('g')
      .attr(
        'transform',
        `translate(${donutChartWidth / 2},${donutChartHeight / 2})`,
      );

    g
      .selectAll('path')
      .data(this.pie(this.props.dataset))
      .enter()
      .append('path')
      .attr('d', this.arc)
      .attr('fill', d => dataset[d.index].color || color(d.index));
  }

  render() {
    const { donutChartWidth, donutChartHeight } = this.props;

    return (
      <div style={{ height: donutChartHeight, width: donutChartWidth }}>
        <svg
          style={{ maxHeight: '100%', maxWidth: '100%' }}
          ref={el => (this.svg = el)}
          viewBox={`0 0 ${donutChartWidth} ${donutChartHeight}`}
          preserveAspectRatio="xMinYMin meet"
        />
      </div>
    );
  }
}
