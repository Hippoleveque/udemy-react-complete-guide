import { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
// import useHttp from "../../hooks/use-http";

const MEALS_ENDPOINT =
  "https://react-http-78834-default-rtdb.europe-west1.firebasedatabase.app//meals.json";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // const { isLoading, error, sendRequest } = useHttp();

  // useEffect(() => {
  //   sendRequest(MEALS_ENDPOINT, null, (data) => {
  //     const res = [];
  //     for (const meal of Object.keys(data)) {
  //       res.push({
  //         id: meal,
  //         ...data[meal],
  //       });
  //     }
  //     setMeals(res);
  //   });
  // }, [sendRequest]);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(MEALS_ENDPOINT);
        const res = await response.json();
        const loadedMeals = [];
        for (const meal of Object.keys(res)) {
          loadedMeals.push({
            id: meal,
            ...res[meal],
          });
        }
        setMeals(loadedMeals);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
      setIsLoading(false);
    };

    fetchMeals();
  }, []);


  if (error) {
    return <section>
      <p> {error} </p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      A
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        {isLoading && <p> Meals are Loading </p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
