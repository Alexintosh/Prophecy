import React from 'react'
import {AreaChart, Line, XAxis, Area, YAxis} from 'Recharts'

export class BalanceChart extends React.Component {
  render () {
    return (
      <AreaChart
        width={window.innerWidth}
        height={200}
        data={this.props.data}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <XAxis dataKey='name' stroke='#c0ceb3' tickLine={{stroke: '#c0ceb3', strokeWidth: 0.5}} tick={{stroke: '#c0ceb3', strokeWidth: 0.5}} />
        <YAxis axisLine={false} stroke='#c0ceb3' mirror tick={{stroke: '#c0ceb3', strokeWidth: 0.5}} />

        <Line type='monotone' dataKey='pv' stroke='#c0ceb3' activeDot={{ r: 8 }} />
        <Area type='monotone' dataKey='pv' stroke='#c0ceb3' fill='rgba(0, 0, 0, 0.4)' tick={{stroke: '#fff', strokeWidth: 0.5}} />
      </AreaChart>
    )
  }
}

export default BalanceChart
