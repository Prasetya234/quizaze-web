/* eslint-disable indent */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import './index.scss';

function Button({ title, action }) {
    return <button className="glow-on-hover" type="button" onClick={action}>{title}</button>;
}

export default Button;
