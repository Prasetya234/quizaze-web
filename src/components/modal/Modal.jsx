import React, { useEffect, useState } from "react"
import "./index.scss"

const Modal = (props) => {
  const [active, setActive] = useState(false)
  const [render, setRender] = useState(0)
  useEffect(() => {
    setActive(props.active)
  }, [props.active])
  return (
    <>{active ? (
      <div name="modal">
        <div className="modal-mask" id="modal" onClick={(e) => {
          if (e.target.id == "modal") props.close()
        }}>
          <div className="modal-wrapper">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal" style={{ width: props.width ? props.width : "450px", height: props.height ? props.height : "400px" }}>
                  <div style={{ display: "flex", alignItems: 'center', justifyContent: "space-between", marginBottom: "16px" }}>
                    <h3
                      style={{ fontSize: "20px", padding: " 0px 24px", fontWeight: "400", color: "gray" }}
                      id="modal-headline"
                    >
                      {props.title}
                    </h3>
                    <svg
                      style={{ height: "20px", width: "20px", cursor: "pointer" }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      onClick={props.close}
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>

                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >) : <div></div>}
    </>
  )
}

export default Modal