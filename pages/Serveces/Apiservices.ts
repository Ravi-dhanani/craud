import { useState } from "react";

export default async function getData() {
  const url = "https://dummyjson.com/posts";
  const [data, setData] = useState();
  try {
    await fetch(url)
      .then((res) => res.json())
      .then((result) => setData(result));
  } catch {
    console.log("not Data");
  }
  return data;
}
