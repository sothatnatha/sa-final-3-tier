import React, { useState, useEffect } from "react";
import TopNavBar from "../../Components/Navbar/TopNavBar";
import { fetchAPI } from "../../Helper/Helper";
import { Table } from "react-bootstrap";
import { Button } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import { BsTrash } from "react-icons/bs";
import { SpinLoading } from "../../Components/SpinLoading/SpinLoading";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductLists = () => {
  const url = "http://127.0.0.1:8000/storage/";
  const navigate = useNavigate();
  // STATES
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProductList();
  }, []);

  const getAllProductList = () => {
    setLoading(true);
    fetchAPI("api/products", "GET", {}).then((res) => {
      console.log(res);
      setProductsList(res);
      setLoading(false);
    });
  };

  // Handle delete
  const handleDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    var cf_dialog = confirm("Are you want to detete this id? " + id);
    if (cf_dialog) {
      var data = {
        id: id,
      };
      fetchAPI("api/products/" + id, "DELETE", data).then((res) => {
        var data = res.data;
        getAllProductList();
        toast(`Delete Successfully!`);

      });
    } else alert("You have cancel the dialog!");
  };
  //

  // Handle Edit
  const handleEdit = (id) => {
    navigate("/product/edit/" + id);
  };
  // Show Modal

  // Handle search
  const handleOnchangeSearch = (e) => {
    var txtProdCode = e.target.value;
    if (txtProdCode) {
      setLoading(true);
      axios
        .get("http://127.0.0.1:8000/api/products/search/" + txtProdCode)
        .then((res) => {
          setProductsList(res.data);
          setLoading(false);
          // console.log(res.data);
        });
    } else {
      getAllProductList();
    }
  };

  return (
    <div>
      <TopNavBar />
      <div className="container-md">
        <h3>Product List</h3>
        <Form.Group 
          className="mb-2"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <Form.Label>Search By Barcode</Form.Label>
            <Form.Control
              size="md"
              type="number"
              placeholder="Search Barcode"
              onChange={handleOnchangeSearch}
            />
          </div>
          <div className="totalRecordText">
            Total Records {productsList.length}
          </div>
        </Form.Group>

        <div
          className="loadingSpin"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "12px 0",
          }}
        >
          {<SpinLoading loading={loading} />}
        </div>
        {/* <div>{productsList.length > 0 ? "" : "Emty List"}</div> */}
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Barcode</th>
              <th>Qty (Stock In)</th>
              <th>Price In($)</th>
              <th>Price Out($)</th>
              <th>Image</th>
              {/* <th>Cate_id</th> */}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {productsList?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.product_name}</td>
                  <td>{item.product_code}</td>
                  <td>{item.qty} pcs</td>
                  <td>$ {item.price_in}</td>
                  <td>$ {item.price_out}</td>
                  <td>
                    <img src={url + item.image} alt="" width={30} />
                  </td>
                  {/* <td>{item.categories_id}</td> */}
                  <td>
                    <Button>
                      <AiFillEdit
                        style={{ fontSize: 20 }}
                        onClick={() => handleEdit(item.id)}
                      />
                    </Button>
                    <Button onClick={() => handleDelete(item.id)}>
                      <BsTrash style={{ fontSize: 20 }} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ProductLists;
