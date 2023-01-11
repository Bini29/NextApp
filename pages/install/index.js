import React from "react";
import { useEffect, useState } from "react";
import { MainContainer } from "../../components/MainContainer";
import getDataBx from "../../bxData/getDataBx";
import { useRouter } from "next/router";
import axios from "axios";
const install = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [done, setDone] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (BX24 !== null) {
        function fetchData() {
          console.log("НАЧАЛАСЬ УСТАНОВКА");
          BX24.init(async function () {
            console.log("Инициализация завершена!", BX24.isAdmin());
            let str = window.location.href;
            console.log(str);
            console.log(str.replace("install", ""));
            setTitle("Выполняется установка");
            let installApp = false;
            await getDataBx("placement.get").then((res) => {
              console.log(res);
              res.forEach((element) => {
                if (
                  element.title === "Битрикс24 с Кинт: Управление санаторием"
                ) {
                  installApp = true;
                }
              });
            });
            if (!installApp) {
              setLoad(true);
              await getDataBx("entity.add", {
                ENTITY: "kintdish",
                NAME: "DishesKint",
                ACCESS: { U1: "W" },
              }).then((d) => {
                console.log(d);
              });
              await getDataBx("entity.add", {
                ENTITY: "kintdishlink",
                NAME: "DishesKintlink",
                ACCESS: { U1: "W" },
              }).then((d) => {
                console.log(d);
              });
              getDataBx("entity.item.add", {
                ENTITY: "kintdishlink",
                DATE_ACTIVE_FROM: new Date(),
                DETAIL_TEXT: "",
                NAME: "ADMINLINK",
              }).then((d) => {
                console.log("Новая строка");
              });
              let data = {
                PLACEMENT: "CRM_DEAL_DETAIL_TAB",
                HANDLER: str.replace("install", ""),
                TITLE: "Битрикс24 с Кинт: Управление санаторием",
              };

              await getDataBx("crm.deal.userfield.add", {
                fields: {
                  FIELD_NAME: "MY_DATE_FIRST",
                  EDIT_FORM_LABEL: "Дата заезда",
                  LIST_COLUMN_LABEL: "Дата заезда",
                  USER_TYPE_ID: "date",
                  XML_ID: "MY_DATE_FIRST",
                  SHOW_IN_LIST: true,
                  MANDATORY: true,
                },
              }).then((data) => {
                console.log("Gjkt");
                setTitle("Создание поля завершено");
              });
              await getDataBx("crm.deal.userfield.add", {
                fields: {
                  FIELD_NAME: "MY_DATE_LAST",
                  EDIT_FORM_LABEL: "Дата выезда",
                  LIST_COLUMN_LABEL: "Дата выезда",
                  USER_TYPE_ID: "date",
                  XML_ID: "MY_DATE_LAST",
                  SHOW_IN_LIST: true,
                  MANDATORY: true,
                },
              }).then((data) => {
                console.log("Gjkt");
                setTitle("Создание поля завершено");
              });
              await getDataBx("crm.deal.userfield.add", {
                fields: {
                  FIELD_NAME: "MY_LINK_FIRST",
                  EDIT_FORM_LABEL: "Ссылка",
                  LIST_COLUMN_LABEL: "Ссылка",
                  USER_TYPE_ID: "url",
                  XML_ID: "MY_LINK_FIRST",
                  SHOW_IN_LIST: true,
                },
              }).then((data) => {
                console.log("Gjkt");
                setTitle("Создание поля завершено");
              });
              await getDataBx("crm.deal.userfield.add", {
                fields: {
                  FIELD_NAME: "MY_LINK_LAST",
                  EDIT_FORM_LABEL: "Ссылка без форматирования",
                  LIST_COLUMN_LABEL: "Ссылка без форматирования",
                  USER_TYPE_ID: "url",
                  XML_ID: "MY_LINK_LAST",
                  SHOW_IN_LIST: true,
                },
              }).then((data) => {
                console.log("Gjkt");
                setTitle("Создание поля завершено");
              });
              await getDataBx("placement.bind", data).then((data) => {
                setTitle("Установка завершена");
              });
              await getDataBx("entity.item.get", {
                ENTITY: "kintdishlink",
                FILTER: { NAME: "ADMINLINK" },
              }).then((data) => {
                setTitle(
                  "Приложение успешно установленно для продолжения введите ссылку в формате \n https://demo.kint.ru/kus_demo"
                );
                setDone(true);
                setLoad(false);
              });
            } else {
              setTitle("Приложение уже установленно");
              await getDataBx("entity.item.get", {
                ENTITY: "kintdishlink",
                FILTER: { NAME: "ADMINLINK" },
              }).then((data) => {
                console.log(data[0].DETAIL_TEXT);

                if (data[0].DETAIL_TEXT) {
                  setTitle(
                    "Приложение успешно установленно для продолжения перейдите в сделки"
                  );
                } else {
                  setTitle(
                    "Приложение успешно установленно для продолжения введите ссылку в формате \n https://online.kint.ru/kus_test"
                  );
                  setDone(true);
                }
              });
            }
          });
        }

        fetchData();
      }
    }
  }, []);
  const setLink = async () => {
    console.log(value);
    let admin = await getDataBx("user.admin", {});
    let actualLink = false;
    setLoad(true);
    await axios
      .get(`${value}/hs/KintAPI.hs/GetDBInfo`)
      .then((res) => console.log(res))
      .catch((e) => {
        if (e.response.status === 401) {
          actualLink = true;
          setLoad(false);
        }
      });
    if (admin && actualLink) {
      await getDataBx("entity.item.get", {
        ENTITY: "kintdishlink",
        FILTER: { NAME: "ADMINLINK" },
      }).then((d) => {
        getDataBx("entity.item.update", {
          ENTITY: "kintdishlink",
          ID: d[0].ID,
          DATE_ACTIVE_FROM: new Date(),
          DETAIL_TEXT: value,
        })
          .then((d) => {
            setTitle("Ссылка успешно сохранена");
          })
          .catch((e) => {
            alert(e);
          });
      });
      await BX24.installFinish();
    } else {
      alert("Нет прав на добавление ссылки");
    }
  };
  return (
    <MainContainer>
      <div className="infoblockSettings">
        <div className={load ? "mainLinkForm loading" : "mainLinkForm"}>
          <span className="settingsTitle">{title}</span>
          {done ? (
            <>
              <span>Введите ссылку на портал</span>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              {value ? <button onClick={setLink}>Отправить</button> : ""}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </MainContainer>
  );
};

export default install;
