import React, { Component } from 'react'
import WordCloud from './WordCloud'

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'moo1',
    };
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
    return <WordCloud searchQuery={this.username} />
  }

  render() {
    return (
      <form>
      <h1>Hello {this.state.username} {this.state.age}</h1>
      <p>Enter your name:</p>
      <input
        type='text'
        name='username'
        onChange={this.myChangeHandler}
      />
      </form>
    );
  }
}

export default MyForm
