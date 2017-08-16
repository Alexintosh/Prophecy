import React from 'react';
import { Tabbar, Tab, Page, Button } from 'react-onsenui';
import Toolbar from '../../components/Toolbar';
import { getAccountsFromWIFKey, generatePrivateKey, getWIFFromPrivateKey, getBalance, getTransactionHistory } from 'neon-js';
import TransactionList from './TransactionList';

const pkey = 'AchEwoFAMiR2hph3FTKqoHiuBQ3f3qpmqz';

export default class TransactionTab extends React.Component {
    constructor(props) {
        super(props);        
        this.state = { transactionHistory: [] };
    }

    componentDidMount() {

        const history = getTransactionHistory('TestNet', pkey).then(b => {
            
            const transactions = b.map( t => {
                return {
                    type: t.neo_sent ? "NEO" : "GAS",
                    amount: t.neo_sent ? t.NEO : t.GAS, 
                    txid: t.txid, 
                    block_index: t.block_index 
                }
            });

            console.log("history", transactions);

            this.setState({ transactionHistory: transactions });
        });
    }

    render() {

        return (
            <Page renderToolbar={() => <Toolbar title='History' />} >
                <TransactionList
                    key="tab_history" 
                    history={this.state.transactionHistory} 
                />
            </Page>
        );
    }    
}
