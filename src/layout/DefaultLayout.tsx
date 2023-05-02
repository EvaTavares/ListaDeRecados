import { Grid } from '@mui/material';
import React from 'react';

interface DefaultLayoutProps {
  component: React.FC;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ component: Component }) => {
  return (
    <Grid container sx={{ height: '100vh', backgroundImage: 'url("./image/china.jpg")' }}>
      <Grid item xs={12}>
        <Component />
      </Grid>
    </Grid>
  );
};

export default DefaultLayout;
