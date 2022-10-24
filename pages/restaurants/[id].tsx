import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Model from "../../models/Restaurants";
import connectMongo from "../../controller/connectDB";

type Restaurant = {
  name: string;
  _id: string;
  url: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const {id} = context.query;
  await connectMongo();
  const restaurant = await Model.findById({_id: id});
  return {
    props: {restaurant: JSON.parse(JSON.stringify(restaurant))},
  };
};

const Restaurant: NextPage = ({restaurant}:any) => {
  const [rest, setRest] = useState<Restaurant[]>([]);
  
  return (
    <div>
      <h1>{restaurant.name}</h1>
    </div>
  );
};

export default Restaurant;
