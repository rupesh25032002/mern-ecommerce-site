import axios from "axios";
import React, { useState } from "react";
import { styled } from "styled-components";
import { useEffect } from "react";
import { setAdminOrderData, setUserOrderData } from "../reducer/OrderSlice";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;
const AdminOrderDetail = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state?.userOrder?.adminOrderDetail);
  const [status, setStatus] = useState([
    "Not process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);

  //get user order detail
  const getAdminOrderDetail = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/getall-order");
      if (data?.success) dispatch(setAdminOrderData(data?.order));
    } catch (error) {
      console.log(error);
    }
  };

  //handle Status of order
  const handleStatus = async (orderId, value) => {
    try {
      const { data } = await axios.put("/api/v1/order/update-status", {
        orderId,
        status: value,
      });
      if (data?.success) getAdminOrderDetail();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminOrderDetail();
  }, []);

  return (
    <Wrapper>
      <h1 className="text-center mb-3">ORDER DETAIL</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Status</th>
            <th scope="col">Buyer</th>
            <th scope="col">Date</th>
            <th scope="col">Payment</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orderData?.map((val, i) => {
            return (
              <>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <Select
                      defaultValue={val?.status}
                      onChange={(value) => handleStatus(val?._id, value)}
                    >
                      {status?.map((val, i) => {
                        return (
                          <Option key={i} value={val}>
                            {val}
                          </Option>
                        );
                      })}
                    </Select>
                  </td>
                  <td>{val?.buyer?.name}</td>
                  <td>{moment(val?.createdAt).fromNow()}</td>
                  <td>{val?.payment?.success ? "Success" : "Failed"}</td>
                  <td>{val?.products?.length}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default AdminOrderDetail;
