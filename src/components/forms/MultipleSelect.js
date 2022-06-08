import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oro',
    'Plata',
    'Oro-Golfi',
    'Diamante',
    'Ruby',
    'Zafiro',
    'Piedra semi-preciosa',
];

export default function MultipleSelectCheckmarks({handleInputChange, values}) {

    return (
        <div>
            <FormControl sx={{ m:1, width: '97%' }} name='materials'>
                <InputLabel id="demo-multiple-checkbox-label">Opc</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={values}
                    onChange={handleInputChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    name='materials'
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={values.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}