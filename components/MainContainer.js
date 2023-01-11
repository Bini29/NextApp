import React from "react";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import homeImg from "../assets/img/home.png";
import settingsImg from "../assets/img/settings.png";
export const MainContainer = ({ children }) => {
  return (
    <>
      <div>
        <div className="nav">
          <Link href="/" legacyBehavior>
            <Image src={homeImg} style={{ cursor: "pointer" }} />
          </Link>
          <Link href="/settings" legacyBehavior>
            <Image src={settingsImg} style={{ cursor: "pointer" }} />
          </Link>
        </div>
        <Script
          src="https://api.bitrix24.com/api/v1/"
          strategy="beforeInteractive"
        />
        <Link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        <div>{children}</div>
      </div>
    </>
  );
};
