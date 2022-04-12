import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button } from 'reactstrap'
import TableProducts from '../components/TableProducts'
import '../assets/styles/products.scss'

export default function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  // Get all products
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setProducts(result.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const handleDelete = (product) => {
    fetch(`http://127.0.0.1:8000/api/products/${product}`, {method: 'DELETE'})
      .then(res => res.json())
      .then(
        (result) => {
          setProducts(products.filter(item => item.id !== product)); // Update products without making a new request
        },
        (error) => {
          setError(error);
        }
      )
  }

  if (error)
    return <div>Error: {error.message}</div>;
  else if (!isLoaded)
    return <div>Loading...</div>;
  else {
    return (
      <Container fluid className="products">
        <Row>
          <h1>Products</h1>
          <Card
            body
            color="dark"
            inverse
            className="cards"
          >
            <a href="/products/create"><Button>Create new product</Button></a>
            {products.length > 0 ? <TableProducts products={products} handleDelete={handleDelete} /> : <h1>No products found</h1>}
          </Card>
        </Row>
      </Container>
    )
  }
}
