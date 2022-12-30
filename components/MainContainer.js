import React from "react";
import Script from "next/script";
import Link from "next/link";
import Head from "next/head";
export const MainContainer = ({ children }) => {
  return (
    <>
      <div>
        <div>
          <Link href="/" legacyBehavior>
            <a>Главная</a>
          </Link>
          <Link href="/settings" legacyBehavior>
            <a>Настройки</a>
          </Link>
        </div>
        <Script
          src="https://api.bitrix24.com/api/v1/"
          strategy="beforeInteractive"
        />
        <div>{children}</div>
      </div>
    </>
  );
};
