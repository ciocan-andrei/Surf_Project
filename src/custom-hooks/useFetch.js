import { useState, useEffect } from "react";

export const useFetch = (url) => {
  // const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const items = await res.json();
        return setItems(items);
      } else {
        throw new Error(`Request failed. Status: ${res.status}`);
      }
    } catch (e) {
      console.log(e.message);
      return setItems(null);
    }
    // setLoading(false);
  };

  useEffect(() => {
    getItems();
  }, [url]);
  // return { loading, items };
  return items;
};
