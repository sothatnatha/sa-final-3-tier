import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import './ProductCard.css';
const ProductCard = ({title, src, price}) => {
  return (
    <div>
      <Card style={{ width: "200px" }}>
        <Card.Img variant="top" className="img-fluid" src={src} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div className="product-price">Price $ <span style={{color: "red"}}>{price}</span></div>
          <ButtonGroup aria-label="Basic example">
            <Button variant="primary">Order</Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
