import './App.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchjoke, clearJoke } from './jokeSlice'
import axios from 'axios'

function App() {
  const [category, setCategory] = useState("")
  const [error, setError] = useState("")
  const [categories, setCategories] = useState([])
  // const [joke,setJoke]=useState()
  const joke = useSelector((state) => {
    return state.joke.joke
  })
  const dispatch = useDispatch()
  const handleCategory = (e) => {
    setCategory(e.target.value)
    setError('')
    dispatch(clearJoke())
  }
  const handleJoke = async () => {
    try {
      const result = await axios.get
        ('https://api.chucknorris.io/jokes/categories')
      const validCategories = result.data
      setCategories(validCategories)
      const enteredCategory=category.trim().toLowerCase()

      if (!category || !validCategories.includes(category.trim().toLowerCase())
      ) {
        setError("Invalid category! Please enter one of the available categories.")
        return
      }
      setError("")
      dispatch(fetchjoke(category.trim().toLowerCase()))
    } catch (error) {
      setError("Unable to fetch categories.Please try again.")
      dispatch(clearJoke())
    }
  }


  return (

    <div className="md:h-screen md:overflow-y-auto min-h-dvh overflow-y-auto bg-gray-50 p-4 sm:p-8 flex flex-col justify-center items-center font-sans">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
          Chuck Norris Jokes
        </h1>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Category
            </label>
            <input
              onChange={handleCategory}
              type="text"
              placeholder="Enter category"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
            />
          </div>

          <button
            onClick={handleJoke}
            className="outline-none cursor-pointer w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
          >
            Get Jokes
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 shadow-sm">
            <h3 className="text-red-800 font-semibold text-lg mb-3">
              {error}
            </h3>
            <h4 className="text-red-700 font-medium mb-2">Available Categories:</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map((item, index) => (
                <li key={index} className="text-red-600 text-sm bg-red-100 px-3 py-2 rounded border border-red-200">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!category && (
          <div className="text-center py-8">
            <h1 className="text-2xl sm:text-3xl text-gray-600 font-medium italic">
              {joke || "Welcome! Enter a category to get a joke."}
            </h1>
          </div>
        )}

        {category.trim() && !error && joke && joke !== "No joke" && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h1 className="text-2xl sm:text-3xl text-gray-800 font-bold italic text-center mb-2">
              "{joke}"
            </h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
