import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { Grid, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { updateErrand } from '../store/modules/errandsSlice';

interface ModalEdit {
  openModal: boolean;
  actionCancel: () => void;
  id?: string;
  title: string;
  description: string;
}

const ModalEdit: React.FC<ModalEdit> = ({ actionCancel, description, openModal, title, id }) => {
  const [titleEdit, setTitleEdit] = React.useState<string>('');
  const [descriptionEdit, setDescriptionEdit] = React.useState<string>('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTitleEdit(title);
    setDescriptionEdit(description);
  }, [title, description]);

  const handleEdit = () => {
    if (id) {
      dispatch(updateErrand({ id, changes: { title: titleEdit, description: descriptionEdit } }));
    }
    actionCancel();
  };

  return (
    <Grid container>
      <Dialog
        open={openModal}
        onClose={actionCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Typography variant="h4" textAlign="center" mt="10px">
          Editar Recado
        </Typography>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              label="Recado"
              name="Recado"
              type="text"
              value={titleEdit}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onChange={e => setTitleEdit(e.target.value)}
            />
            <TextField
              label="Descrição"
              name="Descrição"
              type="text"
              value={descriptionEdit}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onChange={e => setDescriptionEdit(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={actionCancel}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleEdit}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ModalEdit;
