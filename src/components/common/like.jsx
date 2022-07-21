import React, { Component } from "react";

class Like extends Component {
  render() {
    if (!this.props.liked)
      return (
        <i
          onClick={this.props.onClick}
          style={{ cursor: "pointer" }}
          class="fa fa-heart-o"
          aria-hidden="true"
        ></i>
      );
    return (
      <i
        onClick={this.props.onClick}
        style={{ cursor: "pointer" }}
        class="fa fa-heart"
        aria-hidden="true"
      ></i>
    );
    //<i className='classes' aria-hidden="true" />;
  }
}

export default Like;
