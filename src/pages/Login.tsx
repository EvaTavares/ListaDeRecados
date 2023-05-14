import { Box, Button, Grid, Typography, Link } from '@mui/material';

import React, { useState } from 'react';
import china from '../image/china.jpg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAll } from '../store/modules/contactsSlice';
import InputApp from '../components/InputApp';
import Swal from 'sweetalert2';
import { createLoggedUser } from '../store/modules/loggedUser';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/EvaTavares" target="_blank">
        EvaTavares
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

const Login: React.FC = () => {
  const usersRedux = useAppSelector(selectAll);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (!verification()) {
      return;
    }
    dispatch(createLoggedUser(email));
    setTimeout(() => {
      navigate('/errandsHome');
    }, 1000);
  };

  const verification = (): boolean => {
    if (!email || !password) {
      Swal.fire({
        title: 'Existem campos vazios, favor preencher os campos corretamente',
        icon: 'warning',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#5C6103',
        background: '#AE9626',
        timer: 4000
      });
      return false;
    }

    const users = usersRedux.find(user => user.email === email && user.password === password);
    if (!users) {
      Swal.fire({
        title: 'Usuário não encontrado, por favor verifique e-mail ou senha',
        icon: 'warning',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#5C6103',
        background: '#AE9626',
        timer: 4000
      });
      return false;
    }
    Toast.fire({
      icon: 'success',
      title: 'Logado com sucesso',
      timer: 2000
    });
    return true;
  };

  return (
    <>
      <Grid
        container
        sx={{ background: `url(${china})`, height: '100vh', justifyContent: { md: 'flex-end', xs: 'center' } }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={10}
          sm={6}
          md={5}
          sx={{ height: { xs: 'auto', md: '70%' } }}
          justifyContent="center"
          alignItems="center"
          marginRight={{ xs: '0', md: '40px' }}
        >
          <Box
            height="100%"
            maxHeight="100vh"
            display="flex"
            flexDirection="column"
            style={{
              backgroundColor: '#5C6103',
              borderRadius: '10px',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px'
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: '#FFCA48',
                textAlign: 'center',
                fontSize: { xs: '40px', md: '70px', lg: '80px' },
                marginBottom: '20px'
              }}
            >
              Lista de Recados
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: '#FFCA48',
                textAlign: 'center',
                fontSize: { xs: '40px', md: '70px', lg: '80px' },
                marginBottom: '10px'
              }}
            >
              Login
            </Typography>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: '0.5',
                width: '80%',
                minWidth: '200px'
              }}
              component="form"
              sx={{
                '& .MuiTextField-root': {
                  m: 1,
                  background: ' #fff',
                  borderRadius: '10px'
                }
              }}
              noValidate
              autoComplete="off"
            >
              <InputApp
                label="E-mail"
                type="email"
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
              <InputApp
                type="password"
                label="Senha"
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                fullWidth
                style={{
                  marginTop: '10px',
                  color: '#5C6103',
                  backgroundColor: '#FFCA48',
                  height: '3rem',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
                variant="outlined"
                onClick={handleLogin}
              >
                Entrar
              </Button>
              <Box>
                <Typography style={{ marginTop: '2rem', color: '#fff' }}>
                  Não é um membro?{' '}
                  <Link
                    variant="h6"
                    onClick={() => navigate('/register')}
                    sx={{ textDecoration: 'none', color: '#FFCA48', cursor: 'pointer' }}
                  >
                    {' '}
                    Inscreva-se Agora
                  </Link>
                </Typography>

                {/* <Typography
                  sx={{ textDecoration: 'none' }}
                  component={Link}
                  to={'/register'}
                  style={{ color: '#FFCA48' }}
                >
                  Inscreva-se agora
                </Typography> */}
                <Copyright sx={{ mt: 5, textAlign: 'center' }} />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
