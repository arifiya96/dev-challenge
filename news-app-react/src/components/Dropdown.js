import React from 'react';

//Material UI components used for dropdown
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function Dropdown({title, source, items}){
    return(
        <FormControl style={{width: 300}}>{/*Inline styling preferred for small components. Can change to proptype styling if needed. Always happy to discuss*/}
            <InputLabel>{title}</InputLabel>
            <Select value={source} onChange={(event) => source.onChange(event.target.value)}>
                {items?.map((item_name, index) => (
                    <MenuItem value={item_name} key={index}>{item_name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default Dropdown;
