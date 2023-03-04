import {
  createBrowserRouter,
  // createRoutesFromElements,
  RouterProvider
  // Routes,
  // Route
} from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import RootLayout from './pages/Root'
import Error from './pages/Error'
import ProductDetail from './pages/ProductDetail'

/*
// OLD version 
const routeDefinations = createRoutesFromElements(
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/products' element={<Products />} />
  </Routes>
)
*/

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> }, // path: ''
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ProductDetail /> }
    ]
  }
])

function App () {
  return <RouterProvider router={router} />
}

export default App
