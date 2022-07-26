import * as React from 'react';
import Button from '../../components/atoms/Button';
import { useAppDispatch } from '../../hooks/store.hook';
import { temprature_toggle } from '../../redux/reducer-slices/weather.forecast.slice';
import './temprature.css';
type Props = {
}
const defaultProps = {
}
const Temprature: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const [activeIndex, setActiveIndex] = React.useState<number>(0)
    return <div className="col-sm-6 col-md-6 col-lg-6">
        <div><span className="converter_label">Temprature Convertor</span></div>
        <div className="d-flex align-items-center my-5">
            {
                ['Celcius', 'Fahrenheit'].map((title, idx) => (
                    <Button key={`btn-${idx}`} className={`map_btns ${idx === activeIndex ? 'active-btn' : ''}`} onClick={() => {
                        setActiveIndex(idx);
                        dispatch(temprature_toggle(!idx));
                    }}>{title}</Button>
                ))
            }
        </div>
    </div>
}

Temprature.defaultProps = defaultProps;

export default Temprature;