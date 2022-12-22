import getDataBx from "../bxData/getDataBx";

const getFields = async (deal) => {
  console.log(deal);
  let currentData = {
    name: "",
    phone: "",
    email: "",
    companyInfo: {
      id: "",
      name: "",
      inn: "",
      kpp: "",
    },
    dateFirst: "",
    dateLast: "",
    comment: "",
    link: "",
    error: false,
  };

  let currentdeal;
  if (deal.placement !== "CRM_DEAL_DETAIL_TAB") {
    return null;
  }
  await getDataBx("crm.deal.get", deal.options).then((data) => {
    currentdeal = data;
    console.log(data);
    currentData.comment = data.COMMENTS ? data.COMMENTS : null;
    currentData.link = data.UF_CRM_MY_LINK_FIRST
      ? data.UF_CRM_MY_LINK_FIRST
      : null;
    currentData.dateFirst = data.UF_CRM_MY_DATE_FIRST;
    currentData.dateLast = data.UF_CRM_MY_DATE_LAST;
  });
  await getDataBx("crm.company.get", { id: currentdeal.COMPANY_ID }).then(
    (data) => {
      if (data) {
        currentData.companyInfo.name = data.TITLE;
        currentData.companyInfo.id = data.ID;
      } else {
        currentData.companyInfo.name = null;
      }
    }
  );

  if (currentData.companyInfo.id) {
    await getDataBx("crm.requisite.list", {
      order: { DATE_CREATE: "ASC" },
      filter: { ENTITY_ID: 3 },
    })
      .then((data) => {
        currentData.companyInfo.name = data[0].RQ_COMPANY_NAME;
        currentData.companyInfo.inn = data[0].RQ_INN;
        currentData.companyInfo.kpp = data[0].RQ_KPP;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  await getDataBx("crm.contact.get", { id: currentdeal.CONTACT_ID })
    .then((data) => {
      currentData.name = data.NAME + " " + data.LAST_NAME;
      currentData.email = data.EMAIL[0].VALUE;
      currentData.phone = data.PHONE[0].VALUE;
    })
    .catch((e) => {
      currentData.name = null;
      currentData.email = null;
      currentData.phone = null;
      currentData.error = true;
    });

  return currentData;
};

export default getFields;
