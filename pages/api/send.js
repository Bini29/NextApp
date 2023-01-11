import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ name: "John Doe" });
  } else if (req.method === "POST") {
    console.log(req.body);
    let Контрагент = {};
    if (req.body.link) {
    } else {
      Контрагент = {
        ФизЛицо: req.body.Client,
        ЭтоФизЛицо: true,
      };
    }
    let data = JSON.stringify({
      Test: true,
      Client: req.body.Client,
      // Контрагент: {
      //   Name: req.body.Guest.Name,
      // },

      Guests: [
        {
          Guest: {
            Name: req.body.Guest.Name,
            ДополнительныеСвойства: [
              {
                Свойство: "ЭлектроннаяПочта",
                Значение: req.body.Guest.Email,
              },
              {
                Свойство: "Телефон",
                Значение: req.body.Guest.Phone,
              },
            ],
          },
          ДатаЗаезда: req.body.ДатаЗаезда,
          ДатаВыезда: req.body.ДатаВыезда,
        },
      ],
      Comment: req.body.Comment ? req.body.Comment : "",
      ID: req.body.link ? req.body.link : "",
    });

    console.log(req.body);
    let config = {
      method: "post",
      url: `${req.body.mainLink}/hs/KintAPI.hs/PostData?Method=PostBooking`,
      headers: {
        Authorization: req.body.authToken,
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log(data);
    await axios(config)
      .then(function (response) {
        // console.log(response.data);
        res.json(response.data);
      })
      .catch(function (error) {
        res.json(error);
      });
  }
}
