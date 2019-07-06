import React from 'react'
import './CircleButton.css'
import propTypes from 'prop-types'


export default function NavCircleButton(props) {
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
  
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}
NavCircleButton.propTypes = {
  tag : propTypes.func,
  to : propTypes.string,
  type: propTypes.string,
  className : propTypes.string,
  children : propTypes.array
} 
NavCircleButton.defaultProps ={
  tag: 'a',
}
