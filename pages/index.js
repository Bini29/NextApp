import axios from "axios";
import { useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer";
import getFields from "../bxData/getFields";
import getDataBx from "../bxData/getDataBx";
import SyncKint from "../components/SyncKint";

const index = ({ data }) => {
  const [load, setLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState(null);
  const [user, setUser] = useState("");
  const [dealInfo, setDealInfo] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (BX24 !== null) {
        async function fetchData() {
          await BX24.init(async function () {
            await getDataBx("user.current").then((data) => {
              setUser(data);
            });

            setId(BX24.placement.info());

            getFields(BX24.placement.info()).then((d) => {
              setDealInfo(d);
              setLoad(true);
            });
          });
          await getDataBx("entity.get").then((data) => {
            console.log(data);
          });
        }
        fetchData();
      }
    }
  }, []);

  return (
    <MainContainer>
      {load ? (
        <SyncKint fields={dealInfo} id={id} />
      ) : // <div className="loading maindiv"></div>
      null}
    </MainContainer>
  );
};

export default index;

// export async function getServerSideProps(context) {
//   const res = await fetch("/api/send");
//   const data = await res.json();
//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }
