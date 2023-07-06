import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: '16px',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
    },
  },
  title: {
    marginBottom: '12px',
    color: '#333',
    fontWeight: 'bold',
  },
  content: {
    minHeight: '90px',
    color: '#666',
  },
  primary: {
    backgroundColor: '#2196f3',
    color: '#fff',
  },
  secondary: {
    backgroundColor: '#f50057',
    color: '#fff',
  },
  success: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  warning: {
    backgroundColor: '#ff9800',
    color: '#fff',
  },
});

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          'https://api.gyanibooks.com/library/get_dummy_notes'
        );
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const getColorClass = (index) => {
    const colors = [
      classes.primary,
      classes.secondary,
      classes.success,
      classes.warning,
    ];
    return colors[index % colors.length];
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Notes List
      </Typography>
      <Grid container spacing={2}>
        {notes.map((note, index) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card className={`${classes.card} ${getColorClass(index)}`}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.title}
                >
                  {note.title}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.content}
                >
                  {note.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NotesList;
