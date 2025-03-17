import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import { ordersById } from "../../../action";
import AddressCard from "../adreess/AdreessCard";
import Confetti from "react-confetti";
import { Modal, Box, Typography, Button } from "@mui/material";
import HeaderTop from "../Navbar/HeaderTop";
import Footer from "../footer/Footer";
import Navigation from "../Navbar/Navigation";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const fadeInAnimation = css`
//   animation: ${fadeIn} 0.5s ease-in-out;
// `;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
`;

const Section = styled.div`
  width: 100%;
  padding: 20px;
  @media (min-width: 768px) {
    width: 48%;
  }
`;

const ThankYou = styled.div`
  text-align: center;
  .successImage {
    display: flex;
    justify-content: center;
  }
  img {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
  h1 {
    font-size: 24px;
    margin: 20px 0 10px;
  }
  p {
    margin: 5px 0;
  }
  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const NewCollection = styled.div`
  img {
    width: 100%;
    height: auto;
    margin-top: 20px;
    border-radius: 10px;
  }
`;

const ItemsOrdered = styled.div`
  margin-top: 20px;
  h2 {
    margin-bottom: 10px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      border: 1px solid #ccc;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #f9f9f9;
    }
    tfoot td {
      text-align: right;
    }
  }
`;

const AddressInfo = styled.div`
  margin-top: 20px;
  padding: 0 50px;
  width: 100%;
  gap: 20px;
  display: flex;
  justify-content: space-between;
  .flex {
    border: 1px solid #ccc;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    border-radius: 5px;
    h3 {
      font-weight: bold;
      font-size: 18px;
    }
    .method {
      margin: 0 auto;
    }
  }
`;

const PaymentSuccess = () => {
  const location = useLocation();
  const paymentsuccessdata = location.state;
  const { orderId } = useParams();
  const [open, setOpen] = useState(true); // State to control modal
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { newOrder } = useSelector((store) => store);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const orders = await ordersById(orderId);
          setData(orders?.data); // Access the response data here
        } catch (error) {
          console.error("Error fetching customer orders:", error);
        } 
      };
  
      fetchData();
    }, [orderId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false); // Hide confetti after 5 seconds
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setOpen(false);

  const amountPrint = (price) => {
    if (typeof price !== "undefined" && price !== null) {
      const formattedPrice =
        "$" +
        price.toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        });
      return formattedPrice;
    } else {
      return "$0.00"; // Or any default value you prefer
    }
  };

  return (
    <>
      {/* <HeaderTop /> */}
      <Navigation />
      <GlobalStyle />
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="thank-you-modal-title"
        aria-describedby="thank-you-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            // ...fadeInAnimation,
          }}
        >
          <Typography id="thank-you-modal-title" variant="h6" component="h2">
            Thank You for Shopping!
          </Typography>
          <Typography id="thank-you-modal-description" sx={{ mt: 2 }}>
            We appreciate your business. Your order ID is {orderId}.
          </Typography>
          <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
      <Container>
        <Section>
          <ThankYou>
            <div className="successImage">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png"
                alt="Checkmark"
              />
            </div>
            <h1>THANK YOU FOR YOUR PURCHASE!</h1>
            <p>
              You will receive an order confirmation email with details of your
              order.
            </p>
            <p>Your order # is: {data?.id}</p>
            <Link to="/search">Continue Shopping</Link>
          </ThankYou>
          <NewCollection>
            <img
              src="https://media.licdn.com/dms/image/D5609AQEKV8C8BlSebw/company-featured_1128_635/0/1682660170927?e=2147483647&v=beta&t=oGMtkTPcLEGPVVV2T3nkhRoSxb47dFb0AZWXkH5WGfA"
              alt="New Collection"
            />
          </NewCollection>
        </Section>
        <Section>
          <ItemsOrdered>
            <h2>ITEMS ORDERED</h2>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Id</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {data?.lineItems?.map((el, index) => (
                  <tr key={index}>
                    <td>{el?.name["en-US"]}</td>
                    <td>{el?.id}</td>
                    <td>{amountPrint(el?.price.value.centAmount / 100)}</td>
                    <td>Ordered: {el?.quantity}</td>
                    <td>{amountPrint(el?.totalPrice.centAmount / 100)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4">Subtotal</td>
                  <td>{amountPrint(data?.totalPrice?.centAmount / 100)}</td>
                </tr>
                <tr>
                  <td colSpan="4">Shipping & Handling</td>
                  <td>{amountPrint(data?.shippingWithTax) || 0}</td>
                </tr>
                <tr>
                  <td colSpan="4">Grand Total</td>
                  <td>{amountPrint(data?.totalPrice?.centAmount / 100)}</td>
                </tr>
              </tfoot>
            </table>
          </ItemsOrdered>
        </Section>
        <div style={{ width: "100%" }}>
          <AddressInfo>
            <div style={{ width: "100%" }}>
              <AddressCard
                heading={"Billing Address"}
                address={data?.billingAddress}
              />
            </div>
            <div style={{ width: "100%" }}>
              <AddressCard
                heading={"Shipping Address"}
                address={data?.shippingAddress}
              />
            </div>
          </AddressInfo>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default PaymentSuccess;
