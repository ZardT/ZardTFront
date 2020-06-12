import fetch from "node-fetch";
const get = async (string, body) => {

  const res = await fetch(
    `${
    process.env.NODE_ENV == "development"
      ? "http://121.196.27.34:3000/api/front"
      : "http://121.196.27.34:3000/api/front"
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
      ? "http://121.196.27.34:3000/api/front"
      : "http://121.196.27.34:3000/api/front"
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
