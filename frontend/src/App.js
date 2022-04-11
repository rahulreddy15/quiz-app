import React from "react";
import Form from "./form/FormApp";
import QuizApp from "./app/QuizApp";

import { Routes, Route } from "react-router-dom";

function App() {
  const [data, setData] = React.useState(null);
  return (
    <div >
      <Routes>
        <Route path="/" element={ <Form data={data} setData={setData}/>} />
        <Route path="/quiz" element={ <QuizApp data={data}/>} />
      </Routes>
    </div>
  );
}

export default App;
