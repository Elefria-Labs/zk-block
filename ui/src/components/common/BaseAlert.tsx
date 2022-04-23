import { styled, Alert } from '@mui/material';

export const maxButtonWidth = '160px';
export const maxButtonHeight = '40px';
const BaseAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
}));

export default BaseAlert;
