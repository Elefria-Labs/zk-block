import { GlobalHeader } from '@components/global-header';
import { PageWrapper } from '@components/page-wrapper';
import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { Footer } from '@components/footer';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  return (
    <div>
      {props.meta}
      <div style={{ paddingLeft: '0px', paddingTop: '0px' }}>
        <PageWrapper>
          <GlobalHeader variant={'transparent'} />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            // TODO
            minH="94vh"
          >
            <Box display="flex" flexDirection="column" flex="1">
              {props.children}
            </Box>
            <Footer />
          </Box>
        </PageWrapper>
      </div>
    </div>
  );
};
export { Main };
