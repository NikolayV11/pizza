import * as React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Sceleton from "../components/PizzaBlock/Skeleton";

export function FullPizza() {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`http://localhost:5500/data/${id}`);
        setPizza(data);
      } catch (error) {
        navigate("/");
      } finally {
      }
    }
    fetchPizza();
  }, [id]);
  if (!pizza) {
    return <Sceleton />;
  }
  return (
    <div>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price} ₽</h4>
    </div>
  );
}
