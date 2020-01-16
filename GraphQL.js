const request = require("request");
const config = require("./config");

module.exports = (query, callback) => {
  request(
    `http://localhost:${config.AdminPort}/admin/api`,
    {
      method: "post",
      json: {
        query: query
      }
    },
    (err, response, body) => {
      callback(body);
    }
  );
};
