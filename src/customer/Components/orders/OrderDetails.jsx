import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ordersById } from "../../../action";
import { FaLongArrowAltLeft, FaCheck, FaTruck, FaBox, FaMoneyBillWave, FaShippingFast } from "react-icons/fa";

import styled, { keyframes } from "styled-components";
import AddressCard from "../adreess/AdreessCard";
import HeaderTop from "../Navbar/HeaderTop";
import Navigation from "../Navbar/Navigation";

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
  background-color: ${(props) => props.bgColor || "#e0e7ff"};
  color: ${(props) => props.textColor || "#ff6404"};
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 10px;
  display: inline-block;
`;

const InfoCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  flex: 1;
  min-width: 200px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InfoCardTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoCardContent = styled.p`
  font-size: 14px;
  color: #333;
  margin: 5px 0;
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

const AddressCont = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
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

// New components for tax details
const TaxDetails = styled.div`
  margin-top: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
`;

const TaxTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
`;

const TaxTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TaxRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: none;
  }
`;

const TaxCell = styled.td`
  padding: 8px 5px;
  font-size: 14px;
  color: #333;
`;

const TaxHeader = styled.th`
  text-align: left;
  padding: 8px 5px;
  font-size: 14px;
  font-weight: bold;
`;

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return { bg: "#e6f7e6", text: "#4caf50" };
    case "Open":
      return { bg: "#fff4e5", text: "#ff9800" };
    case "Pending":
      return { bg: "#fff4e5", text: "#ff9800" };
    case "PaymentAuthorized":
    case "Paid":
      return { bg: "#e6f0ff", text: "#008cff" };
    case "Cancelled":
      return { bg: "#ffebee", text: "#f44336" };
    default:
      return { bg: "#e0e0e0", text: "#000" };
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
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()}  `;
  };

  const amountPrint = (price, currencyCode = "USD") => {
    if (typeof price !== "undefined" && price !== null) {
      const symbol = currencyCode === "EUR" ? "€" : "$";
      const formattedPrice =
        symbol +
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
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }
  
  function formatDateTime(dateString, num) {
    if (!dateString) return "";
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

  const getDeliveryTypeDisplay = (type) => {
    switch(type) {
      case "ship":
        return "Ship To Address";
      case "pickup":
        return "In-Store Pickup";
      case "delivery":
        return "Home Delivery";
      default:
        return type || "N/A";
    }
  };

  const getOrderStateDisplay = (state) => {
    switch(state) {
      case "Open":
        return "Processing";
      case "Complete":
        return "Delivered";
      default:
        return state || "N/A";
    }
  };

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
          {/* <div
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
                {data?.shippingInfo?.shippingMethodName || "Standard Shipping"}
              </p>
            </div>
            <div style={{ textAlign: "end" }}>
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>TO DELIVER</p>
              <p style={{ fontSize: "14px", color: "#888" }}>
                {`Estimated date: ${formatDateTime(data?.createdAt, 4)}`}
              </p>
            </div>
          </div> */}
        </ProgressWidget>
        <div style={{ marginTop: "15px" }}>
          {data?.orderState && (
            <StatusBadge 
              bgColor={getStatusColor(data.orderState).bg} 
              textColor={getStatusColor(data.orderState).text}
            >
              ORDER STATUS: {getOrderStateDisplay(data.orderState)}
            </StatusBadge>
          )}
          
          {data?.paymentState && (
            <StatusBadge 
              bgColor={getStatusColor(data.paymentState).bg} 
              textColor={getStatusColor(data.paymentState).text}
            >
              PAYMENT: {data.paymentState}
            </StatusBadge>
          )}
          
          {data?.custom?.fields?.deliveryType && (
            <StatusBadge 
              bgColor="#e6f7e6" 
              textColor="#4caf50"
            >
              DELIVERY TYPE: {getDeliveryTypeDisplay(data.custom.fields.deliveryType)}
            </StatusBadge>
          )}
        </div>
        
        <InfoCardContainer>
          <InfoCard>
            <InfoCardTitle><FaMoneyBillWave /> Payment Details</InfoCardTitle>
            <InfoCardContent>
              <strong>Status:</strong> {data?.paymentState || "N/A"}
            </InfoCardContent>
            {data?.transactionFee && (
              <InfoCardContent>
                <strong>Transaction Fee:</strong> Applied
              </InfoCardContent>
            )}
            {data?.paymentInfo?.payments && (
              <InfoCardContent>
                <strong>Payment ID:</strong> {data.paymentInfo.payments[0]?.id || "N/A"}
              </InfoCardContent>
            )}
          </InfoCard>
          
          <InfoCard>
            <InfoCardTitle><FaShippingFast /> Shipping Details</InfoCardTitle>
            <InfoCardContent>
              <strong>Method:</strong> {data?.shippingInfo?.shippingMethodName || "N/A"}
            </InfoCardContent>
            <InfoCardContent>
              <strong>Delivery Type:</strong> {getDeliveryTypeDisplay(data?.custom?.fields?.deliveryType)}
            </InfoCardContent>
            <InfoCardContent>
              <strong>Price:</strong> {data?.shippingInfo?.price?.centAmount ? 
                amountPrint(data.shippingInfo.price.centAmount/100, data.shippingInfo.price.currencyCode) : 
                "N/A"}
            </InfoCardContent>
          </InfoCard>
          
          <InfoCard>
            <InfoCardTitle><FaBox /> Order Info</InfoCardTitle>
            <InfoCardContent>
              <strong>Order Date:</strong> {formatDateTime(data?.createdAt)}
            </InfoCardContent>
            <InfoCardContent>
              <strong>Last Updated:</strong> {formatDateTime(data?.lastModifiedAt)}
            </InfoCardContent>
            {data?.store && (
              <InfoCardContent>
                <strong>Store:</strong> {data.store.key}
              </InfoCardContent>
            )}
          </InfoCard>
        </InfoCardContainer>

       

        <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>Items Ordered</h1>
        <ItemSection>
          {data?.lineItems?.map((el, index) => (
            <React.Fragment key={index}>
              <Item>
                <ItemImage src={el?.variant.images && el.variant.images[0]?.url} alt={el?.name?.["en-US"] || "Product"} />
                <ItemDetails style={{ marginLeft: "100px" }}>
                  <ItemTitle style={{ maxWidth: "230px" }}>
                    {el?.name?.["en-US"] || formatText(el?.variant.sku)}
                  </ItemTitle>
                  <p style={{ fontSize: "14px", color: "#888", margin: "5px 0" }}>
                    SKU: {el?.variant.sku}
                  </p>
                  {el?.variant.key && (
                    <p style={{ fontSize: "14px", color: "#888", margin: "5px 0" }}>
                      Product Key: {el.variant.key}
                    </p>
                  )}
                </ItemDetails>
                <ItemDetails>
                  <ItemQuantity>{el?.quantity}</ItemQuantity>
                </ItemDetails>
                <ItemPrice>
                  {amountPrint(el?.price.value.centAmount / 100, el?.price.value.currencyCode)}
                </ItemPrice>
              </Item>
              <hr style={{ border: "1px solid #e0e0e0" }} />
            </React.Fragment>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "25px",
            }}
          >
            <Summary>
              <SummaryRow>
                <span style={{ fontSize: "23px", marginRight: "110px" }}>
                  Subtotal
                </span>
                <span style={{ fontSize: "23px" }}>
                  {data?.totalPrice && amountPrint(data.totalPrice.centAmount / 100, data.totalPrice.currencyCode)}
                </span>
              </SummaryRow>
              <SummaryRow>
                <span style={{ fontSize: "23px" }}>Shipping </span>
                <span style={{ color: "#fc2008", fontSize: "23px" }}>
                  {data?.shippingInfo?.price && amountPrint(data.shippingInfo.price.centAmount / 100, data.shippingInfo.price.currencyCode)}
                </span>
              </SummaryRow>
              
              {data?.taxedPrice && (
                <SummaryRow>
                  <span style={{ fontSize: "23px" }}>Tax </span>
                  <span style={{ fontSize: "23px" }}>
                    {amountPrint(data.taxedPrice.totalTax.centAmount / 100, data.taxedPrice.totalTax.currencyCode)}
                  </span>
                </SummaryRow>
              )}
              
              <SummaryRow
                style={{ borderTop: "2px solid #e0e0e0", marginTop: "18px" }}
                total
              >
                <span style={{ fontSize: "26px", margin: "18px 0" }}>
                  Total
                </span>
                <span style={{ fontSize: "26px", margin: "18px 0" }}>
                  {data?.totalPrice && amountPrint(data.totalPrice.centAmount / 100, data.totalPrice.currencyCode)}
                </span>
              </SummaryRow>
            </Summary>
          </div>
        </ItemSection>
        
        {data?.taxedPrice && (
          <TaxDetails>
            <TaxTitle>Tax Details</TaxTitle>
            <TaxTable>
              <thead>
                <TaxRow>
                  <TaxHeader>Name</TaxHeader>
                  <TaxHeader>Rate</TaxHeader>
                  <TaxHeader>Amount</TaxHeader>
                </TaxRow>
              </thead>
              <tbody>
                {data.taxedPrice.taxPortions.map((portion, index) => (
                  <TaxRow key={index}>
                    <TaxCell>{portion.name}</TaxCell>
                    <TaxCell>{(portion.rate * 100).toFixed(1)}%</TaxCell>
                    <TaxCell>
                      {amountPrint(portion.amount.centAmount / 100, portion.amount.currencyCode)}
                    </TaxCell>
                  </TaxRow>
                ))}
                <TaxRow>
                  <TaxCell colSpan="2"><strong>Total Tax</strong></TaxCell>
                  <TaxCell>
                    <strong>
                      {amountPrint(data.taxedPrice.totalTax.centAmount / 100, data.taxedPrice.totalTax.currencyCode)}
                    </strong>
                  </TaxCell>
                </TaxRow>
              </tbody>
            </TaxTable>
          </TaxDetails>
        )}
        
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