import React, { Component } from 'react';
import logo from './assets/Novatics.png';
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
    console.log(quotes);
    var lastItem = quotes.pop()
    var listItems = quotes.reverse().map((item) =>
      <div className="card" key={item._id}>
        <div className="card_quote"> {item.quote} </div>
        <div className="card_auth">
          <p className="profile">
            <img className="profile-picture" src="https://secure.gravatar.com/avatar/72cb0061f2b38a8a8ad09c710d5e2877.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2F00b63%2Fimg%2Favatars%2Fava_0008-72.png"/>
            {item.auth}
          </p>
        </div>
      </div>
    );
    if (isLoading) {
      return (<p>Loading ...</p>);
    }
    return (
      <div className="App">
        <div className="App-nav">
          <img className="logo" src={logo}/>
        </div>
        <header className="App-header">
          <p className="Header-help Header-help-top ">Last Quote</p>
          <p className="Header-quote">{lastItem.quote}</p>
          <p className="Header-help">
            <img className="profile-picture" src="https://secure.gravatar.com/avatar/72cb0061f2b38a8a8ad09c710d5e2877.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2F00b63%2Fimg%2Favatars%2Fava_0008-72.png"></img>
            {lastItem.auth}
          </p>
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
