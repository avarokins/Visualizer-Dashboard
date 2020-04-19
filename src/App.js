import './CSS/App.css'
import React, { Component } from 'react'
import Sidebar from 'react-sidebar'
import WordCloud from './components/WordCloud.js'
import DropDown from './components/Dropdown.js'
import InfoBox from './components/InfoBox.js'


const mql = window.matchMedia('(min-width: 800px)')

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      query: ''
    }
    this.callbackFunction1 = this.callbackFunction1.bind(this)
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  componentWillMount () {
    mql.addListener(this.mediaQueryChanged)
  }

  componentWillUnmount () {
    mql.removeListener(this.mediaQueryChanged)
  }

  onSetSidebarOpen (open) {
    this.setState({ sidebarOpen: open })
  }

  mediaQueryChanged () {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false })
  }

  callbackFunction1(childData) {
	this.setState({query:childData})
  }



  render () {
    return (
      <Sidebar
        sidebar={<b>
        	<InfoBox query={this.state.query} />
        	<DropDown parentCallback = {this.callbackFunction1}/>
        </b>}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
        <h1>WordCloud!</h1>
        <WordCloud q={this.state.query}/>
      </Sidebar>
    )
  }
}

export default App
