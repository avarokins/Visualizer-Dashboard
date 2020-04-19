import React, { Component } from 'react'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import '../CSS/Dropdown.css'

import WordCloud from './WordCloud.js'



class Dropdown extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      value: 'Topic'
    }
  }

  handleChange = (event) => {
    let val = event.target.value
    this.setState({value: val});
    this.props.parentCallback(val)
  }
    


  render () {
    return (<div>
      <FormControl component='fieldset'>
        <FormLabel component='legend' ></FormLabel>
        <h1 className='title'> Filer Settings</h1>
        <RadioGroup className='radios' aria-label='filter' name='filter-title' value={this.state.value} onChange={this.handleChange}>
          <FormControlLabel value='Topic' control={<Radio />} label='Topic' />
          <FormControlLabel value='Sector' control={<Radio />} label='Sector' />
          <FormControlLabel value='Pestle' control={<Radio />} label='Pestle' />
          <FormControlLabel value='Country' control={<Radio />} label='Country' />
          <FormControlLabel value='Region' control={<Radio />} label='Region' />

        </RadioGroup>
      </FormControl>
    </div>
    )
  }
}

export default Dropdown
