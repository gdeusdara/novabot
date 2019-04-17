import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch('https://novabot-123.herokuapp.com/get-quotes')
      .then(response => response.json())
      .then(data => {
        console.table(data);
        this.setState({ quotes: data, isLoading: false })
      })
      .catch(e => {
        console.log(e);
        return e;
      });

  }

  render() {
    const { quotes, isLoading } = this.state;
    console.log('opa' + quotes);
    var lastItem = quotes.pop()
    var listItems = quotes.reverse().map((item) =>
      <div className="card" key={item._id}>
        <div className="card_image"> {item.quote} </div>
        <div className="card_title">
          <p>{item.auth}</p>
        </div>
      </div>
    );
    if (isLoading) {
      return (<p>Loading ...</p>);
    }
    return (
      <div className="App">
        <header className="App-header">
          <p>Last Quote</p>
          <p className="Header-quote">{lastItem.quote}</p>
          <p>{lastItem.auth}</p>
        </header>
        <div className="quotes-body">
          <div className="cards-list">
            {listItems}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
