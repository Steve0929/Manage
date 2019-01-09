<div style={{ marginTop: '10%'}}></div>
  <Timeline mode="alternate">
    <Timeline.Item color='green' dot={<Icon type="rocket" theme="twoTone" style={{ fontSize: '36px' }} />}>
        <div className="card z-depth 1">
        <div className="card-content">
          <span className="card-title">Proyecto creado {date}</span>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          Nombre: {this.props.proyectRedux.titulo}
        </div>
        </div>
    </Timeline.Item>
    {this.props.proyectRedux.acciones.map(accion =>{ //cycle por los proyectos
      return (
        <Timeline.Item key={accion._id}>
          <Collapsible popout defaultActiveKey={1}>
          <CollapsibleItem header={accion.titulo} icon='filter_drama'>
            {accion.accion}
          </CollapsibleItem>
          </Collapsible>
        </Timeline.Item>
      )
    })}
  <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Technical testing 2015-09-01</Timeline.Item>
  </Timeline>
  <button className="btn blue" onClick={this.handleClickOpen2} style={{marginLeft: '15px'}}>Añadir una acción</button>
   <Dialog open={this.state.open2} onClose={this.handleClose2}  maxWidth={'sm'} fullWidth={true}
           aria-labelledby="form-dialog-title" TransitionComponent={Transition}>
     <DialogTitle id="form-dialog-title">Añadir una acción</DialogTitle>
     <DialogContent style={{padding: '30px'}}>
       <DialogContentText>
         Por favor ingresa la información correspondiente.
       </DialogContentText>
       <div className="input-field">
         <label htmlFor="accion"> Acción </label>
         <input type="text" id="tituloAccion" onChange={this.handleChangeInputAction}/>
       </div>
       <div className="input-field">
         <label htmlFor="descripcion"> Descripción </label>
         <input type="text" id="descrpAccion" onChange={this.handleChangeInputAction}/>
       </div>
     </DialogContent>
     <DialogActions>
       <Button onClick={this.añadirAccioon(clone)} color="primary">Añadir</Button>
     </DialogActions>
   </Dialog>


//////////
<MuiThemeProvider theme={theme}>
<Paper style={{marginTop: '45px'}} className={styles.root}>
<AppBar position="static">
    <Tabs value={this.state.tab} onChange={this.handleTabChange} fullWidth >
      <Tab label="Todo" />
      <Tab label="Pendientes" />
      <Tab label="Completados" />
    </Tabs>
</AppBar>
    {this.state.tab === 0 && <TabContainer>
      {this.props.proyectRedux.actividades.map((actividad, index) =>{ //cycle por las actv
        return (
        <div key={actividad._id}>
         <span>
          <Checkbox checked={actividad.completado} onClick={this.handleCheck(actividad,index,clone)}/>
          {actividad.actividad}
          <p style={{float: 'right'}}>Tiempo: {actividad.horas} horas </p></span>
          <Divider/>
        </div>
        )
      })}

    </TabContainer>}
    {this.state.tab === 1 && <TabContainer>
      {this.props.proyectRedux.actividades.map((actividad, index) =>{ //cycle por las actv
        if(actividad.completado == false){
          return (
          <div key={actividad._id}>
            <Checkbox
             checked={actividad.completado}
             onClick={this.handleCheck(actividad,index,clone)}

           />
           {actividad.actividad}
          <Divider/>
          </div>
          )
        }
      })}
    </TabContainer>}
    {this.state.tab === 2 && <TabContainer>
      {this.props.proyectRedux.actividades.map((actividad, index) =>{ //cycle por las actv
        if(actividad.completado == true){
          return (
          <div key={actividad._id}>
            <Checkbox
             checked={actividad.completado}
             onClick={this.handleCheck(actividad,index,clone)}

           />
           {actividad.actividad}
          <Divider/>
          </div>
          )
        }
      })}
    </TabContainer>}
<div className="card-action grey lighten-4 grey-text">
<button className="btn indigo accent-2" style={{margin: '15px'}} onClick={this.handleClickOpen3}> Añadir actividad</button>
</div>
</Paper>
</MuiThemeProvider>


////////
<div style={{flexGrow: '1'}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton style={{marginLeft: '-12',  marginRight: '20'}} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" style={{flexGrow: '1'}}>
          ddd
          </Typography>
          aaaa
        </Toolbar>
      </AppBar>
</div>

///
<div  style={{marginTop: '30px'}} className="container section projectInfo">
