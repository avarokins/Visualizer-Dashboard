import React, { Component } from 'react'
import WordCloud from './WordCloud.js'
import '../CSS/InfoBox.css'


class Dropdown extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      value: 'Energy'
    }
  }

  handleChange = (event) => {
    let val = event.target.value
    this.setState({value: val});
  }
    
  render () {
    return (<div>
      <p className='title'>{this.state.value}</p>

    </div>
    )
  }
}

export default Dropdown
