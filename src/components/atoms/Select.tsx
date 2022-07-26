import React from 'react';
import { selectOptions } from '../../types/index';
interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    data: Array<selectOptions>
}
const Select: React.FC<IProps> = (props) => {
    return (
        <select {...props} className="form-select" aria-label="Default select example">
            {(props.data || []).map(({ id, value }) => (
                <option key={`option-id-${id}`} value={value} >
                    {value}
                </option>
            ))}
        </select>
    )
}
export default Select;
