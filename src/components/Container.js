import React from 'react'
import './style.css'

const Container = props => (
  <div className={`container ${props.cls}`}>{props.children}</div>
)

export default Container;
