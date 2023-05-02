import { Grid } from '@mui/material';
import React, { ReactNode } from 'react';
import china from '../image/china.jpg';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }: ContainerProps) => {
  return (
    <Grid container sx={{ background: `url(${china})`, height: '100vh' }}>
      {children}
    </Grid>
  );
};

export default Container;
