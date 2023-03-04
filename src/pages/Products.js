import { Link, useNavigate } from 'react-router-dom'

const PRODUCTS = [
  { id: 'p1', title: 'Product 1' },
  { id: 'p2', title: 'Product 2' },
  { id: 'p3', title: 'Product 3' }
]

const Products = () => {
  const navigate = useNavigate()

  const navigateHandler = () => {
    navigate('..')
  }

  return (
    <>
      <div>The Products Page</div>
      <br />
      <ul>
        {PRODUCTS.map(product => (
          <li key={product.id}>
            <Link to={product.id}>{product.title}</Link>
          </li>
        ))}
      </ul>
      <button onClick={navigateHandler}>Back</button>
    </>
  )
}

export default Products
