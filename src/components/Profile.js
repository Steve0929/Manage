import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class Profile extends Component{
  state = {

  }

  render(){
    if(this.props.authRedux.auth === false) return <Redirect to = '/'/>
    if(this.props.authRedux.auth === null) return <Redirect to = '/'/>
    return(
      <div>
      <Grid container spacing={0} alignItems="center" justify="center" direction="column">
      <Grid item xs={12} style={{width: '70%'}}>
      <Card style={{marginTop: '25px'}}>
        <CardHeader
           title={this.props.currentUserRedux.nombre+' '+this.props.currentUserRedux.apellido}
           subheader= {this.props.currentUserRedux.email}
         />
         <CardContent style={{paddingTop: '0px'}}>
         <Typography component="p"  align='justify'>{this.props.currentUserRedux.apellido}</Typography>
         </CardContent>
         <Divider/>
      </Card>
      </Grid>
      </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    authRedux: state.auth,
    currentUserRedux: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
