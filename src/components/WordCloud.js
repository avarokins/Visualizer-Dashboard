import React, { Component } from 'react'
import data from '../data/jsondata.json'
import ReactWordCloud from 'react-wordcloud'

class WordCloud extends Component {
  componentDidMount () {
    this.finalWordsArray = []
  }

  constructor (props) {
  	super(props)

  	// Array to hold all words only
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
    	var arr = sector.split(/\s+/)
    	for (var word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
    	arr = insight.split(/\s+/)
    	for (word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
    	arr = title.split(/\s+/)
    	for (word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
    	arr = topic.split(/\s+/)
    	for (word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
      	arr = source.split(/\s+/)
    	for (word in arr) { if (arr[word].length > 3)wordArray.push(arr[word]) }
    }

    // Create words.json basically
    var wordsJSON = createWordMap(wordArray)
    this.finalWordsArray = sortByCount(wordsJSON)
  }

  render () {
    return (
      	<div className='word-cloud'>
        	<ReactWordCloud options={options} words={this.finalWordsArray} />
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
	  fontSizes: [5, 60],
	  fontStyle: 'normal',
	  fontWeight: 'normal',
	  padding: 0,
	  rotations: 3,
	  rotationAngles: [0, 90],
	  scale: 'sqrt',
	  spiral: 'archimedean',
	  transitionDuration: 1000
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
