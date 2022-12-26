import React from "react";
import { useRouter } from "next/router";

const slug = () => {
  const params = useRouter();

  console.log(params);
  return <div>slug</div>;
};

export default slug;
