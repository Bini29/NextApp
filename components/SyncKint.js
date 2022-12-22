import axios from "axios";
import { useState } from "react";
import getDataBx from "../bxData/getDataBx";
const SyncKint = ({ fields, id }) => {
  const [state, setState] = useState({});
  const [load, setLoad] = useState(false);
  const [loadData, setLoadData] = useState(false);
  if (fields === null) {
    return (
      <div className="infoblock">
        <span>Перейдите в сделки</span>
      </div>
    );
  }
  console.log(fields);
  const fetchData = async (data) => {
    setLoad(true);
    let postData = {};
    console.log(data);
    if (data.companyInfo.name) {
      postData = {
        Client: {
          Name: data.companyInfo.name,
          ИНН: data.companyInfo.inn,
          КПП: data.companyInfo.kpp,
        },
        Guest: {
          Name: data.name,
          Phone: data.phone,
          Email: data.email,
        },
        ДатаЗаезда: data.dateFirst,
        ДатаВыезда: data.dateLast,
        Comment: data.comment,
        fiz: false,
        link: data.link,
      };
    } else {
      postData = {
        Client: {
          Name: data.name,
          Телефон: data.phone,
          ЭлектроннаяПочта: data.email,
        },
        Guest: {
          Name: data.name,
          Phone: data.phone,
          Email: data.email,
        },
        ДатаЗаезда: data.dateFirst,
        ДатаВыезда: data.dateLast,
        Comment: data.comment,
        fiz: true,
        link: data.link,
      };
    }

    const res = await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const send = await res.json();
    console.log(send);

    await getDataBx("crm.deal.update", {
      id: id.options.ID,
      fields: {
        UF_CRM_MY_LINK_FIRST:
          "https://online.kint.ru/kus_test/ru_RU/#" + send.Result.ID,
        UF_CRM_MY_LINK_LAST: send.Result.ID,
      },
    }).then((data) => {
      setLoad(false);
      console.log(data);
    });

    setLoadData(true);
    setState(send);
    console.log(state.Success);
  };

  return (
    <div className="fields loader">
      <span>
        <b>ФИО клиента</b>:{" "}
        {fields.name ? (
          fields.name
        ) : (
          <span className="ferr">Введите данные</span>
        )}
      </span>
      <span>
        <b>Телефон</b>:{" "}
        {fields.phone ? (
          fields.phone
        ) : (
          <span className="ferr">Введите данные</span>
        )}
      </span>
      <span>
        <b>E-mail</b>:{" "}
        {fields.email ? (
          fields.email
        ) : (
          <span className="ferr">Введите данные</span>
        )}
      </span>
      {fields.companyInfo.name ? (
        <>
          <span>
            <b>Компания</b>
          </span>
          <span style={{ paddingLeft: 20 }}>
            <b>Название</b>:{fields.companyInfo.name}
          </span>
          <span style={{ paddingLeft: 20 }}>
            <b>ИНН</b>: {fields.companyInfo.inn}
          </span>
          <span style={{ paddingLeft: 20 }}>
            <b>КПП</b>: {fields.companyInfo.kpp}
          </span>
        </>
      ) : (
        ""
      )}
      <span>
        <b>Дата заезда</b>:{" "}
        {fields.dateFirst ? (
          fields.dateFirst
        ) : (
          <span className="ferr">Введите данные</span>
        )}
      </span>
      <span>
        <b>Дата выезда</b>:{" "}
        {fields.dateLast ? (
          fields.dateLast
        ) : (
          <span className="ferr">Введите данные</span>
        )}
      </span>
      <span>
        <b>Пожелания гостя</b>: {fields.comment}
      </span>
      {fields.error ? (
        <span className="ferr">Заполниете данные для продолжения</span>
      ) : (
        <button
          onClick={() => fetchData(fields)}
          className={load ? "btn loadBtn" : "btn"}
        >
          {load ? "Отправка..." : "Передать в Кинт: Управление санаторием"}
        </button>
      )}

      {state.Success ? (
        <a
          className="linksucces"
          href={"https://online.kint.ru/kus_test/ru_RU/#" + state.Result.ID}
          target="_blank"
        >
          Ссылка
        </a>
      ) : (
        <span className="ferr">
          {loadData ? (state.Success ? "" : "Произошла ошибка") : ""}
        </span>
      )}
    </div>
  );
};

export default SyncKint;
