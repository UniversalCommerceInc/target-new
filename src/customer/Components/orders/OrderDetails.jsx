import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ordersById } from "../../../action";
import { FaLongArrowAltLeft, FaCheck } from "react-icons/fa";



import styled, { keyframes } from "styled-components";
import AddressCard from "../adreess/AdreessCard";
import HeaderTop from "../Navbar/HeaderTop";
import Navigation from "../Navbar/Navigation";
// import Spinner from "../Spinners/Spinner";s

const Container = styled.div`
  font-family: Arial, sans-serif;
  width: 90%;
  margin: auto;
  margin-top: 10px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const BackLink = styled.p`
  text-decoration: none;
  color: #000;
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &:hover {
    color: #444444;
    text-decoration: underline;
  }
`;

const OrderTitle = styled.h1`
  font-size: 29px;
  margin-bottom: 5px;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const OrderDate = styled.span`
  font-size: 18px;
  color: #888;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const StatusBadge = styled.span`
  background-color: #e0e7ff;
  color: #ff6404;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
  display: inline-block;
`;

const OrderProgress = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: 768px) {
    flex-direction: row;
    padding: 10px 0;
  }
`;

const ProgressStep = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const ProgressCircle = styled.div`
  background-color: ${(props) => (props.active ? "#fb0e0e" : "#e0e0e0")};
  color: ${(props) => (props.active ? "#fff" : "#888")};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const InputGroup = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  color: #888;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-top: 5px;
`;

const ItemSection = styled.div`
  border: 1px solid #b2b1b1;
  border-radius: 8px;
  padding: 20px 50px;
  margin-top: 20px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ItemImage = styled.img`
  width: 180px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const ItemDetails = styled.div`
  flex-grow: 1;
`;

const ItemTitle = styled.p`
  font-size: 18px;
  max-width: "300px";
  margin: 0;
  @media (max-width: 768px) {
    margin: 0 !important;
  }
`;

const ItemQuantity = styled.p`
  font-size: 18px;
  color: #030303;
  font-weight: bold;
  margin: 0;
`;

const ItemPrice = styled.p`
  font-size: 18px;
  margin: 0;
`;

const Summary = styled.div`
  font-size: 18px;
  margin-top: 20px;

  @media (max-width: 768px) {
  }
`;

// style={{ display: 'flex', gap: '20px', width: '100%', justifyContent: 'space-between', }}

const AddressCont = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Div = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: ${(props) => (props.total ? "#000" : "#888")};
  font-weight: ${(props) => (props.total ? "bold" : "normal")};
`;

const progressAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%; /* Adjust this percentage based on the progress */
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled components
const ProgressWidget = styled.div`
  width: 90%;
  margin: 20px auto;
  text-align: center;
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

const ProgressBar = styled.div`
  position: relative;
  flex: 1;
  height: 4px;
  background-color: #e0e0e0;
  margin: 0 10px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background-color: #676869;
  animation: ${progressAnimation} 1s ease forwards;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ completed, active }) =>
    completed ? "#f44336" : active ? "#f44336" : "#e0e0e0"};
  color: ${({ completed }) => (completed ? "white" : "#000")};
  font-size: 12px;
  cursor: pointer;
  animation: ${({ active }) => (active ? pulseAnimation : "none")} 1s infinite;
`;

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "#4caf50";
    case "Pending":
      return "#ff9800";
    case "PaymentAuthorized":
      return "#008cff";
    case "Cancelled":
      return "#f44336";
    default:
      return "#000";
  }
};

const OrderDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();
  const dispatch = useDispatch();

  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await ordersById(orderId);
        setData(orders?.data); // Access the response data here
      } catch (error) {
        console.error("Error fetching customer orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);
  // console.log("data", data);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()}  `;
  };

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

  function formatText(str) {
    return str
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }
  function formatDateTime(dateString, num) {
    const date = new Date(dateString);

    // If num is 4, add 4 days to the date
    if (num === 4) {
      date.setDate(date.getDate() + 4);
    }

    // Define options for time and date formatting
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const dateOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    // Format the time and date separately
    const formattedTime = date.toLocaleString("en-US", timeOptions);
    const formattedDate = date.toLocaleString("en-US", dateOptions);

    // Combine the formatted time and date
    return num === 4
      ? `${formattedDate}`
      : `${formattedTime}, ${formattedDate}`;
  }

  return (
    <>
      {/* {loading && <Spinner />} */}
      <HeaderTop/>
      <Navigation/>
      <Container>
        <BackLink style={{ display: "flex", fontSize: "18px", gap: "5px" }}>
          <FaLongArrowAltLeft />
          <Link to="/order-history"> Orders</Link>
        </BackLink>
        <OrderTitle>Order Details #{data?.id}</OrderTitle>
        <OrderDate>Placed On: {formatDate(data?.createdAt)}</OrderDate>
        {/* <StatusBadge>SHIPPING</StatusBadge> */}

        <ProgressWidget>
          {data?.orderState === "Open" && (
            <ProgressContainer>
              <Step completed>
                <FaCheck />
              </Step>
              <ProgressBar>
                <ProgressFill />
              </ProgressBar>
              <Step active> 2</Step>
              <ProgressBar>
                <ProgressFill />
              </ProgressBar>
              <Step>3</Step>
            </ProgressContainer>
          )}
          {data?.state === "Delivered" && (
            <ProgressContainer>
              <Step completed>
                <FaCheck />
              </Step>
              <ProgressBar>
                <ProgressFill />
              </ProgressBar>
              <Step completed>
                <FaCheck />{" "}
              </Step>
              <ProgressBar>
                <ProgressFill />
              </ProgressBar>
              <Step completed>
                <FaCheck />
              </Step>
            </ProgressContainer>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <div style={{ textAlign: "start" }}>
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                ORDER CONFIRMED
              </p>
              <p style={{ fontSize: "14px", color: "#888" }}>
                {formatDateTime(data?.createdAt)}
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>SHIPPING</p>
              <p style={{ fontSize: "14px", color: "#888" }}>
                Shipped with FedEX
              </p>
            </div>
            <div style={{ textAlign: "end" }}>
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>TO DELIVER</p>
              <p style={{ fontSize: "14px", color: "#888" }}>
                {`Estimated date: ${formatDateTime(data?.createdAt, 4)}`}
              </p>
            </div>
          </div>
        </ProgressWidget>

        <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>Items Ordered</h1>
        <ItemSection>
          {data?.lineItems?.map((el, index) => (
            <>
              <Item key={index}>
                <ItemImage src={el?.variant.images[0].url} alt="Item 1" />
                <ItemDetails style={{ marginLeft: "100px" }}>
                  <ItemTitle style={{ maxWidth: "230px" }}>
                    {formatText(el?.variant.sku)}
                  </ItemTitle>
                </ItemDetails>
                <ItemDetails>
                  <ItemQuantity>{el?.quantity}</ItemQuantity>
                </ItemDetails>
                <ItemPrice>
                  {amountPrint(el?.price.value.centAmount / 100)}
                </ItemPrice>
              </Item>
              <hr style={{ border: "1px solid #e0e0e0" }} />
            </>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "25px",
            }}
          >
             <div>
          
        </div>
            <Summary>
              <SummaryRow>
                <span style={{ fontSize: "23px", marginRight: "110px" }}>
                  Subtotal
                </span>
                <span style={{ fontSize: "23px" }}>
                  {amountPrint(data?.totalPrice?.centAmount / 100)}
                </span>
              </SummaryRow>
              <SummaryRow>
                <span style={{ fontSize: "23px" }}>Shipping </span>
                <span style={{ color: "#fc2008", fontSize: "23px" }}>
                  {amountPrint(data?.shippingWithTax)}
                </span>
              </SummaryRow>
              <SummaryRow
                style={{ borderTop: "2px solid #e0e0e0", marginTop: "18px" }}
                total
              >
                <span style={{ fontSize: "26px", margin: "18px 0" }}>
                  Total
                </span>
                <span style={{ fontSize: "26px", margin: "18px 0" }}>
                  {amountPrint(data?.totalPrice?.centAmount / 100)}
                </span>
              </SummaryRow>
            </Summary>
          </div>
        </ItemSection>
        <AddressCont>
          <Div style={{ width: "100%" }}>
            <AddressCard
              heading={"Shipping Address"}
              address={data?.shippingAddress}
            />
          </Div>
          <Div style={{ width: "100%" }}>
            <AddressCard
              heading={"Billing Address"}
              address={data?.billingAddress}
            />
          </Div>
        </AddressCont>
      </Container>
    </>
  );
};

export default OrderDetails;
