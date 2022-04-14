import React, { useState } from "react";
import { post } from "axios";
import { withStyles } from "@material-ui/core/styles";
import { register } from "./form-style";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Modal from "@material-ui/core/Modal";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";

function LogApp(props) {
  const { classes } = props;

  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [logData, setLogData] = useState([]);
  const [showLogData, setShowLogData] = useState(false);


  const logFileRequest = () => {
    const url = "https://obscure-stream-30055.herokuapp.com/getLogFile";
    const formData = new FormData();
    formData.append("name", name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return post(url, formData);
  };

  const errorClose = (e) => {
    setErrorOpen(false);
  };

  const isValid = () => {
    if (name === "" || name === null) {
      return false;
    }
    {
      return true;
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (isValid()) {
      logFileRequest()
        .then((res) => {
          if (res.data.status_code === "400") {
            setError(res.data.message);
            setErrorOpen(true);
          } else if (res.data.status_code === "200") {
            setLogData(res.data.message);
            setShowLogData(true);
            console.log(res.data);
          }
        })
        .catch((err) => {
          setError(err.response.message);
          setErrorOpen(true);
        });
    } else {
      setError("Name is required");
      setErrorOpen(true);
    }
  };

  return (
    <div className={classes.main}>
      <CssBaseline />

      <Paper className={classes.paper}>
        <Button
          disabled={false}
          disableRipple
          fullWidth
          variant="outlined"
          className={classes.button}
        >
          Log Files
        </Button>
        <form className={classes.form} onSubmit={() => submitForm()}>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="name" className={classes.labels}>
              Name
            </InputLabel>
            <Input
              name="name"
              type="text"
              autoComplete="name"
              className={classes.inputs}
              disableUnderline={true}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <Button
            disableRipple
            fullWidth
            variant="outlined"
            className={classes.button}
            type="submit"
            onClick={submitForm}
          >
            Get Log File
          </Button>
          <Button
            component={Link}
            to="/"
            disabled={false}
            disableRipple
            fullWidth
            variant="outlined"
            className={classes.button}
          >
            Go Home
          </Button>
        </form>

        {error ? (
          <Snackbar
            variant="error"
            key={error}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={errorOpen}
            onClose={errorClose}
            autoHideDuration={3000}
          >
            <SnackbarContent
              className={classes.error}
              message={
                <div>
                  <span style={{ marginRight: "8px" }}>
                    <ErrorIcon fontSize="large" color="error" />
                  </span>
                  <span> {error} </span>
                </div>
              }
              action={[
                <IconButton key="close" aria-label="close" onClick={errorClose}>
                  <CloseIcon color="error" />
                </IconButton>,
              ]}
            />
          </Snackbar>
        ) : null}
      </Paper>
      <Modal open={showLogData} className={classes.modalStyle1}>
        <div>
        <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={(e) => setShowLogData(false)}
          >
            Close
          </Button>
          <pre><code>{JSON.stringify(logData, null, 4)}</code></pre>
        </div>
      </Modal>
    </div>
  );
}

export default withStyles(register)(LogApp);

          // {logData.map((log, index) => {
          //   return (
          //     <div key={index}>
          //       <p>{log}</p>
          //     </div>
          //   );
          // })}