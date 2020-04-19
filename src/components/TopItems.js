import React, { Component } from 'react'
import WordCloud from './WordCloud.js'
import '../CSS/TopItems.css'

class TopItems extends Component {
  constructor (props) {
    super(props)
    this.state = {
      arr: []
    }
    this.arr = []

    var sorted = this.props.q

    sorted.sort(function (a, b) { return a.value - b.value })
    sorted.reverse()
    sorted = sorted.slice(0, 8)

    this.arr = sorted
  }

  componentDidUpdate (prevProps) {
    if (this.props != prevProps) {
      this.setState({ s: this.props.arr })
      console.log('changed')
      var sorted = this.props.q
      sorted = sorted.slice(0, 8)
      this.arr = sorted
    }
  }

  render () {
    return (<div>
      <div className='box'> <h1> {this.arr[0].text}</h1>  <p>{this.arr[0].value}|Gaining Traction|Probable</p></div>
      <div className='box'> <h1> {this.arr[1].text}</h1>  <p>{this.arr[1].value}|Gaining Traction|Probable</p></div>
      <div className='box'> <h1> {this.arr[2].text}</h1>  <p>{this.arr[2].value}|Gaining Traction|Probable</p></div>
      <div className='box'> <h1> {this.arr[3].text}</h1>  <p>{this.arr[3].value}|Gaining Traction|Probable</p></div>
      <div className='box'> <h1> {this.arr[4].text}</h1>  <p>{this.arr[4].value}|Gaining Traction|Probable</p></div>
      <div className='box'> <h1> {this.arr[5].text}</h1>  <p>{this.arr[5].value}|Gaining Traction|Probable</p></div>
      <div className='box'> <h1> {this.arr[6].text}</h1>  <p>{this.arr[6].value}|Gaining Traction|Probable</p></div>
      <div className='box'> <h1> {this.arr[7].text}</h1>  <p>{this.arr[7].value}|Gaining Traction|Probable</p></div>
    </div>
    )
  }
}

export default TopItems
