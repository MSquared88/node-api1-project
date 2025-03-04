import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    background: 'black',
    opacity: .9,
    color: 'white',
    margin: "5px 5px"
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  console.log(props)
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.user.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.user.bio}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button 
        size="small" 
        color="primary"
        onClick= {() => props.deleteUser(props.user.id)}
        >
          Delete
        </Button>
        <Button size="small" color="primary">
          Update
        </Button>
      </CardActions>
    </Card>
  );
}