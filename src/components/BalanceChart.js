import React from 'react';
import {AreaChart, LineChart, Line, XAxis, Area, YAxis, CartesianGrid, Tooltip, Legend} from 'Recharts';

const data = [
    {name: 'june', uv: 4000, pv: 2400, amt: 2400},
    {name: 'july', uv: 3000, pv: 1398, amt: 2210},
    {name: 'aug', uv: 2000, pv: 9800, amt: 2290}
];

export default class BalanceChart extends React.Component {
    render() {
        return(
            <AreaChart 
                width={window.innerWidth} 
                height={200} 
                data={data}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#c0ceb3" tickLine={{stroke: '#fff', strokeWidth: 0.5}} tick={{stroke: '#fff', strokeWidth: 0.5}}/>
                <YAxis axisLine={false} stroke="#c0ceb3" mirror={true} tick={{stroke: '#fff', strokeWidth: 0.5}}/>

                <Tooltip />
                <Line type="monotone" dataKey="pv" stroke="#fff" activeDot={{ r: 8 }} />
                <Area type='monotone' dataKey='pv' stroke='#fff' fill='rgba(255, 255, 255, 0.4)' tick={{stroke: '#fff', strokeWidth: 0.5}} />
            </AreaChart>
        )
    }
}