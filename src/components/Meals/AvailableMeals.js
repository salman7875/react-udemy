import { useEffect, useState } from 'react'
import Card from '../UI/Card'
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          `https://food-ordering-8a6d9-default-rtdb.firebaseio.com/meals.json`
        )
        if (!res.ok) {
          throw new Error('Something went wrong!')
        }

        const data = await res.json()

        const loadedData = []

        for (const key in data) {
          loadedData.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price
          })
        }

        setMeals(loadedData)
      } catch (err) {
        setError(err.message)
      }
      setIsLoading(false)
    }
    fetchMeals()
  }, [])

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p className='loading-text'>Loading...</p>}
        <ul>{mealsList}</ul>
        {error && <p className='error-text'>{error}</p>}
      </Card>
    </section>
  )
}

export default AvailableMeals
