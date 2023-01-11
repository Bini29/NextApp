import React, { useState, useEffect } from "react";
import { MainContainer } from "../components/MainContainer";
import getDataBx from "../bxData/getDataBx";
const settings = () => {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [load, setload] = useState(false);
  const [link, setLink] = useState(false);
  const [succes, setSucces] = useState(false);
  const [error, setError] = useState(false);
  const [userLogin, setUserLogin] = useState("");
  const [mainLink, setMainLink] = useState("");
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
            setUserLogin(element.PREVIEW_TEXT);
            curententityitem = element;
          }
        });
      });
      await getDataBx("entity.item.get", {
        ENTITY: "kintdishlink",
        FILTER: { NAME: "ADMINLINK" },
      }).then((data) => {
        console.log(data);
        setMainLink(data[0].DETAIL_TEXT);
      });
    };
    sunc();
  }, []);

  const auth = async () => {
    console.log(login, password);
    setload(true);
    // if (!login) return setload(false);
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ login, password, mainLink }),
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
            PREVIEW_TEXT: login,
            NAME: user.ID,
          }).then((d) => {
            console.log("Замена данных");
            setSucces(true);
          });
        } else {
          getDataBx("entity.item.add", {
            ENTITY: "kintdish",
            DATE_ACTIVE_FROM: new Date(),
            DETAIL_TEXT: send.token,
            PREVIEW_TEXT: login,
            NAME: user.ID,
          }).then((d) => {
            console.log("Новая строка");
            setSucces(true);
          });
        }
      });
    } else {
      setError(true);
    }
  };

  return (
    <MainContainer>
      <div className={load ? "settingsPage loading" : "settingsPage"}>
        <h1>Войти в Kint</h1>
        {userLogin ? (
          <span style={{ textAlign: "center", paddingTop: "15px" }}>
            Сохранённый пользователь: <br />
            {userLogin}
          </span>
        ) : (
          ""
        )}
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            onChange={(e) => setLogin(e.target.value)}
            placeholder={"Логин"}
            required
          />
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль,если есть"
          />
          <button onClick={auth} className={load ? "btn loadBtn" : "btn"}>
            {load ? "Происходит проверка" : "Отправить"}
          </button>
          {succes ? <span className="succes">Данные сохранены</span> : ""}
          {error ? (
            <span className="error">
              Произошла ошибка, неверно указанны логин-пароль
            </span>
          ) : (
            ""
          )}
        </form>
      </div>
    </MainContainer>
  );
};

export default settings;
