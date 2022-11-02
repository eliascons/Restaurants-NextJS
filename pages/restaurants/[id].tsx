import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import restaurantModel from "../../models/Restaurants";
import connectMongo from "../../controller/connectDB";
import awsHelper from "../../controller/awsURL";
import dishModel from "../../models/Dishes";
import styles from "../../styles/UniqueRest.module.css";
import { read } from "fs";

type Restaurant = {
  name: string;
  _id: string;
  url: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  await connectMongo();
  const restaurant = await restaurantModel.findById({ _id: id });
  if (restaurant != null) {
    restaurant._id = restaurant._id.toString();
  }
  const url = await awsHelper(restaurant._id.toString());

  const dishes = await dishModel.find({ restaurant: restaurant.name });

  return {
    props: {
      restaurant: JSON.parse(JSON.stringify(restaurant)),
      url: url,
      dishes: JSON.parse(JSON.stringify(dishes)),
    },
  };
};

const Restaurant: NextPage = ({ restaurant, url, dishes }: any) => {
  // Set the name of the dish on S3 by their unique ID
  // Get dishes from db by restaurant id
  // Set image to each dish
  // Print dishes

  const [rest, setRest] = useState<Restaurant[]>([]);
  const [ready, setReady] = useState(false);

  const compStyle = {
    width: '200px',
    height: '200px'
  }

  useEffect(() => {
    dishes.map(async (dish: any, index: any) => {
      const response = await getDishImg(dish._id);
      dishes[index].url = response.url;
     
      setReady(true);
    });
  }, []);

  const getDishImg = async (item: Number) => {
    const resp = await fetch(`/api/urls/${item}`);
    const url = await resp.json();
    return url;
  };

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <img src={url} />
      <h2>Dishes</h2>

      {ready ? (
        <div>
          {dishes.map((dish: any, index: any) => {
            return (
              <div key={index}>
                <div>Name:{dish.name}</div>
                <img src={dish.url} style={compStyle}/>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.loader}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
