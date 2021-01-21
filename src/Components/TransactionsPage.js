import React from 'react';
import { Table } from 'react-bootstrap';
import Data from "../data.json";

function TransactionsPage() {

    Data.sort(function (a, b) {
        if (a.timestamp > b.timestamp) return -1;
        if (a.timestamp < b.timestamp) return 1;
        return 0;
    });

    return (
        <div>
            <br />
            <Table striped bordered hover>
                <thead>
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