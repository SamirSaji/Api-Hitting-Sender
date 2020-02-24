const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const axios = require("axios");
app.use(bodyparser.json());

app.post("/", (req, res) => {
  res.send("sender page");
});

const posts = async () => {
  const generateRandomTex = () => {
    let data = {};

    for (let i = 0; i < 10; i++) {
      let a = Math.random()
        .toString(36)
        .substr(2, 8);
      let b = Math.random()
        .toString(36)
        .substr(2, 8);
      data[`${a}`] = b;
    }
    return data;
  };

  await axios({
    method: "post",
    url: "http://localhost:5000/",
    data: generateRandomTex()
  })
    .then(function(response) {
      console.log(response.status);
      console.log(response.config.data);
      data = {};
    })
    .catch(function(error) {
      console.log(error);
    });
};

setInterval(async () => {
  const completeLoop = async () => {
    for (let i = 0; i < 50; i++) {
      await posts();
      console.log(
        "----------------------------------------------------------------------------------------------"
      );
    }
  };
  completeLoop().then(() => {
    console.log(
      "-------------------------------------------------------------WORK FLOW FINISHED-------------------------------------------"
    );
  });
}, 5000);

app.listen(3000);
console.log("running sender port 3000");
