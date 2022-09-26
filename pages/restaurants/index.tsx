import type { NextPage } from "next";
import connectMongo from "../../controller/connectDB";
import Restaurant from "../../models/Restaurants";
import { GetServerSideProps } from "next";
import { useState } from "react";

type Restaurant = {
  name: string;
  _id: string;
  url: string;
};

export const getServerSideProps: GetServerSideProps = async () => {
  connectMongo();

  const data = await Restaurant.find();

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
};

const Restaurants: NextPage = (data: any) => {
  const [restaurantData] = useState(data.data);

  return (
    <div>
      <div>
        {restaurantData.map((restaurant: any, index: number) => {
          return (
            <div key={index}>
              <div>{restaurant.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Restaurants;
