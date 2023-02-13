import { async } from "@firebase/util";
import "./signin.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { UserAuth } from "../../Context/AuthContext";
const Signin = () => {
  const navigate = useNavigate();

  const { googleSignin, user } = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignin();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user != null) {
      navigate("/product-orders");
    }
  }, []);
  return (
    <div>
      <Container fluid className="sign-in-container">
        <Button
          variant="secondary"
          style={{ display: "flex", alignItems: "center", gap: 3 }}
          onClick={handleGoogleSignIn}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
            alt=""
            width={20}
          />
          Signin With Google Account
        </Button>
      </Container>
    </div>
  );
};

export default Signin;
