import React from 'react'
import propTypes from 'prop-types'

export default class MainError extends React.Component {
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
    if (this.state.hasError){
    return <div><h2>Something went wrong, go back and try again!</h2></div>
  }
  return this.props.children
  }
}

MainError.propTypes = {
  children: propTypes.object
}