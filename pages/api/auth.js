import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200);
  } else if (req.method === "POST") {
    const { login, password, mainLink } = req.body;

    let config = {
      method: "get",
      url: `${mainLink}/hs/KintAPI.hs/GetData?Method=GetDBInfo`,
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${login}:${password ? password : ""}`
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
    };
    await axios(config)
      .then(function (response) {
        res.json({
          succes: response.data.Success,
          token: `Basic ${Buffer.from(
            `${login}:${password ? password : ""}`
          ).toString("base64")}`,
        });
      })
      .catch(function (error) {
        res.json({
          succes: false,
        });
      });
  }
}
