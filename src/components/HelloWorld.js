import React, {Component} from 'react'

export default class HelloWorld extends Component {
  plus(a,b) {
    return a+b;
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
}
