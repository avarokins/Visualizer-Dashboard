import React, { Component } from 'react'
import data from '../data/jsondata.json'
import ReactWordCloud from 'react-wordcloud'
import 'd3-transition'
import { select } from 'd3-selection'
import TopItems from './TopItems.js'
import SearchTable from './SearchTable.js'

class WordCloud extends Component {
  constructor (props) {
    super(props)

    // State
    this.state = {
      query: 'Topic'
    }
    this.finalWordsArray = []

    var wordArray = []
    // Parse data
    for (var key in data) {
      // Get all elements of each object
      var year = data[key].year
      var intensity = data[key].intensity
      var sector = data[key].sector
      var topic = data[key].topic
      var insight = data[key].insight
      var url = data[key].url
      var region = data[key].region
      var start_year = data[key].start_year
      var impact = data[key].impact
      var added = data[key].added
      var published = data[key].published
      var country = data[key].country
      var relevance = data[key].relevance
      var pestle = data[key].pestle
      var source = data[key].source
      var title = data[key].title
      var likelihood = data[key].likelihood

      // Remove punctuations
      var regex = /[.,-]/g
      source = source.replace(regex, '')
      title = title.replace(regex, '')

      // Create array of all words

      if (this.state.query == 'Topic') {
        var arr = topic.split(/\s+/)
        for (var word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
      } else if (this.state.query == 'Sector') {
        arr = sector.split(/\s+/)
        for (word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
      } else if (this.state.query == 'Pestle') {
        arr = pestle.split(/\s+/)
        for (word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
      } else if (this.state.query == 'Country') {
        arr = country.split(/\s+/)
        for (word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
      } else if (this.state.query == 'Region') {
        arr = region.split(/\s+/)
        for (word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
      }
    }

    // Create words.json basically
    var wordsJSON = createWordMap(wordArray)
    this.finalWordsArray = sortByCount(wordsJSON)
    getCallback = getCallback.bind(this)
  }
  // Array to hold all words only

  componentDidUpdate (prevProps) {
    if (this.props.q != prevProps.q) {
      this.setState({ query: this.props.q })

      var wordArray = []
      // Parse data
      for (var key in data) {
        // Get all elements of each object
        var year = data[key].year
        var intensity = data[key].intensity
        var sector = data[key].sector
        var topic = data[key].topic
        var insight = data[key].insight
        var url = data[key].url
        var region = data[key].region
        var start_year = data[key].start_year
        var impact = data[key].impact
        var added = data[key].added
        var published = data[key].published
        var country = data[key].country
        var relevance = data[key].relevance
        var pestle = data[key].pestle
        var source = data[key].source
        var title = data[key].title
        var likelihood = data[key].likelihood

        // Remove punctuations
        var regex = /[.,-]/g
        source = source.replace(regex, '')
        title = title.replace(regex, '')

        // Create array of all words
        if (this.props.q == 'Topic') {
          var arr = topic.split(/\s+/)
          for (var word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
        } else if (this.props.q == 'Sector') {
          arr = sector.split(/\s+/)
          for (word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
        } else if (this.props.q == 'Pestle') {
          arr = pestle.split(/\s+/)
          for (word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
        } else if (this.props.q == 'Country') {
          arr = country.split(/\s+/)
          for (word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
        } else if (this.props.q == 'Region') {
          arr = region.split(/\s+/)
          for (word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
        }
      }

      // Create words.json basically
      var wordsJSON = createWordMap(wordArray)
      this.finalWordsArray = sortByCount(wordsJSON)
    }
  }

  render () {
    return (
      <div className='word-cloud'>
        <ReactWordCloud callbacks={callbacks} options={options} words={this.finalWordsArray} />
        <TopItems q={this.finalWordsArray} />
        <SearchTable />
      </div>
    )
  }
}

// Options for wordcloud
const options = {
  colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
  enableTooltip: true,
  deterministic: false,
  fontFamily: 'impact',
  fontSizes: [15, 80],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 0,
  rotations: 2,
  rotationAngles: [0, 90],
  scale: 'sqrt',
  spiral: 'archimedean',
  transitionDuration: 1000
}

function getCallback (callback) {
  return function (word, event) {
    const isActive = callback !== 'onWordMouseOut'
    const element = event.target
    const text = select(element)
    text
      .on('click', () => {
        if (isActive) {
          console.log(word.text)
        }
      })
      .transition()
      .attr('background', 'white')
      .attr('text-decoration', isActive ? 'underline' : 'none')
  }
}

const callbacks = {
  getWordTooltip: word =>
    `The word "${word.text}" appears ${word.value} times.`,
  onWordClick: getCallback('onWordClick'),
  onWordMouseOut: getCallback('onWordMouseOut'),
  onWordMouseOver: getCallback('onWordMouseOver')
}

// Helper function to create wordsJSON
function createWordMap (wordArray) {
  var wordMap = {}

  for (var i in wordArray) {
    if (wordMap.hasOwnProperty(wordArray[i])) {
      wordMap[wordArray[i]] += 1
    } else {
      wordMap[wordArray[i]] = 1
    }
  }

  return wordMap
}

function sortByCount (wordsMap) {
  // sort by count in descending order
  var finalWordsArray = []
  finalWordsArray = Object.keys(wordsMap).map(function (key) {
    return {
      text: key,
      value: wordsMap[key]
    }
  })

  finalWordsArray.sort(function (a, b) {
    return b.total - a.total
  })

  return finalWordsArray
}

export default WordCloud
