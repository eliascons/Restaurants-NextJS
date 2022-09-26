import { useRouter } from 'next/router'
import type { NextPage } from "next";



const Restaurant: NextPage = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>Restaurant: {id}</p>
  }
  
  export default Restaurant;