It provides to the children/wrapped components the following props:

| Prop        | Descriptipn     |
| ------------- |-------------|
| downlink      | The effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per seconds. |
| effectivetype  | The effective type of the connection meaning one of 'slow-sg', '2g', '3g', or '4g' |
| rtt  | The estimated effective round-trip time of the current connection  |

Example:

```js
class Dumb extends React.Component {
  render() {
    return (
      <div>
        <div>EffectiveType: {this.props.effectivetype}</div>
        <div>Downlink: {this.props.downlink}</div>
        <div>RTT: {this.props.rtt}</div>
      </div>
    );
  }
}

<NetworkInformation>
<Dumb/>
</NetworkInformation>
```
