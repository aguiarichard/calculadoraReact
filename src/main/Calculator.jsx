import React, { Component } from "react";
import './Calculator.css'

import Display from "../components/Display";
import Button from "../components/Button";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {
    state = { ...initialState }

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })

            return
        } 

        const operationIsEquals = operation === '='  
        const currentOperation = this.state.operation
        
        const values = [...this.state.values]

        const operationList = {
            '+': 'sum',
            '-': 'subtraction',
            '*': 'multiplication',
            '/': 'division'
        }

        const operationsPosible = {
            sum: function(array) {
                return array[0] + array[1]
            },
            subtraction: function(array) {
                return array[0] - array[1]
            },
            multiplication: function(array) {
                return array[0] * array[1]
            },
            division: function(array) {
                return array[0] / array[1]
            }
        }

        const finalOperation = operationsPosible[operationList[currentOperation]]
        values[0] = finalOperation(values).toString().includes('.') ? 
            parseFloat(finalOperation(values).toFixed(2)) : finalOperation(values)
        values[1] = 0

        this.setState({
            displayValue: values[0],
            operation: operationIsEquals ? null : operation,
            current: operationIsEquals ? 0 : 1,
            clearDisplay: !operationIsEquals,
            values
        })
    }

    addDigit(digit) {
        if (digit === '.' && this.state.displayValue === '0') {
            const displayValue = `0${digit}`
            this.setState({ displayValue, clearDisplay: false })

            return
        }

        if (digit === '.' && this.state.displayValue.includes('.')) return

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digit

        this.setState({ displayValue, clearDisplay: false })

        if (digit !== '.') {
            const index = this.state.current

            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]

            values[index] = newValue

            this.setState({ values })
        }
    }

    render() {
        return (
            <div className="Calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}