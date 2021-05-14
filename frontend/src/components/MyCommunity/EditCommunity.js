import React,{useState} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import RedditIcon from "@material-ui/icons/Reddit";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Apirequest from "../../backendRequestApi";
import axios from "axios";



const useStyles = makeStyles((theme) => ({
    root1: {
      height: "100vh",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper1: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));

export const EditCommunity = (communityID) => {
    console.log("Child",communityID)
    const classes = useStyles();
    const [inputs, setInputs] = useState({});
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
  
// let rule = []
    const [fields, setFields] = useState([{  }]);
   
  
    function handleAdd() {
      const values = [...fields];
      values.push({ });
      setFields(values);
    }
  
    function handleRemove(i) {
      const values = [...fields];
      values.splice(i, 1);
      setFields(values);
    }
 

      function handleInputChange1(e, index) {
        const {name, value} = e.target;
        const list = [...fields];
        list[index][name] = value;
        setFields(list);
        
      }
    

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleInputChange = (event) => {
        event.persist();

        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
          }));
      
      };
      
    
      const fileSelectedHandler = (e) => {
        setFiles({ files: [...files, ...e.target.files] })
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        console.log(inputs)
        console.log(fields)
        setInputs((inputs) => ({
            ...inputs,
            rules:files,
            communityID: communityID,
          }));
          console.log(inputs)
    axios
      .post(`${Apirequest}/api/community/editCommunity`, inputs)
      .then(( response ) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      }); 
    handleClose();
};

    return (
        <div>
            
<Button size="small" color="primary" onClick={handleOpen}>
 Edit
</Button>
<Modal
open={open}
onClose={handleClose}
aria-labelledby="simple-modal-title"
style={{ overflow: 'scroll' }}
aria-describedby="simple-modal-description"
>
<Container>
  <Grid container component="main" className={classes.root1}>
    <CssBaseline />
    <Grid
      item
      xs={12}
      sm={8}
      md={7}
      component={Paper}
      elevation={6}
      square
    >
      <div className={classes.paper1}>
        <Avatar className={classes.avatar}>
          <RedditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Edit Community
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          noValidate
        >
          <br />
          <TextField
          id="outlined-multiline-flexible"
          label="description"
          multiline
          rows={4}
          variant="outlined"
            required
            fullWidth
            name="description"
            onChange={handleInputChange} 
          />
          <br /><br />
          <input type="file" multiple onChange={fileSelectedHandler} />
          <br /><br />
         
    
          <Button type="button" onClick={() => handleAdd()}>
            +
          </Button>
          <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.formRow}
        >
          {fields.map((field, idx) => {
            return (
              <div key={`${field}-${idx}`}>
              <TextField
              variant="outlined"
              margin="normal"
              required
              onChange={e=> handleInputChange1(e,idx)}
              id="RuleTitle"
              label="Rule Title"
              name="RuleTitle"
              autoComplete="RuleTitle"
             
                />
                &nbsp;
                &nbsp;
                <TextField
                id="outlined-multiline-flexible"
                label="description"
                multiline
                rows={4}
                variant="outlined"
                  required
                  name="Ruledescription"
                  onChange={e=> handleInputChange1(e,idx)}
                />
                <Button type="button" onClick={() => handleRemove(idx)}>
                  X
                </Button>
              </div>
            );
          })}
          </Grid>
   <br/><br/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>

          <Box mt={5}></Box>
        </form>
      </div>
    </Grid>
  </Grid>
  </Container>
</Modal>
</div>
    )
}





