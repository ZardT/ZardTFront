import fetch from "node-fetch";
const get = async (string, body) => {
  
  const res = await fetch(
    `${
      process.env.NODE_ENV == "development"
        ? "http://192.168.0.168:7001/api/front"
        : "http://172.18.0.1/api/front"
    }${string}`,
    {
      method: "get",
      headers: { "Content-Type": "application/json" },
    }
  );
  const { code, data, message = null } = await res.json();
  if (code === 200) {
    return data;
  } else {
    return { code, message };
  }
};
const post = async (string, body) => {
  const res = await fetch(
    `${
      process.env.NODE_ENV == "development"
        ? "http://192.168.0.168:7001/api/front"
        : "http://172.18.0.1/api/front"
    }${string}`,
    {
      method: "post",
      body: JSON.stringify({ ...body }),
      headers: { "Content-Type": "application/json" },
    }
  );
  const { code, data, message = null } = await res.json();
  if (code === 200) {
    return data;
  } else {
    return { code, message };
  }
};
export { get, post };
