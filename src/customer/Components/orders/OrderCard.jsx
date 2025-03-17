import { Box, Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();
  // console.log("items fsfs", order);
  return (
    <Box
      className="p-2 shadow-lg hover:shadow-2xl border  cursor-pointer "
      onClick={() => navigate(`/account/order/${order?.orderId}`)}
    >
      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2}>
          <div>
            {/* <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={item?.images[0]}
              alt=""
            /> */}
            <p className="mb-2">#{order?.orderId}</p>
            {/* <div className="ml-5">
              <p className="mb-2">{item?.productName}</p>
              <p className="opacity-50 text-xs font-semibold space-x-5">
                <span>Size: {item?.quantity}</span>
              </p>
            </div> */}
          </div>
        </Grid>
        <Grid item xs={2}>
          <p>₹{order.totalAmount / 100}</p>
        </Grid>

        <Grid item xs={3}>
          <p>₹{order?.orderDate}</p>
        </Grid>
        <Grid item xs={3}>
          <p>{order?.status}</p>
        </Grid>
        {/* <Grid item xs={4}>
          <p className="space-y-2 font-semibold">
            {order?.status === "Delivered" ? (
              <>
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />

              </>
            ) : (
              <>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>Delivered </span>
              </>
            )}
          </p>
          <p className="text-xs">Your Item Has Been Delivered</p>

        </Grid> */}
        {/* {item.status === "Delivered" && (
            <div
              onClick={() => navigate(`/account/rate/{id}`)}
              className="flex items-center text-blue-600 cursor-pointer"
            >
              <StarIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
              <span>Rate & Review Product</span>
            </div>
          )} */}
      </Grid>
    </Box>
  );
};

export default OrderCard;
