import { styled, Button } from '@mui/material';

export const maxButtonWidth = '160px';
export const maxButtonHeight = '40px';

const BaseButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  border: '2px solid black',
  width: maxButtonWidth,
  height: maxButtonHeight,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

export default BaseButton;
