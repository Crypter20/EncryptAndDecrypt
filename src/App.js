import "./App.css";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API } from "./api_service";

function App() {
  document.title = "Crypto Web-App";

  const algo_list = [
    "Vignere Cipher",
    "Caesar Cipher",
    "Morse Code",
    "Running Key Cipher",
    "ROT13",
  ];
  const operation_list = ["encrypt", "decrypt"];

  const [algo, setAlgo] = useState(algo_list[0]);
  const [operation, setOperation] = useState(operation_list[0]);
  const [result, setResult] = useState("");
  const [text, setText] = useState("");
  const [key, setKey] = useState("");

  const alphaExp = /[^a-zA-Z ]/;
  const numExp = /[^0-9]/;

  const textKeyEmptyToast = () => {
    toast.error("Text and/or Key cannot be empty ", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const alphabetExpToast = () => {
    toast.error("Text and/or Key can contain only alphabets", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const getResult = () => {
    if (algo === "Caesar Cipher") {
      if (numExp.test(key) === true) {
        toast.error("Key can have only positive numerical values", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (key.length === 0 || text.length === 0) {
        textKeyEmptyToast();
      } else {
        API.caesarAPI({
          operation: operation,
          text: text,
          key: parseInt(key),
        }).then((resp) => setResult(resp.result));
      }
    } else if (algo === "Morse Code") {
      if (text.length === 0) {
        textKeyEmptyToast();
      } else {
        API.morseCodeAPI({
          operation: operation,
          text: text,
        }).then((resp) => setResult(resp.result));
      }
    } else if (algo === "Vignere Cipher") {
      if (key.length > text.length) {
        toast.error(
          "The length of key should be less than or equal to length of text",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      } else if (key.length === 0 || text.length === 0) {
        textKeyEmptyToast();
      } else if (alphaExp.test(key) === true || alphaExp.test(text) === true) {
        alphabetExpToast();
      } else {
        API.vignereCipherAPI({
          operation: operation,
          text: text,
          key: key,
        }).then((resp) => setResult(resp.result));
      }
    } else if (algo === "Running Key Cipher") {
      if (key.length < text.length) {
        toast.error(
          "The length of key should be greater than or equal to text",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      } else if (key.length === 0 || text.length === 0) {
        textKeyEmptyToast();
      } else if (alphaExp.test(key) === true || alphaExp.test(text) === true) {
        alphabetExpToast();
      } else {
        API.runningKeyCipherAPI({
          operation: operation,
          text: text,
          key: key,
        }).then((resp) => setResult(resp.result));
      }
    } else if (algo === "ROT13") {
      if (alphaExp.test(text) === true) {
        alphabetExpToast();
      } else if (text.length === 0) {
        textKeyEmptyToast();
      } else {
        API.ROT13API({
          operation: operation,
          text: text,
        }).then((resp) => setResult(resp.result));
      }
    }
  };

  const isDisabled = algo === "Morse Code" || algo === "ROT13";

  return (
    <div className="App">
      <ToastContainer />
      <div className="App-header">
        <div className="container">
          <h2>Web-App for encrypting and decrypting text</h2>
        </div>
        <div class="container">
          <div class="row">
            <div class="col">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  onChange={(evnt) => {
                    setAlgo(algo_list[evnt.target.value]);
                  }}
                >
                  {algo_list.map((algorithm, key) => (
                    <option key={key} value={key}>
                      {algorithm}
                    </option>
                  ))}
                </select>
                <label for="floatingSelect">Algorithm</label>
              </div>
            </div>
            <div class="col">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  onChange={(evnt) => {
                    setOperation(operation_list[evnt.target.value]);
                  }}
                >
                  {operation_list.map((operation, key) => (
                    <option key={key} value={key}>
                      {operation}
                    </option>
                  ))}
                </select>
                <label for="floatingSelect">Operation</label>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Text"
                  onChange={(ev) => setText(ev.target.value)}
                />
                <label for="floatingInput">Text</label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Key"
                  disabled={isDisabled}
                  onChange={(ev) => setKey(ev.target.value)}
                />
                <label for="floatingInput">Key</label>
              </div>
            </div>
            <div className="d-grid col">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={getResult}
              >
                Get Result
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div class="mb-3">
            <textarea
              disabled={true}
              value={result}
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
