import "./index.scss"

const Button = ({title, action}) => {
    return <button className="glow-on-hover" type="button" onClick={action} >{title}</button>

}

export default Button;