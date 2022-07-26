import * as React from 'react';
import './header.css';
type Props = {
    title?: string
}
const defaultProps = {
    title: 'The Weather App'
}
const Header: React.FC<Props> = (props) => {
    return <div className="header container-fluid" >
        <div><span className="daily_forecast_label">{props.title}</span></div>
        <img className="logo" src={require('../../assets/Logo.png')} />
    </div >
}

Header.defaultProps = defaultProps;

export default Header;