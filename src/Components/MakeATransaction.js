import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import Data from "../data.json";
import axios from 'axios';


function MakeATransaction() {

    //states for data and its attributes
    const [data, setData] = useState(Data);
    const [timestamp, setTimestamp] = useState("");
    const [action, setAction] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("");

    //states for warning and error validations
    const dateWarning = <div style={{ color: "orange" }}>Warning! Input selected is a future date</div>
    const [timestampError, setTimestampError] = useState({});
    const [actionError, setActionError] = useState({});
    const [descriptionError, setDescriptionError] = useState({});
    const [amountError, setAmountError] = useState({});
    const [currencyError, setCurrencyError] = useState({});

    //styling of the Make A Transaction title
    const titleStyle = {
        color: 'rgba(71, 7, 73, 0.849)',
        'text-align': 'center'
    }

    //executed when form is submitted
    const handleSubmit = event => {
        event.preventDefault();
        if (validations()) {
            addTransaction();
            alert('You have submitted the form.')
        }
    }

    //validations for the various inputs
    const validations = () => {
        let isValid = true;
        const timestampErrorMessage = {};
        const actionErrorMessage = {};
        const descriptionErrorMessage = {};
        const amountErrorMessage = {};
        const currencyErrorMessage = {};

        if (timestamp === "") {
            timestampErrorMessage.timestampRequired = "A date input is required";
            isValid = false;
        }

        if (action === "") {
            actionErrorMessage.actionRequired = "An action input is required";
            isValid = false;
        }

        if (description === "") {
            descriptionErrorMessage.descriptionRequired = "A description input is required";
            isValid = false;
        }

        if (amount === "") {
            amountErrorMessage.amountRequired = "An amount input is required";
            isValid = false;
        }
        else if (amount >= 0 && amount < 0.01) {
            amountErrorMessage.amountMinimum = "A minimum amount of $0.01 is required";
            isValid = false;
        }
        else if (amount < 0) {
            amountErrorMessage.amountNegative = "Amount input cannot be negative";
            isValid = false;
        }

        if (isNaN(amount)) {
            amountErrorMessage.amountNaN = "A numeric amount input is required";
            isValid = false;
        }

        if (currency === "") {
            currencyErrorMessage.currencyRequired = "A currency input is required";
            isValid = false;
        }

        setTimestampError(timestampErrorMessage);
        setActionError(actionErrorMessage);
        setDescriptionError(descriptionErrorMessage);
        setAmountError(amountErrorMessage);
        setCurrencyError(currencyErrorMessage);

        return isValid;
    }

    useEffect(() => {

    }, [data]);

    //retrieving current date in format YYYY-MM-DD
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    //Add Transaction
    const addTransaction = () => {
        if (timestamp && action && description && amount && currency) {
            //round down the amount input to 2 decimal places
            let amountRounded = Math.floor(amount * 100) / 100;
            let newId = data.length + 1;
            //create new transaction object
            let newTransaction = {
                "id": "t" + newId,
                "timestamp": timestamp,
                "action": action,
                "description": description,
                "amount": amountRounded,
                "currency": currency
            }
            //merge new transaction with copy of old state
            let transactions = [...data, newTransaction];
            //push new array of objects into state
            setData(transactions);
            //clear contents from state
            setTimestamp("");
            setAction("");
            setDescription("");
            setAmount("");
            setCurrency("");
            //update write to json file
            saveJson(transactions);
        }
    }

    //Write to JSON File
    const saveJson = (transactions) => {
        // change url to http://my-json-server.typicode.com/alexradulescu/transactions-fake-api/transactions to talk to the fake API
        // use url http://localhost:3001/write to access the json server created and persist it
        const url = 'http://localhost:3001/write'
        axios.post(url, transactions)
            .then(response => {
                console.log(response)
                alert(response)
            })
    }

    return (
        <div className="wrapper">
            <h1 style={titleStyle}>Make A Transaction</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Transaction Date</Form.Label>
                    <Form.Control name="timestamp" className="mb-1" type="date" min={today} value={timestamp} onChange={e => setTimestamp(e.target.value)}>
                    </Form.Control>
                    {timestamp > today ? dateWarning : null}
                    {Object.keys(timestampError).map((key) => {
                        return <div style={{ color: "red" }}>{timestampError[key]}</div>
                    })}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Action Type</Form.Label>
                    <Form.Control as="select" name="action" className="mb-1" value={action} onChange={e => setAction(e.target.value)}>
                        <option value="" style={{ color: "grey" }}>Select your action type</option>
                        <option value="DEBIT">Debit</option>
                        <option value="CREDIT">Credit</option>
                    </Form.Control>
                    {Object.keys(actionError).map((key) => {
                        return <div style={{ color: "red" }}>{actionError[key]}</div>
                    })}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control name="amount" className="mb-1" placeholder="State your transaction amount" type="text" value={amount} onChange={e => setAmount(e.target.value)}>
                    </Form.Control>
                    {Object.keys(amountError).map((key) => {
                        return <div style={{ color: "red" }}>{amountError[key]}</div>
                    })}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Currency</Form.Label>
                    <Form.Control as="select" name="currency" className="mb-1" value={currency} onChange={e => setCurrency(e.target.value)}>
                        <option value="" style={{ color: "grey" }}>Select your currency</option>
                        <option value="SGD">SGD</option>
                        <option value="HKD">HKD</option>
                        <option value="USD">USD</option>
                    </Form.Control>
                    {Object.keys(currencyError).map((key) => {
                        return <div style={{ color: "red" }}>{currencyError[key]}</div>
                    })}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} name="description" className="mb-1" placeholder="Describe your transaction" type="text" value={description} onChange={e => setDescription(e.target.value)}>
                    </Form.Control>
                    {Object.keys(descriptionError).map((key) => {
                        return <div style={{ color: "red" }}>{descriptionError[key]}</div>
                    })}
                </Form.Group>
                <Button className="mb-5" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default MakeATransaction;