import React from "react";

import Button from "@material-ui/core/Button";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { post } from "axios";
import addCssTransition from "../../utils/css-transition";
import questionStyle from "./result-style";
import theme from "../../styles/theme";

class Result extends React.Component {
  sendResults = () => {
    let result = "";
    result +=
      "Number Of Questions Asked: " + this.props.result.n_questions + "\n";
    result +=
      "Number Of Questions Answered: " + this.props.result.answered + "\n";
    result +=
      "Number Of Correct Answers: " + this.props.result.correctAnswers + "\n";
    result +=
      "Number Of Incorrect Answers: " +
      (this.props.result.answered - this.props.result.correctAnswers) +
      "\n";
    result +=
      "Percentage Correct: " +
      (this.props.result.correctAnswers / this.props.result.answered) * 100 +
      "%\n";
    result += "Time Elapsed: " + this.props.result.quizTime + " seconds\n";

    const data = new FormData();
    data.append("result", result);
    data.append("name", this.props.name);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    post("https://obscure-stream-30055.herokuapp.com/updateLogFile", data, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { classes } = this.props;
    console.log(this.props);
    this.sendResults();
    return (
      <MuiThemeProvider theme={theme}>
        {addCssTransition(
          <div>
            <pre className={classes.resultParagraph}>
              Number Of Questions Asked: {this.props.result.n_questions}
            </pre>
            <pre className={classes.resultParagraph}>
              Number Of Questions Answered: {this.props.result.answered}
            </pre>
            <pre className={classes.resultParagraph}>
              Number Of Correct Answers: {this.props.result.correctAnswers}
            </pre>
            <pre className={classes.resultParagraph}>
              Number Of Incorrect Answers:{" "}
              {this.props.result.answered - this.props.result.correctAnswers}
            </pre>
            <pre className={classes.resultParagraph}>
              Percentage Correct:{" "}
              {(this.props.result.correctAnswers / this.props.result.answered) *
              100
                ? (this.props.result.correctAnswers /
                    this.props.result.answered) *
                  100
                : 0}
              %
            </pre>
            <pre className={classes.resultParagraph}>
              Time Elapsed: {this.props.result.quizTime} seconds
            </pre>

            <Button
              variant="contained"
              className={classes.resetButton}
              color="secondary"
              onClick={() => this.props.history.push("/")}
            >
              Try Again
            </Button>
            <a href="/">
              <Button
                variant="contained"
                className={classes.resetButton}
                color="secondary"
              >
                Go Home
              </Button>
            </a>
          </div>
        )}
      </MuiThemeProvider>
    );
  }
}

export default withStyles(questionStyle)(Result);
