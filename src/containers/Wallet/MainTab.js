import React from 'react'
import { Page } from 'react-onsenui'
import Toolbar from '../../components/Toolbar'
import TransactionList from '../../components/TransactionList'
import { Balance } from '../../components/Balance'
import BalanceChart from '../../components/BalanceChart'
import {AccountInfo} from '../../components/AccountInfo'
import { fetchTransaction, fetchBalance } from './actions'
import { connect } from 'react-redux'

const data = [
  {name: 'june', uv: 4000, pv: 2400, amt: 2400},
  {name: 'july', uv: 3000, pv: 1398, amt: 2210},
  {name: 'aug', uv: 2000, pv: 9800, amt: 2290}
]

class MainTab extends React.Component {
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

  constructor (props) {
    super(props)
    this.state = {
      state: 'initial'
    }

    this.refreshBalance = this.refreshBalance.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(fetchTransaction(this.props.public_key))
    this.props.dispatch(fetchBalance(this.props.public_key))
  }

  refreshBalance () {
    this.props.dispatch(fetchBalance(this.props.public_key))
  }

  render () {
    const {transactions} = this.props.wallet
    return (
      <Page style={{backgroundColor: '#103F7F', color: '#fff'}} renderToolbar={() => <Toolbar title={this.props.title} />} >
        <div style={{backgroundColor: '#103F7F', color: '#fff'}}>
          <AccountInfo publicKey={this.props.public_key} />

          <Balance
            NEO={this.props.balance.NEO}
            GAS={this.props.balance.GAS}
            onRefresh={this.refreshBalance} />

          <BalanceChart data={data} />

          <TransactionList
            key='tab_history'
            history={transactions}
        />

        </div>
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  public_key: state.account.account.address,
  balance: {
    NEO: state.wallet.Neo,
    GAS: state.wallet.Gas
  }
})

export default connect(mapStateToProps)(MainTab)
