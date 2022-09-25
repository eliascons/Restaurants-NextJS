/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

type Restaurant = {
  name: string;
  _id: string;
  url: string;
};

const Home: NextPage = () => {
  const [data, setData] = useState<Restaurant[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getRestaurants = async () => {
      const response = await fetch(`/api/restaurants/${query}`);
      const restData = (await response.json()) as Array<Restaurant>;

      const promises = restData.map(async (rest, index) => {
        const resp = await fetch(`/api/urls/${rest._id}`);
        const url = await resp.json();
        restData[index].url = url.url;
      });

      await Promise.all(promises);
      setData(restData);
    };
    getRestaurants();
  }, [query]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Restaurant-App</title>
      </Head>
      <h1 className={styles.header}>Restaurants</h1>
      <div className={styles.inpt}>
        <input
          placeholder="Search"
          className={styles.searchBox}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </div>

      <div className={styles.ln}></div>

      <div className={styles.restContainer}>
        {data.map((restaurant, index) => {
          return (
            <div className={styles.restaurant} key={index}>
              <img
                src={restaurant.url}
                alt={restaurant.name}
                className={styles.image}
              />
              <div className={styles.contents}>
                <div key={index}>{restaurant.name} </div>
              </div>
              <div className={styles.info}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
