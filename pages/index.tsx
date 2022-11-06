/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
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
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getRestaurants = async () => {
      const response = await fetch(`/api/restaurants/${query}`);
      const restData = (await response.json()) as Array<Restaurant>;

      const promises = restData.map(async (rest, index) => {
        const resp = await fetch(`/api/urls/${rest._id}`);
        const url = await resp.json();
        restData[index].url = url.url;
      });

      await Promise.all(promises);
      setIsLoading(false);
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
        {isLoading ? (
          <div className={styles.loader}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : null}

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
              <div className={styles.info} onClick={() => setPageLoad(true)}>
                <Link href={`/restaurants/${restaurant._id}`}>
                  <a className={styles.buttonStyle}>View</a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.bottomRight}>
        <div>{pageLoad ? <div className={styles.pageLoad}></div> : null}</div>
      </div>
    </div>
  );
};

export default Home;
