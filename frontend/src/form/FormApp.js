import React, { useState, useEffect } from "react";
import { get, post } from "axios";
import { withStyles } from "@material-ui/core/styles";
import { register } from "./form-style";
import { useNavigate, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";

function QuizFormApp(props) {
  const { classes, setData, data } = props;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [time, setTime] = useState(0);
  const [n_q, setN_Q] = useState(0);
  const [file, setFile] = useState({});
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  // useEffect(() => {
  //   console.log(file)
  //   console.log(n_q)
  // }, [file, n_q])

  const fileUpload = () => {
    const url = "https://obscure-stream-30055.herokuapp.com/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("n_q", n_q);
    formData.append("time", time);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  };

  const errorClose = (e) => {
    setErrorOpen(false);
  };

  const isValid = () => {
    return true;
  };

  const isFileValid = () => {
    if (file) {
      if (file.name !== undefined) {
        return true;
      }
      if (file.name == "") {
        return true;
      }
    }
    return false;
  };

  const submitForm = (e) => {
    e.preventDefault();
    fileUpload()
      .then((res) => {
        console.log(res.data)
        if (res.data.status === "200") {
          setData(res.data.message);
          console.log(res.data.message);
        } else if (res.data.status === "400") {
          setError(res.data.message);
          setErrorOpen(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Please Veify All Fields And File Formats");
        setErrorOpen(true);
      });

    // if (!this.passwordMatch()) {
    //   this.setState({
    //     errorOpen: true,
    //     error: "Passwords don't match",
    //   });
    // }
  };
  useEffect(() => {
    if (data) {
      console.log(data)
      navigate("/quiz");
    }
  }, [data, setData]);

  return (
    <div>
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
            Generate Quiz
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
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="n_q" className={classes.labels}>
                Number Of Questions
              </InputLabel>
              <Input
                name="n_q"
                type="number"
                className={classes.inputs}
                disableUnderline={true}
                onChange={(e) => setN_Q(e.target.value)}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="time" className={classes.labels}>
                Enter Quiz Time (in seconds)
              </InputLabel>
              <Input
                name="time"
                type="number"
                className={classes.inputs}
                disableUnderline={true}
                onChange={(e) => setTime(e.target.value)}
              />
            </FormControl>

            <input
              className={classes.input}
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={onChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="raised"
                component="span"
                className={classes.button}
                fullWidth
              >
                {!isFileValid()
                  ? `Select Quiz File`
                  : `File Selected: ${file.name}`}
              </Button>
            </label>
            <Button
              disabled={!isValid()}
              disableRipple
              fullWidth
              variant="outlined"
              className={classes.button}
              type="submit"
              onClick={submitForm}
            >
              Start Quiz
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
                  <IconButton
                    key="close"
                    aria-label="close"
                    onClick={errorClose}
                  >
                    <CloseIcon color="error" />
                  </IconButton>,
                ]}
              />
            </Snackbar>
          ) : null}
        </Paper>
      </div>
      <div className={classes.main}>
        <CssBaseline />

        <Paper className={classes.paper}>
          <Button
            component={Link}
            to="/log"
            disabled={false}
            disableRipple
            fullWidth
            variant="outlined"
            className={classes.button}
          >
            Get Log File
          </Button>
        </Paper>
      </div>
    </div>
  );
}

export default withStyles(register)(QuizFormApp);
