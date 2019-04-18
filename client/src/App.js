import React, { Component } from 'react';
import logo from './assets/Novatics.png';
import default_image from './assets/default.png';
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
            <img className="profile-picture" src={item.profile_image ? item.profile_image : default_image}/>
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
          <p className="Header-help Header-help-top ">Quote of the Day</p>
          <p className="Header-quote">{lastItem.quote}</p>
          <p className="Header-help">
            <img className="profile-picture" src={lastItem.profile_image ? lastItem.profile_image : default_image}/>
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
