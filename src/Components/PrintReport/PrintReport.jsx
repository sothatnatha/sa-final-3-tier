import React from "react";
import { Table } from "react-bootstrap";
import './printreport.css';
export const ComponentToPrint = React.forwardRef((props, ref) => {
  // Format the price above to USD using the locale, style, and currency.
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  });
  //


  const { cart, totalAmt } = props;
  return (
    <div ref={ref} style={{ padding: "20px" }}>
      <div className="report-header-content">
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3787/3787917.png"
            alt=""
            width={30}
          />
          <div>My POS</div>
        </div>
        <div>
            <div>Invoices</div>
            <div className="seller"><b>Seller: </b>Admin</div>
        </div>

      </div>
      <div className="dash-ruler mt-2 mb-2"></div>
      <div className="mt-1">
        <div><b>Address:</b> MyPOS BKK Street 391Z</div>
        <div><b>Tel:</b> (+855) 96 255 1242</div>
      </div>
      <div className="mt-1"><b>Description</b></div>
      <div className="dash-ruler mt-2 mb-2"></div>

      <Table striped bordered hover responsive size="sm" className="mt-1">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Amount</th>
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
                </tr>
              ))
            : ""}
        </tbody>
      </Table>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <h5>Payments= {USDollar.format(totalAmt)}</h5>
        </div>
        <p
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          Thank you! Please come again!
        </p>
      </div>
    </div>
  );
});
