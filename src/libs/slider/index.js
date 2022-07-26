import React from 'react';
import { temprature } from '../../utils';
import './slider.css';
class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.innerRef = React.createRef();
        this.slideshowRef = React.createRef();
        this.steps = 100;
        this.state = {
            x: 0,
            originalX: 0,
            afterDragX: 0
        };
    }

    componentDidMount() {
        // const innerContainerWidth = this.innerRef.current.clientWidth;
        // const slideBoxWidth = this.slideshowRef.current.clientWidth;
        this.steps = 200;

        this.maxSlideRight =
            this.innerRef.current.clientWidth - this.slideshowRef.current.clientWidth;
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.handleMouseUp);
    }

    handleLeftClick = () => {
        const { x: currentX } = this.state;

        if (currentX === 0) {
            return;
        }

        this.setState({
            x: currentX + this.steps
        });
    };

    handleRightClick = () => {
        const { x: currentX } = this.state;

        const destination = Math.abs(currentX - this.steps);

        if (destination > this.maxSlideRight) {
            return;
        }
        this.setState({
            x: currentX - this.steps
        });
    };

    get leftControl() {
        const { x } = this.state;
        if (x === 0) {
            return null;
        }
        return (
            <div className="left-control">
                <ArrowButton handleClick={this.handleLeftClick}>
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </ArrowButton>
            </div>
        );
    }

    get rightControl() {
        const { x } = this.state;
        if (Math.abs(x) >= this.maxSlideRight) {
            return null;
        }
        return (
            <div className="right-control">
                <ArrowButton handleClick={this.handleRightClick}>
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </ArrowButton>
            </div>
        );
    }

    get moverBox() {
        const { children } = this.props;
        return (
            <div
                ref={this.innerRef}
                className="mover-1"
                style={{
                    transform: `translateX(${this.state.x}px)`,
                    transition: "0.5s"
                }}
            >
                {children}
            </div>
        );
    }

    handleMouseUp = ({ clientX, clientY }) => {
        const { x: currentX } = this.state;

        const distance = this.state.originalX - clientX;

        if (distance === 0) {
            return;
        }

        let resultedDistance = -distance + currentX;

        if (Math.abs(resultedDistance) > this.maxSlideRight) {
            resultedDistance = -this.maxSlideRight;
        }

        if (resultedDistance > 0) {
            resultedDistance = 0;
        }

        this.setState(
            {
                x: resultedDistance
            },
            () => {
                console.log("after handle mouse up, current x is ", this.state.x);
            }
        );
    };
    handleMouseDown = event => {
        const { clientX } = event;
        this.setState({
            originalX: clientX
        });
    };

    handleDragStart = () => {
        console.log("on drag start");
    };

    render() {
        return (
            <div className="container-fluid d-flex my-5" onClick={this.onScroll}>
                {this.leftControl}
                <div
                    className="slideshow"
                    ref={this.slideshowRef}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    onDrag={this.handleDragStart}
                >
                    {this.moverBox}
                </div>
                {this.rightControl}
            </div>
        );
    }
}

function ArrowButton(props) {
    return (
        <div className="arrow-box" onClick={props.handleClick}>
            <span className="arrow">
                <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    {props.children}
                </svg>
            </span>
        </div>
    );
}
const tempratureRapper = (temp = 0, is_celcius = true) => {
    return `${temprature(is_celcius, temp)}${is_celcius ? `°C` : `°F`}`
}
const Card = props => {
    console.log('props', props);
    return <div className="card">
        <div className="header" style={{ background: props.headerColor }}> Weather Card{props.title}</div>
        <div className="content">
            <ul className="Card_listing">
                <li className="listing">
                    <span className='carlisting_title'>Date :</span> {`${new Date(props.item.dt_txt).toUTCString()}`}
                </li>
                <li className="listing">
                    <span className='carlisting_title'>Temprature :</span>   {`${tempratureRapper(props.item.main.temp, props.is_celcius)}`}
                </li>
                <li className="listing">
                    <span className='carlisting_title'>Weather :</span> {`${props.item.weather[0].description}`}
                </li>
                <li className="listing">
                    <span className='carlisting_title'>Today's high temperature :</span> {`${tempratureRapper(props.item.main.temp_max, props.is_celcius)}`}
                </li>
                <li className="listing">
                    <span className='carlisting_title'>Today's low temperature :</span> {`${tempratureRapper(props.item.main.temp_min, props.is_celcius)}`}
                </li>
                <li className="listing">
                    <span className='carlisting_title'>Humidity :</span> {`${props.item.main.humidity}%`}
                </li>
                <li className="listing">
                    <span className='carlisting_title'>Wind Speed : </span> {`${props.item.wind.speed}km/h`}
                </li>
                <div><img className="card_weather_icon" src={require('../../assets/rainy-day.png')} alt="" /></div>
            </ul>
        </div>
    </div>
};


export default ({ data = [], is_celcius = true }) => {

    const DivBox = props => {
        return (
            <div
                key={props.key}
                style={{
                    background: props.color,
                    width: "200px",
                    height: "90%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white"
                }}
            >
                <h1> DIV {props.number + 1} </h1>
            </div>
        );
    };

    const generateBoxes = () => {
        const boxes = [];
        for (let i = 0; i < 10; i++) {
            boxes.push(<DivBox key={i} number={i} color={getRandomColor()} />);
        }
        return boxes;
    };
    return (
        <div className="App">
            <React.Fragment>
                <Slider>{data.map((item, index) => (
                    <Card key={`card-index-${index}`} item={item} is_celcius={is_celcius} />
                ))}
                </Slider>
            </React.Fragment>

        </div>
    );
}

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


