import React from 'react';
import { Tabbar, Tab, Page, Button, Col, Row } from 'react-onsenui';
import Toolbar from '../../components/Toolbar';
import { getAccountsFromWIFKey, doSendAsset, generatePrivateKey, getWIFFromPrivateKey, getBalance, getTransactionHistory } from 'neon-js';
import TransactionTab from './TransactionTab';
import {Balance} from '../../components/Balance';

class TabPage extends React.Component {

  componentDidMount() {
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
  }

  render() {
    return (
      <Page renderToolbar={() => <Toolbar title={this.props.title} />} >
        <Balance />        
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
        content: <TransactionTab key="1" active={activeIndex == 1}/>,
        tab:     <Tab key='tab_settings' label='History' icon='md-settings' />
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
