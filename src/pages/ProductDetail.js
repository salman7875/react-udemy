import { Link, useParams } from 'react-router-dom'

const ProductDetail = () => {
  const param = useParams()
  return (
    <>
      <div>ProductDetail</div>
      <p>Product ID is: {param.id}</p>
      <p>
        <Link to='..' relative='path'>
          {/* It removes 1 segment from currently active path */}
          Back
        </Link>
      </p>
    </>
  )
}

export default ProductDetail
