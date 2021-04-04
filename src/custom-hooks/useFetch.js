import { useState, useEffect } from "react";

export const useFetch = (url) => {
  // const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const res = await fetch(url);
    const items = await res.json();
    setItems(items);
    // setLoading(false);
  };

  useEffect(() => {
    getItems();
  }, [url]);
  // return { loading, items };
  return items;
};
