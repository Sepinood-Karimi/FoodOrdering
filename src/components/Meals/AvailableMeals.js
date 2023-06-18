import classes from './AvailaibaleMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from "react";

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {

        const fetchMeals = async () => {
            const response = await fetch('https://food-ordering-460e9-default-rtdb.firebaseio.com/meals.json');
            if (!response.ok) {
                throw new Error('Something Went Wrong!')
            }
            const responseData = await response.json();

            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    price: responseData[key].price,
                    description: responseData[key].description
                })
            }
            ;

            setMeals(loadedMeals);
            setIsLoading(false);
        };
        fetchMeals().catch(e => {
            setIsLoading(false);
            setError(e.message)
        })

    }, []);

    if (isLoading) {
        return (
            <section className={classes.mealsLoading}>
                <p> Loading ... </p>
            </section>
        );
    }
    if (error) {
        return (
            <section className={classes.mealsError}>
                <p> {error} </p>
            </section>
        );
    }


    const mealsList = meals.map(meal =>
        <MealItem
            mealId={meal.id}
            key={meal.id}
            mealName={meal.name}
            mealPriceProps={meal.price}
            mealDescription={meal.description}/>);

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );

};
export default AvailableMeals;