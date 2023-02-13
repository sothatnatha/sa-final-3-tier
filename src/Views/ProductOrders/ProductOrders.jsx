import React, { useEffect, useRef, useState } from "react";
import TopNavBar from "../../Components/Navbar/TopNavBar";
import {  Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
import { CiCircleAlert } from "react-icons/ci";
import { MdPayment } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { SpinLoading } from "../../Components/SpinLoading/SpinLoading";
import "./productOrder.css";
import { Button } from "@mui/material";
import { ComponentToPrint } from "../../Components/PrintReport/PrintReport";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
const ProductOrders = () => {
  const url = "http://127.0.0.1:8000/storage/";
  const navigate = useNavigate();

  // States
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [amount, setTotalAmount] = useState(0);


  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((itemCart) => {
      newTotalAmount = newTotalAmount + parseFloat(itemCart.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  // Minus Qty
  const minusQty = async (product) => {
    // Check if product is exist
    let findProductInCart = await cart.find((index) => {
      return index.id === product.id;
    });

    if (findProductInCart) {
      if (product.qty > 1) {
        let newCart = [];
        let newItem;
        cart.forEach((cartItem) => {
          if (cartItem.id === product.id) {
            newItem = {
              ...cartItem,
              qty: cartItem.qty - 1,
              totalAmount: cartItem.price_out * (cartItem.qty - 1),
            };
            newCart.push(newItem);
          } else {
            newCart.push(cartItem);
          }
          setCart(newCart);
        });
      }
    }
  };
  // Add Qty
  const addQty = async (product) => {
    onClickOrder(product);
  };

  // Print report
  const componentRef = useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrintButton = () => {
    handleReactToPrint();
  };

  const fetchProducts = (e) => {
    setLoading(true);
    axios.get("http://127.0.0.1:8000/api/products").then((res) => {
      setProductsList(res.data);
      setLoading(false);
      // console.log(res.data);
    });
  };

  //Get current date
  var curDate = new Date();
  var dd = String(curDate.getDate()).padStart(2, "0");
  var mm = String(curDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = curDate.getFullYear();
  curDate = dd + "/" + mm + "/" + yyyy;
  //

  // OnClick order
  const onClickOrder = async (product) => {
    // toast(`'${product.product_name}' has added to cart!`);
    // Check if product is exist
    let findProductInCart = await cart.find((i) => {
      return i.id === product.id;
    });

    if (findProductInCart) {
      let newCart = [];
      let newItem;
      cart.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            qty: cartItem.qty + 1,
            totalAmount: cartItem.price_out * (cartItem.qty + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
        setCart(newCart);
      });
    } else {
      let addingProduct = {
        ...product,
        qty: 1,
        totalAmount: product.price_out,
      };
      setCart([...cart, addingProduct]);
    }
  };

  // onClick remove cart
  const onClickRmCart = async (productCart) => {
    toast(`'${productCart.product_name}' remove from cart!`);

    const newCart = cart.filter((cartItem) => cartItem.id !== productCart.id);
    setCart(newCart);
  };

  // Format the price above to USD using the locale, style, and currency.
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      <TopNavBar />
      <div className="container-md">
        <div className="pos-contents-wrapper">
          <div className="pos-left-contents col-6">
            {/* //left contents */}
            <h3>Orders</h3>
            <hr />
            <br />
            <div className="card-row">
              <SpinLoading loading={loading}/>
              {productsList.map((product, index) => {
                return (
                  <div key={index}>
                    <div className="card-col">
                      <div className="card-body">
                        <div className="card-img mb-4">
                          <img src={url + product.image} />
                        </div>
                        <div className="card-description mt-2 mb-2">
                          <div className="card-title">
                            {product.product_name}
                          </div>
                          <div
                            className="card-price"
                            style={{
                              color: "green",
                            }}
                          >
                            ${product.price_out}
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="card-botton-wrapper">
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => onClickOrder(product)}
                          >
                            Order
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <br />
            <hr />
          </div>
          {/* // right content */}
          <div className="pos-right-contents col-6 mt-3">
            <Table striped bordered hover responsive size="sm" className="mt-3">
              <div className="print-component" style={{ display: "none" }}>
                <ComponentToPrint
                  cart={cart}
                  totalAmt={amount}
                  ref={componentRef}
                />
              </div>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart
                  ? cart.map((productCart, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{productCart.product_name}</td>
                        <td>{productCart.price_out}</td>
                        <td>{productCart.qty} pcs</td>
                        <td>{productCart.totalAmount}</td>
                        <td>
                          <Button
                            size="large"
                            style={{
                              fontSize: "23px",
                            }}
                            onClick={() => minusQty(productCart)}
                          >
                            <AiOutlineMinus />
                          </Button>
                          <Button size="large">
                            <AiOutlinePlus
                              style={{
                                fontSize: "23px",
                              }}
                              onClick={() => addQty(productCart)}
                            />
                          </Button>

                          <Button
                            size="large"
                            color="error"
                            onClick={() => onClickRmCart(productCart)}
                          >
                            <HiTrash
                              style={{
                                fontSize: "22px",
                              }}
                            />
                          </Button>
                        </td>
                      </tr>
                    ))
                  : "No Item"}
              </tbody>
            </Table>
            <div
              className="payments-wrap-ui mb-3"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <div>
                <input
                  type="text"
                  value={"Payments= " + USDollar.format(amount)}
                  disabled
                />
              </div>
            </div>
            <div
              className="paynow"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              {amount !== 0 ? (
                <Button
                  onClick={handlePrintButton}
                  variant="contained"
                  color="success"
                >
                  <MdPayment
                    style={{
                      fontSize: "22px",
                      marginRight: 5,
                    }}
                  />
                  Pay Now
                </Button>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#d51212",
                  }}
                >
                  <CiCircleAlert
                    style={{
                      fontSize: "22px",
                    }}
                  />{" "}
                  Please click order!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrders;
