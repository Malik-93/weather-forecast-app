import * as React from 'react';
import Input from '../../components/atoms/Input';
import { getLatLongAndData } from '../../utils';
import './search.css';
type Props = {
}
const defaultProps = {
}
const Search: React.FC<Props> = (props) => {
    const [value, setValue] = React.useState<string>('');
    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        ev.preventDefault();
        setValue(`${ev.currentTarget.value}`);
    }
    const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (`${ev.key}`.toLowerCase() === 'enter') {
            console.log(value);
            getLatLongAndData(value, true);
            setValue('');
        }
    }
    return <div className="search_box" >
        <Input
            placeholder='Search by city, country...'
            className="form-control"
            type="search"
            aria-label="Search"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            data-testid="search-input"
        />
    </div >
}

Search.defaultProps = defaultProps;

export default Search;