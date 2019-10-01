import React from 'react';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { useInput } from '../hooks/useInput'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}



function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

	const [character, setCharacter, handleChanges] = useInput({
		name: '',
		bio: ''
	})

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
	};
	
	

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Add Character
      </button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="standard-name"
                label="Name"
								name="name"
								onChange={handleChanges}
								value={character.name}
                className={classes.textField}
                margin="normal"
            />

            <TextField
                id="standard-name"
                label="Bio"
								name="bio"
								onChange={handleChanges}
								value={character.bio}
                className={classes.textField}
                margin="normal"
            />
        </form>
        <button onClick={() => {
					handleClose()
					props.addUser(character)
					setCharacter({ name: '', bio: '' })
					props.setUsers([...props.users, character])
				}} >Add</button>
        </div>
      </Modal>
    </div>
  );
}