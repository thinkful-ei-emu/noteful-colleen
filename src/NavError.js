import React from 'react'
import propTypes from 'prop-types'

export default class NavError extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hasError : false,
    }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render(){
    
    if(this.state.hasError){
      return <div><h2>There was an error, try again</h2></div>
    } 
    return this.props.children
  }
}
NavError.propTypes = {
  children: propTypes.object
}