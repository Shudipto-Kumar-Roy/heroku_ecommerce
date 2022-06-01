import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie, Line } from "react-chartjs-2";
import "./Dashboard.css";
import { getAllOrdersApi, getAllProductsAdminApi, getAllUsersApi } from "../../api";
import { useAlert } from "react-alert";

const Dashboard = () => {
  const alert = useAlert();
  const [productsData, setProductsData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const res = await getAllProductsAdminApi(alert); // api call
      if (res.status === 200) {
        setProductsData(res.data.products);
      }
    };
    getProducts();
  }, []);
  useEffect(() => {
    const getOrders = async () => {
      const res = await getAllOrdersApi(alert); // api call
      if (res.status === 200) {
        setOrdersData(res.data.orders);
      }
    };
    getOrders();
  }, []);
  useEffect(() => {
    const getAllUsers = async () => {
      const res = await getAllUsersApi(alert) // api call
      if (res.status === 200) {
        setUsersData(res.data.users);
      }
    }
    getAllUsers();
  }, [])

  let totalAmount=0;
  ordersData && ordersData.forEach((order)=>{
    totalAmount += order.totalPrice;
  }) 

  let outofstock = 0;
  productsData && productsData.forEach((product) => {
    if (product.stock === 0) {
      outofstock += 1;
    }
  })
  const linedata = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        data: [0, totalAmount],
        backgroundColor: ["#df5201d8"],
      },
    ],
  };
  const piedata = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        data: [outofstock, productsData.length - outofstock],
        backgroundColor: ["#181818", "#df5201d8"],
      },
    ],
  };
  return (
    <>
      <Container>
      <Row>
        <Col md={12}>
          <h1 className="text-center dashboard_heading">Dashboard</h1>
        </Col>
      </Row>
        <Row className="my-5">
          <Col md={12}>
            <div className="first_row">
              <div>
                <div>
                  <h3>Total Amount</h3>
                  <h4>{totalAmount} &#2547; </h4>
                </div>
              </div>
              <div>
                <div>
                  <h3>Products</h3>
                  <h4>{productsData && productsData.length}</h4>
                </div>
              </div>
              <div>
                <div>
                  <h3>Orders</h3>
                  <h4>{ordersData && ordersData.length}</h4>
                </div>
              </div>
              <div>
                <div>
                  <h3>Users</h3>
                  <h4>{usersData && usersData.length}</h4>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            <div className="second_row">
              <div>
                <Line data={linedata} />
              </div>
            </div>
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            <div className="third_row">
              <div>
                <Pie data={piedata} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
