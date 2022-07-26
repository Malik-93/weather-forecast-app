import * as React from 'react';
import Select from '../../components/atoms/Select';
import './zip.css'
type Props = {
}
const defaultProps = {
}
const Header: React.FC = (props) => {
    return <div className="select_dropdown" >
        <Select defaultValue={'1'} data={
            [{
                id: 1,
                value: 'By Name'

            },
            {
                id: 2,
                value: 'By Zip Code'

            }]} />
    </div >
}

Header.defaultProps = defaultProps;

export default Header;