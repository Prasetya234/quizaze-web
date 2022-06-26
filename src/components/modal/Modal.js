import React from "react"
import "./index.scss"

class Modal extends React.Component {
  render() {
    console.log(this.props.children);
    return (
      <div className={this.props.active ? "display-block" : "display-none"} >
        <section className="modal-main">
          {this.props.children}
          <button type="button" onClick={this.props.close}>
            Close
          </button>
        </section>
      </div>
    )
  }
}

export default Modal