import React, { useEffect } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { AiOutlineUser } from "react-icons/ai";
import { RxCube } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { FaRegUserCircle, FaRegAddressCard, FaHouseUser } from "react-icons/fa";
import { getCustomerInfo, logoutCustomer } from "../../../action/Customer";
// import { get } from "../../../api/config/APIController";

const buttonStyles = "bg-blue-500 text-white p-2 rounded";
const iconStyles = "w-[30px] mr-4 rounded-full";
const titleStyles = "font-bold text-black text-lg text-neutral-500";
const descriptionStyles = "text-zinc-600";

const RightModal = ({ open, toggleModal, name }) => {
  // console.log("name", name);
  const jwt = localStorage.getItem("accesstoken");

  const user = useSelector((state) => state.newUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomerInfo())
      .then((res) => {
        // console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    <Drawer anchor="right" open={open} onClose={toggleModal}>
      <Toaster />
      <div className="w-80">
        <div className="bg-red-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center h-10 w-10 justify-center text-black border-box pl-2 rounded-full">
              {/* <AiOutlineUser className={iconStyles} /> */}
              <div
                style={{
                  fontSize: "35px",
                  color: "white",
                  marginRight: "15px",
                }}
              >
                <FaRegUserCircle />
              </div>
            </div>
            <h1 className="font-bold text-White text-xl">
              Welcome {jwt && `Back, `} <br />{" "}
              {jwt && `${user?.newUser?.firstName}!`}
            </h1>
          </div>
          <IconButton onClick={toggleModal} aria-label="close">
            <CloseIcon className="text-white" />
          </IconButton>
        </div>
        {jwt ? (
          <List>
            {/* <Link to="/profile">
              <CustomListItem
                icon={<FaRegAddressCard size={30} />}
                altText="Personal Details"
                title="Personal Details"
              />
            </Link> */}
            <Divider />
            <Link to="/order-history">
              <CustomListItem
                icon={<RxCube size={30} />}
                altText="Order History"
                title="Order History"
              />
            </Link>
            <Divider />

            <Link to="/address">
              <CustomListItem
                icon={<FaHouseUser size={30} />}
                altText="Address Book"
                title="Address Book"
              />
            </Link>
            <Divider />
          </List>
        ) : (
          <List>
            <CustomListItem
              imageSrc="/target-logo.png"
              altText="Join Target"
              title="Join Target today"
              description={
                <span>
                  Enjoy quick and easy shopping{" "}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {" "}
                    <img
                      src="/onepass.png"
                      alt="OnePass"
                      className="w-20 "
                    />{" "}
                    online account{" "}
                  </div>
                </span>
              }
            />
            <Divider />
            <Link to="/sign-in">
              <CustomListItem
                imageSrc="/button.svg"
                altText="Log in"
                title="Log in"
                description="with Target or OnePass account."
              />
            </Link>
            <Divider />
            <CustomListItem
              icon={<RxCube className={iconStyles} />}
              altText="Track my order"
              title="Track my order"
            />
            <Divider />
            <CustomListItem
              imageSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAMFBMVEVHcEyZAPGZAPGZAPGZAPGZAPGSAPD///+WAPH05/2zYPXq1vy9evbKlvjcu/qkNvP915pXAAAABXRSTlMAS9vaSuJ8hkcAAACWSURBVCiRxZLBDoAgDEMHSJkD5f//VkAOEgZXeyHspcnSleiwXpUzREZHVYbcGloavsz8/X4hvKQMViHuUHQKFIgzvBKeIGKZx2aenI0JUN+LR9hZ2TcXPwbYdklthrLTAPllrMKcRK4YE6tOZqS+yAQr/wNKCLceQqXr+HpIi+D3J9sfe18TPxdsUekqty81mUWtraEHj1AR+MyuHzwAAAAASUVORK5CYII="
              altText="Join OnePass"
              title={
                <span style={{ display: "flex", alignItems: "center" }}>
                  Join <img src="/onepass.png" alt="OnePass" className="w-20" />
                </span>
              }
              description="Get free standard delivery on eligible items"
            />
            <Divider />
          </List>
        )}
      </div>
      {jwt && (
        <Button
          className=""
          onClick={() => dispatch(logoutCustomer())}
          style={{
            backgroundColor: "#333",
            color: "white",
            position: "absolute",
            bottom: 0,
            left: "10%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            height: "50px", // Increase the height
            marginBottom: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          Logout
        </Button>
      )}
    </Drawer>
  );
};

const CustomListItem = ({ imageSrc, icon, altText, title, description }) => {
  return (
    <ListItem className="cursor-pointer">
      <ListItemIcon>
        {icon
          ? icon
          : imageSrc && (
              <img
                src={imageSrc}
                alt={altText}
                className={`${iconStyles} ml-2 rounded-full`}
              />
            )}
      </ListItemIcon>

      <ListItemText
        primary={<span className={titleStyles}>{title}</span>}
        secondary={<span className={descriptionStyles}>{description}</span>}
      />
      <ChevronRightIcon className="text-zinc-400" />
    </ListItem>
  );
};

export default RightModal;
