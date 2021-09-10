export class API {
  static ROT13API(body) {
    return fetch(`https://cryptography-flask-api.herokuapp.com/rot13`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static caesarAPI(body) {
    return fetch(`https://cryptography-flask-api.herokuapp.com/caesar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static morseCodeAPI(body) {
    return fetch(`https://cryptography-flask-api.herokuapp.com/morsecode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static vignereCipherAPI(body) {
    return fetch(`https://cryptography-flask-api.herokuapp.com/vignere`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static runningKeyCipherAPI(body) {
    return fetch(
      `https://cryptography-flask-api.herokuapp.com/runningkeycipher`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    ).then((resp) => resp.json());
  }
}
