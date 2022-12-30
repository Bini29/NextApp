import React, { useState } from "react";
import { MainContainer } from "../components/MainContainer";

const settings = () => {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const auth = async () => {
    console.log(password, login);
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
          <button onClick={auth}>Отправить</button>
        </div>
      </div>
    </MainContainer>
  );
};

export default settings;
