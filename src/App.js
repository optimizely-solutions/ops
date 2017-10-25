import React, { Component } from 'react';

import './App.css';
import './oui.css';

import {Input, Button, Attention} from 'optimizely-oui';
import Clipboard from 'clipboard';

class App extends Component {

  constructor() {
    super();
    this.state = {
      showLink:false,
      link:"",
      customerName:"",
      SalesForceID:"",
      LedBy:"",
      copied:false
    };

  }

  componentDidMount() {
    var clipboard = new Clipboard('.clipboard');

    clipboard.on('success', (e) => {
        e.clearSelection();
        this.setState({copied:true});
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });
  }

  generateLink() {
    const link = "https://www.getfeedback.com/r/L4fcEqRd?name="+this.state.customerName+"&ContactID="+this.state.SalesForceID+"&ledby="+this.state.LedBy;
    this.setState({link:link});
    this.setState({showLink:true});

    return this;

  }

  showLink() {
    this.setState({showLink:!this.state.showLink});
  }

  setCustomerName(value) {
    this.setState({customerName:value}, () => this.generateLink());
  }

  setSalesForceID(value) {
    this.setState({SalesForceID:value}, () => this.generateLink());
  }

  setLedBy(value) {
   this.setState({LedBy:value}, () => this.generateLink());
  }

  render() {
    return (
      <div className="App">
      <div className="img"><img src="logo.png" alt="Optimizely" /></div>
        <h1 className="text--center">OPS URL Generator</h1>
        <div className="push-double--ends">
        <Input
  label="Enter the customer name."
  placeholder="Customer's name"
  onChange= {
    (event) => {
      this.setCustomerName(event.target.value);
    }
  }
  type="text" /></div>
  <div className="push-double--ends">
  <Input
  label="Enter the SalesForce Contact ID."
  placeholder="SalesForce Contact ID"
  onChange={
    (event) => {
      this.setSalesForceID(event.target.value);
    }
  }
  type="text" /></div>
  <div className="push-double--ends">
  <Input
  placeholder="Optimizely Leader"
  label="Enter the name of the person that led the engagement."
   onChange={
    (event) => {
      this.setLedBy(event.target.value);
    }
  }
  type="text" /></div>


    {(this.state.showLink === true) ?
      <Attention alignment="center" type="warning">
  Hello! Here's your OPS link: <br /><br /><strong id="link">{this.state.link}</strong>
  <br /><br />
  <div className="clipboard"  data-clipboard-target="#link"><Button style="plain">Copy to clipboard</Button></div>{(this.state.copied === true ? <p>Copied!</p> : null)}
</Attention> : null}
      </div>
    );
  }
}

export default App;
