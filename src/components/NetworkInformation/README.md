# HoC providing info about the network conditions

<a href="https://nodei.co/npm/react-network-info/"><img src="https://nodei.co/npm/react-network-info.png?mini=true"></a>

Install the component

```js
import NetworkInformation from 'react-network-info';
```

Wrap your components with it

```js
<NetworkInformation>
  <Button secondary>Something</Button>
</NetworkInformation>
```

It provides to the children/wrapped components the following props:

| Prop        | Descriptipn     |
| ------------- |-------------|
| downlink      | The effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per seconds. |
| effectiveType  | The effective type of the connection meaning one of 'slow-sg', '2g', '3g', or '4g' |
| rtt  | The estimated effective round-trip time of the current connection  |

