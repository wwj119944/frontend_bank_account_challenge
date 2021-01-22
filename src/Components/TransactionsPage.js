import React from 'react';
import { Table } from 'react-bootstrap';
import Data from "../data.json";
import "../CSS/TransactionsPage.css";

function TransactionsPage() {

    //sort to display transactions according to latest timestamp on top
    Data.sort(function (a, b) {
        if (a.timestamp > b.timestamp) return -1;
        if (a.timestamp < b.timestamp) return 1;
        return 0;
    });

    return (
        <div>
            <h1 className="title">Transaction History</h1>
            <br />
            <Table striped bordered hover>
                <thead className="thead">
                    <tr>
                        <th>Timestamp</th>
                        <th>Action</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {Data ? Data.map(transaction => (<tr key={transaction.id}>
                        <td>{transaction.timestamp}</td>
                        <td>{transaction.action}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.currency}</td>
                        <td>{transaction.description}</td>
                    </tr>
                    )) : null
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default TransactionsPage;