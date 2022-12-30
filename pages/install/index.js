import React from "react";
import { useEffect, useState } from "react";
import { MainContainer } from "../../components/MainContainer";
import getDataBx from "../../bxData/getDataBx";
import { useRouter } from "next/router";
const install = () => {
  const [title, setTitle] = useState("");

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
            await getDataBx("entity.section.get", {
              ENTITY: "kintdish",
              SORT: { NAME: "DishesKint" },
            }).then((data) => {
              console.log(data);
            });
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
              await getDataBx("entity.add", {
                ENTITY: "kintdish",
                NAME: "DishesKint",
                ACCESS: { U1: "W" },
              }).then((d) => {
                console.log(d);
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
                setTitle(
                  "Установка завершена, перейдите в сделки для дальнейшей работы"
                );
              });
              await BX24.installFinish();
            } else {
              setTitle("Перейдите в сделки");
            }
          });
        }

        fetchData();
      }
    }
  }, []);
  return (
    <MainContainer>
      <div className="infoblock">
        <span>{title}</span>
      </div>
    </MainContainer>
  );
};

export default install;
