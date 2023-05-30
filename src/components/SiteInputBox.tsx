import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Site } from '../types'; // ListItem 타입 가져오기

interface InputBoxProps {
  onAddItem: (item: Site) => void;
  error: boolean;
  errorMessage: string;
}

const InputBox: React.FC<InputBoxProps> = ({ onAddItem, error, errorMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = inputValue.trim();
    if (url) {
      const newItem: Site = {
        id: Date.now(),
        url,
      };
      onAddItem(newItem);
      setInputValue('');
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleFormSubmit}
    >
      <TextField
        label="URL"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        error={error}
        helperText={errorMessage}
        sx={{ width: '35ch' }}
        size="small"
      />
      <Button variant="contained" size="large" startIcon={<AddIcon />} type="submit">
        ADD
      </Button>
    </Box>
  );
};

export default InputBox;
