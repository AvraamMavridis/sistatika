import React, {PureComponent} from 'react';
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
    const {donutChartWidth, donutChartHeight, dataset} = this.props;
    const svg = d3.select(this.svg);
    const g = svg
      .append('g')
      .attr(
        'transform',
        'translate(' + donutChartWidth / 2 + ',' + donutChartHeight / 2 + ')'
      );

    g
      .selectAll('path')
      .data(this.pie(this.props.dataset))
      .enter()
      .append('path')
      .attr('d', this.arc)
      .attr('fill', d => {
        return dataset[d.index].color || color(d.index);
      });
  }

  render() {
    const {donutChartWidth, donutChartHeight} = this.props;

    return (
      <svg
        style={{maxHeight: '100%', maxWidth: '100%'}}
        ref={el => (this.svg = el)}
        viewBox={`0 0 ${donutChartWidth} ${donutChartHeight}`}
        preserveAspectRatio="xMinYMin meet"
      />
    );
  }
}
