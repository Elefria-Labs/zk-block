import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import Providers from '../utils/Providers';

import themes from '../themes';
import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <ThemeProvider theme={themes()}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Providers>
  );
};
export default MyApp;
