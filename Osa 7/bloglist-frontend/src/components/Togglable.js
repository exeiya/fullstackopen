import React from 'react'
import PropTypes from 'prop-types'

class Togglable extends React.Component {
  static propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  toggleVisibility = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    const hideWhenShown = { display: this.state.show ? 'none' : '' }
    const showWhenVisible = { display: this.state.show ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenShown}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>Cancel</button>
        </div>
      </div>
    )
  }
}

export default Togglable