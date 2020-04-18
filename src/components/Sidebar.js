import React from 'react'
import Sidebar from 'react-sidebar'
import Form from './Form.js'

class SideBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sidebarOpen: false
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
  }

  onSetSidebarOpen (open) {
    this.setState({ sidebarOpen: open })
  }

  render () {
    return (
      <Sidebar
        sidebar={<b><Form /></b>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: 'navy blue' } }}
      >
        <button onClick={() => this.onSetSidebarOpen(true)}>
          Open sidebar
        </button>
      </Sidebar>
    )
  }
}

export default SideBar
