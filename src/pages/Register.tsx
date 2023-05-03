import { Box, Button, Grid, TextField, Typography, Link } from '@mui/material';
import React, { useState } from 'react';
import china from '../image/china.jpg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addContact, selectAll } from '../store/modules/contactsSlice';
import InputApp from '../components/InputApp';
import Swal from 'sweetalert2';

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

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const userRedux = useAppSelector(selectAll);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Toast.fire({
        icon: 'warning',
        title: 'As senhas não estão iguais',
        timer: 2000
      });
      // alert('As senhas não estão iguais');
      clearRegister();
      return;
    }

    const findUser = userRedux.find(user => user.email === email);
    if (findUser) {
      Toast.fire({
        icon: 'warning',
        title: 'Usuário já existe',
        timer: 2000
      });
      // alert('Usuário já existe');
      clearRegister();
      return;
    }

    dispatch(addContact({ email, errands: [], password }));

    Toast.fire({
      icon: 'success',
      title: 'Usuário cadastrado com sucesso',
      timer: 2000
    });

    navigate('/');
    return true;
  };

  const clearRegister = () => {
    setEmail(''), setPassword(''), setConfirmPassword('');
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
              variant="h3"
              sx={{
                color: '#FFCA48',
                textAlign: 'center',
                fontSize: { xs: '40px', md: '70px', lg: '80px' },
                marginBottom: '10px'
              }}
            >
              Cadastro
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
              <TextField
                fullWidth
                id="demo-helper-text-misaligned"
                label="E-mail"
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
              <InputApp
                type="password"
                label="Digite novamente a senha"
                onChange={e => {
                  setConfirmPassword(e.target.value);
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
                onClick={handleRegister}
              >
                Cadastrar
              </Button>

              <Typography style={{ marginTop: '2rem', color: '#fff' }}>
                Já possui uma conta?
                <Link
                  variant="h6"
                  onClick={() => navigate('/')}
                  sx={{ textDecoration: 'none', color: '#FFCA48', cursor: 'pointer' }}
                >
                  {' '}
                  Fazer Login!
                </Link>
              </Typography>
              <Copyright sx={{ mt: 5, textAlign: 'center' }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
