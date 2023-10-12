import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const NumberInput = () => {
  const [value, setValue] = useState(0);

  const handleIncrease = () => {
    setValue(value + 1);
  };

  const handleDecrease = () => {
    setValue(value - 1);
  };

  return (
    <TextField
      type="number"
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={handleDecrease}>
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleIncrease}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default NumberInput;