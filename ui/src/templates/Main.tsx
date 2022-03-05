import { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  return (
    <div>
      {props.meta}
      <div>
        <div>{/* <MiniDrawer /> */}</div>
        {/* TODO make this dynamic */}
        <div style={{ paddingLeft: '0px', paddingTop: '0px' }}>
          {props.children}
        </div>
      </div>
    </div>
  );
};
export { Main };
