
import type { NextPage } from "next";
import { useState } from "react";
import { GetServerSideProps } from "next";
import Model from "../../models/Restaurants";
import connectMongo from "../../controller/connectDB";
import awsHelper from "../../controller/awsURL";
import Image from 'next/image'

type Restaurant = {
  name: string;
  _id: string;
  url: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const {id} = context.query;
  await connectMongo();
  const restaurant = await Model.findById({_id: id});
  if(restaurant != null) {
    restaurant._id = restaurant._id.toString();
  }
  const url = await awsHelper(restaurant._id.toString());
  
  return {
    props: {restaurant: JSON.parse(JSON.stringify(restaurant)), url: url},
  };
};

const Restaurant: NextPage = ({restaurant, url}:any) => {
  const [rest, setRest] = useState<Restaurant[]>([]);

  return (
    <div>
      
      <img src={url}/>
     
      <h1>{restaurant.name}</h1>
      
    </div>
  );
};

export default Restaurant;
