import React, { useState, useEffect } from "react";
import { MainContainer } from "../components/MainContainer";
import getDataBx from "../bxData/getDataBx";
const settings = () => {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [load, setload] = useState(false);
  const [link, setLink] = useState(false);

  useEffect(() => {
    const sunc = async () => {
      let user = await getDataBx("profile").then((data) => {
        return data;
      });
      await getDataBx("entity.item.get", {
        ENTITY: "kintdish",
        FILTER: {},
      }).then((d) => {
        console.log(d);
        let curententityitem;
        d.forEach((element) => {
          if (element.NAME == user.ID) {
            setLink(true);
            curententityitem = element;
          }
        });
      });
    };
    sunc();
  }, []);

  const auth = async () => {
    console.log(login, password);
    setload(true);
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const send = await res.json();
    setload(false);

    if (send.succes) {
      let user = await getDataBx("profile").then((data) => {
        return data;
      });
      await getDataBx("entity.item.get", {
        ENTITY: "kintdish",
        FILTER: {},
      }).then((d) => {
        let userEntity = false;
        let curententityitem;
        d.forEach((element) => {
          if (element.NAME == user.ID) {
            userEntity = true;
            curententityitem = element;
          }
        });
        if (userEntity) {
          getDataBx("entity.item.update", {
            ENTITY: "kintdish",
            ID: curententityitem.ID,
            DATE_ACTIVE_FROM: new Date(),
            DETAIL_TEXT: send.token,
            NAME: user.ID,
          }).then((d) => {
            console.log("Замена данных");
          });
        } else {
          getDataBx("entity.item.add", {
            ENTITY: "kintdish",
            DATE_ACTIVE_FROM: new Date(),
            DETAIL_TEXT: send.token,
            NAME: user.ID,
          }).then((d) => {
            console.log("Новая строка");
          });
        }
      });
    }
  };

  return (
    <MainContainer>
      <div>
        <h1>Войти в Kint</h1>
        <div className="form">
          <input
            type="text"
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Логин"
          />
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
          />
          <button onClick={auth} className={load ? "btn loadBtn" : "btn"}>
            {load ? "Происходит проверка" : "Отправить"}
          </button>
        </div>
      </div>
    </MainContainer>
  );
};

export default settings;
