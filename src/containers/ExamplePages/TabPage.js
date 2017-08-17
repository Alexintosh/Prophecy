import React from 'react';
import { Tabbar, Tab, Page, Button, Col, Row } from 'react-onsenui';
import Toolbar from '../../components/Toolbar';
import { getAccountsFromWIFKey, doSendAsset, generatePrivateKey, getWIFFromPrivateKey, getBalance, getTransactionHistory } from 'neon-js';
import TransactionTab from './TransactionTab';
import TransactionList from './TransactionList';
import { Balance } from '../../components/Balance';
import {AreaChart, LineChart, Line, XAxis, Area, YAxis, CartesianGrid, Tooltip, Legend} from 'Recharts';
const data = [
      {name: 'june', uv: 4000, pv: 2400, amt: 2400},
      {name: 'july', uv: 3000, pv: 1398, amt: 2210},
      {name: 'aug', uv: 2000, pv: 9800, amt: 2290}
];

const pkey = 'AchEwoFAMiR2hph3FTKqoHiuBQ3f3qpmqz';

class TabPage extends React.Component {

  // componentDidMount() {
  // const assetType = 'Gas';
  // const amount = 0.01;
  // doSendAsset('TestNet', toAddress, fromWif, assetType, amount)
  // .then((response) => {
  //   console.log("RS", response);
  //   if (response.result === undefined){
  //     console.log("Transaction failed!");
  //   } else {
  //     console.log("Transaction complete! Your balance will automatically update when the blockchain has processed it.")
  //   }
  // }).catch((e) => {
  //   console.log("Transaction failed!");
  // });
  // }

  constructor(props) {
    super(props);
    this.state = {
      transactionHistory: [],
      state: 'initial',
    };
  }

  componentDidMount() {
    const history = getTransactionHistory('TestNet', pkey).then(b => {

      const transactions = b.map(t => {
        return {
          type: t.neo_sent ? "NEO" : "GAS",
          amount: t.neo_sent ? t.NEO : t.GAS,
          txid: t.txid,
          block_index: t.block_index
        }
      });

      this.setState({ transactionHistory: transactions });
    });
  }

  render() {
    return (
      <Page style={{backgroundColor:'#103F7F', color:'#fff'}} renderToolbar={() => <Toolbar title={this.props.title} />} >
        <div style={{backgroundColor:'#103F7F', color:'#fff'}}>
        <Balance />
        <AreaChart width={window.innerWidth} height={200} data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis dataKey="name" stroke="#c0ceb3" tickLine={{stroke: '#fff', strokeWidth: 0.5}} tick={{stroke: '#fff', strokeWidth: 0.5}}/>
          <YAxis axisLine={false} stroke="#c0ceb3" mirror={true} tick={{stroke: '#fff', strokeWidth: 0.5}}/>
          
          <Tooltip />
          <Line type="monotone" dataKey="pv" stroke="#fff" activeDot={{ r: 8 }} />
          <Area type='monotone' dataKey='pv' stroke='#fff' fill='rgba(255, 255, 255, 0.4)' tick={{stroke: '#fff', strokeWidth: 0.5}} />
          
        </AreaChart>
        <TransactionList
          key="tab_history"
          history={this.state.transactionHistory}
        />
        </div>
      </Page>
    );
  }
}

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.renderTabs = this.renderTabs.bind(this);
  }

  renderTabs(activeIndex, tabbar) {
    console.log('index : ', activeIndex);
    return [
      {
        content: <TabPage key="0" title='Prophecy Wallet' active={activeIndex == 0} />,
        tab: <Tab key='tab_home' label='Home' icon='md-home' />
      },
      {
        content: <TransactionTab key="1" active={activeIndex == 1} />,
        tab: <Tab key='tab_settings' label='History' icon='md-settings' />
      }
    ];
  }

  render() {
    return (
      <Page>
        <Tabbar
          index={this.state.index}
          onPreChange={(event) => {
            this.setState({ index: event.index });
            console.log('preChange', event.index);
          }}
          onPostChange={() => console.log('postChange')}
          onReactive={() => console.log('postChange')}
          position='bottom'
          renderTabs={this.renderTabs}
        />
      </Page>
    );
  }
}
