export default function getDataBx(method, data) {
  const getData = new Promise((resolve, reject) => {
    BX24.callMethod(method, data, function (res) {
      resolve(res.answer.result);
      reject(res.error());
    });
  });
  return getData;
}
