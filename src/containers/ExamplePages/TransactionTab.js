import React from 'react';
import { PullHook, Page } from 'react-onsenui';
import Toolbar from '../../components/Toolbar';
import { getAccountsFromWIFKey, generatePrivateKey, getWIFFromPrivateKey, getBalance, getTransactionHistory } from 'neon-js';
import TransactionList from './TransactionList';

const pkey = 'AchEwoFAMiR2hph3FTKqoHiuBQ3f3qpmqz';

export default class TransactionTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            transactionHistory: [],
            state: 'initial',
        };

        this.handleChange = this.handleChange.bind(this);
        
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

    handleChange(e) {
        this.setState({state: e.state});
    }

    handleLoad(){
        
    }

    getContent() {
        switch (this.state.state) {
          case 'initial':
            return 'Pull to refresh';
          case 'preaction':
            return 'Release';
          case 'action':
            return 'Loading...';
        }
    }

    render() {

        return (
            <Page renderToolbar={() => <Toolbar title='History' />} >
                <PullHook
                    onChange={this.handleChange}
                    onLoad={this.handleLoad}
                >
                    {this.getContent()}
                </PullHook>
                <TransactionList
                    key="tab_history"
                    history={this.state.transactionHistory}
                />
            </Page>
        );
    }
}
