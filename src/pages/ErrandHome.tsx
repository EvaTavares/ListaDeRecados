import { ThemeProvider } from '@emotion/react';
import { Grid, Typography, Divider, TextField, Button, Paper, IconButton } from '@mui/material';

import React, { useEffect, useMemo, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { defaultTheme } from '../themes';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectById } from '../store/modules/contactsSlice';
import { addAllErrands, addErrand, removeErrand, selectAll } from '../store/modules/errandsSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrandType from '../types/ErrandType';
import ContainerChina from '../components/ContainerChina';

const ErrandHome: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const loggedUser = useAppSelector(state => state.loggedUser);
  const userRedux = useAppSelector(state => selectById(state, loggedUser));
  const errandListRedux = useAppSelector(selectAll);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRedux?.errands) {
      dispatch(addAllErrands(userRedux.errands));
    }
  }, [userRedux?.errands, dispatch]);

  useEffect(() => {
    if (!loggedUser) {
      navigate('/');
    }
  }, [loggedUser]);

  const listErrands = useMemo(() => {
    return errandListRedux.map(item => {
      return (
        <React.Fragment key={item.id}>
          <Paper
            elevation={24}
            sx={{
              padding: '20px',
              backgroundColor: '#FFCA48'
            }}
          >
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body1">{item.description}</Typography>

            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(item)}>
              <DeleteIcon />
            </IconButton>
          </Paper>
        </React.Fragment>
      );
    });
  }, [errandListRedux, open]);

  const handleAdd = () => {
    if (!title || !description) {
      Swal.fire({
        title: 'Existem campos vazios, favor preencher',
        icon: 'warning',
        confirmButtonText: 'Confirmar',
        timer: 3000
      });
      return false;
    }
    Swal.fire({
      title: 'Sucesso!',
      text: 'Recado cadastrado com sucesso.',
      icon: 'success',
      confirmButtonText: 'Confirmar',
      timer: 2000
    });

    dispatch(
      addErrand({
        id: uuidv4(),
        title,
        description
      })
    );

    handleClear();
  };

  const handleDelete = (itemDelete: ErrandType) => {
    Swal.fire({
      title: 'Tem certeza que deseja excluir?',
      text: 'Você não poderá reverter isso!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, quero deletar!'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(removeErrand(itemDelete.id));
        // chamar outro dispatch para remover o intem e salvar
        Swal.fire('Deletado!', 'Sua transação foi excluida.', 'success');
      }
    });
  };

  const handleClear = () => {
    setDescription('');
    setDescription('');
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <ResponsiveAppBar />
        <ContainerChina>
          <Grid
            item
            lg={12}
            xs={12}
            style={{
              padding: '20px'
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: '#5C6103',
                textAlign: 'center'
                // fontSize: { xs: '40px', md: '70px', lg: '80px' },
              }}
            >
              Novo Recado - {errandListRedux.length}
            </Typography>
            <Divider />
            <Grid
              item
              container
              spacing={1}
              component="form"
              sx={{
                alignItems: 'center',
                marginTop: '1rem',
                '& .MuiTextField-root': {
                  m: 1,
                  background: ' #fff',
                  borderRadius: '10px'
                }
              }}
              noValidate
              autoComplete="off"
            >
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  type="text"
                  id="outlined-basic"
                  label="Recado"
                  variant="outlined"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </Grid>

              <Grid item xs={5}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Descrição"
                  variant="outlined"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Grid>

              <Grid item xs={2}>
                <Button
                  fullWidth
                  style={{
                    marginLeft: '10px',
                    color: '#FFCA48',
                    height: '3rem',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    backgroundColor: '#5C6103'
                  }}
                  type="button"
                  variant="outlined"
                  onClick={handleAdd}
                >
                  Cadastrar
                </Button>
              </Grid>

              <Grid item xs={12}>
                {/* paper */}
                <Grid item sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {listErrands}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ContainerChina>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default ErrandHome;