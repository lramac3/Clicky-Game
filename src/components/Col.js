import React from 'react'
import './style.css'

const Col = props => {
  const size = props.size
    .split(' ')
    .map(size => 'col-' + size)
    .join(' ')
  return <div className={`${size} text-center`}>{props.children}</div>
}

export default Col;
