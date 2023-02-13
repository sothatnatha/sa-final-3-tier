import React, { useState, useEffect } from "react";
import "./CreateProduct.css";
import Form from "react-bootstrap/Form";
import { AiFillSave } from "react-icons/ai";
import { fetchAPI } from "../../Helper/Helper";
import { SpinLoading } from "../../Components/SpinLoading/SpinLoading";
import TopNavBar from "../../Components/Navbar/TopNavBar";
import { Button} from "@mui/material";
import { Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlashAlert from "../../Components/FlashAlert/FlashAlert";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const CreateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [onChangeCategories, setOnChangeCategories] = useState(1);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState(null);
  const [qty, setQty] = useState(0);
  const [priceIn, setPriceIn] = useState(0);
  const [priceOut, setPriceOut] = useState(0);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [flashAlert, setFlashAlert] = useState(false);

  useEffect(() => {
    if (params.id !== undefined) getProductById();
    getCategories();
  }, []);

  // Get Categories from api
  const getCategories = () => {
    setLoading(true);
    fetchAPI("api/categories", "GET", {}).then((res) => {
      setCategories(res);
      setLoading(false);
    });
  };
  //

  // Get Product By Id
  const getProductById = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/products/" + params.id)
      .then((response) => {
        var data = response.data;
        console.log(data);
        if (data) {
          var prodObj = data;
          setProductName(prodObj.product_name);
          setProductCode(prodObj.product_code);
          setQty(prodObj.qty);
          setPriceIn(prodObj.price_in);
          setPriceOut(prodObj.price_out);
        }
      });
  };

  // onChange Events
  const onChangeProductName = (e) => {
    // console.log(e.target.value);
    setProductName(e.target.value);
  };
  const onChangeProductCode = (e) => {
    // console.log(e.target.value);
    setProductCode(e.target.value);
  };
  const onChangeQty = (e) => {
    // console.log(e.target.value);
    setQty(e.target.value);
  };
  const onChangePriceIn = (e) => {
    // console.log(e.target.value);
    setPriceIn(e.target.value);
  };
  const onChangePriceOut = (e) => {
    // console.log(e.target.value);
    setPriceOut(e.target.value);
  };
  const onChangeCategory = (e) => {
    // console.log(e.target.value);
    setOnChangeCategories(e.target.value);
  };
  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  //

  // Handle save
  const handleSave = () => {
    setLoading(true);
    toast(`Add ${productName} Successfully!`);
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("product_code", productCode);
    formData.append("qty", qty);
    formData.append("price_in", priceIn);
    formData.append("price_out", priceOut);
    formData.append("image", image);
    formData.append(" categories_id", onChangeCategories);

    fetch("http://127.0.0.1:8000/api/products", {
      method: "POST",
      body: formData,
    }).then((res) => {
      console.log(res);
      navigate("/product-lists");
      setLoading(false);
      setFlashAlert(false);
    });
  };
  //

  // Handle update product
  const hadleUpdateProduct = () => {
    // console.log("param id: " + params.id);
    setLoading(true);
    toast(`Update Successfully!`);
    const data = {
      product_name: productName,
      product_code: productCode,
      qty: qty,
      price_in: priceIn,
      price_out: priceOut,
      categories_id: onChangeCategories,
    };
    fetchAPI("api/products/" + params.id, "PUT", data).then((res) => {
      console.log(res);
      navigate("/product-lists");
      setLoading(false);
    });

    // axios({
    //   url: "http://127.0.0.1:8000/api/products/" + params.id,
    //   method: "PUT",
    //   data: {
    //     "product_name": productName,
    //     "product_code": productCode,
    //     "qty": qty,
    //     "price_in": priceIn,
    //     "price_out": priceOut,
    //     "categories_id": onChangeCategories,
    //   }
    // }).then((res) => {
    //   console.log(res.data);

    //   navigate("/product-lists");
    //   setLoading(false);
    // });
  };
  return (
    <>
      <TopNavBar />
      <div>
        {<FlashAlert title="Added successfully!" isAlert={flashAlert} />}
      </div>
      <div className="container-md">
        <h3>{params.id === undefined ? "Create" : "Modify"} Product </h3>

        <div className="mt-4">{<SpinLoading loading={loading} />}</div>
        <Form className="mt-4">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            size="md"
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={onChangeProductName}
          />
          <br />
          <Form.Label>Barcode</Form.Label>
          <Form.Control
            size="md"
            type="number"
            placeholder="Barcode"
            value={productCode}
            onChange={onChangeProductCode}
          />

          <br />
          <Form.Label>Qty</Form.Label>
          <Form.Control
            size="md"
            type="number"
            placeholder="Qty"
            value={qty}
            onChange={onChangeQty}
          />

          <br />
          <Form.Label>Price In</Form.Label>

          <Form.Control
            size="md"
            type="number"
            placeholder="Price In"
            value={priceIn}
            onChange={onChangePriceIn}
          />

          <br />
          <Form.Label>Price Out</Form.Label>
          <Form.Control
            size="md"
            type="number"
            placeholder="Price Out"
            value={priceOut}
            onChange={onChangePriceOut}
          />

          <br />
          <Form.Label>Image</Form.Label>
          <Form.Control
            size="md"
            type="file"
            onChange={onChangeImage}
            accept="image/jpg, image/jpeg, image/png"
          />
          <br />
          <Form.Label>Categories</Form.Label>

          <Form.Select size="md"  onChange={onChangeCategory}>
            {categories?.map((item, index) => {
              return (
              <option value={item.id} key={index}>
                {item.name}
              </option>
              );
            })}
          </Form.Select>
          <br/>
          <Box>
            {params.id === undefined && (
              <Button
                variant="contained"
                style={{
                  textTransform: "capitalize",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
                onClick={handleSave}
              >
                <AiFillSave />
                Save
              </Button>
            )}

            {params.id !== undefined && (
              <Button
                variant="contained"
                style={{
                  textTransform: "capitalize",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
                onClick={hadleUpdateProduct}
              >
                <AiFillSave />
                Modify
              </Button>
            )}
          </Box>
        </Form>
      </div>
    </>
  );
};

export default CreateProduct;
