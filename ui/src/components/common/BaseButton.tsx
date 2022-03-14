import { styled, Button } from '@mui/material';

const BaseButton = styled(Button)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  width: '160px',
  cursor: 'pointer',
}));

export default BaseButton;
