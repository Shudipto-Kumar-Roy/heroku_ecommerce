import React, { useEffect, useState } from "react";
import { deleteOrderApi, deleteUserApi, getAllUsersApi } from "../../../api";
import { useAlert } from "react-alert";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AllUsers.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
const AllUsers = () => {
    const alert = useAlert();
    const [users, setUsers] = useState([]);
    const [deletestate, setDeleteState] = useState(false);

    useEffect(() => {
        const getAllUsers = async () => {
            const res = await getAllUsersApi(alert) // api call
            if (res.status === 200) {
                alert.success("Users get success");
                setUsers(res.data.users);
            }
        }
        getAllUsers();
    }, [deletestate])

    const handleDelete = async (id) => {
        const isOk = window.confirm("Do you really want to delete ?");
        if (isOk) {
            const res = await deleteUserApi(id, alert);
            if (res.status === 200) {
                alert.success("User deleted successfully");
                setDeleteState(true);
            }
        }
    };
    return (<>
        <div>
            <Container>
                <Row className="my-5">
                    <Col md={12}>
                        <h1 className="text-center">All Users</h1>
                    </Col>
                    <Col md={12}>
                        <div className="users_label">
                            <h3 className="users_label_item">Name</h3>
                            <h3 className="users_label_item">Email</h3>
                            <h3 className="users_label_item">Role</h3>
                            <h3 className="users_label_item">Actions</h3>
                        </div>
                    </Col>
                    {users &&
                        users.map((user, index) => (
                            <Col md={12} key={index}>
                                <div className="users_body">
                                    <h3 className="users_body_item">{user.name}</h3>
                                    <h3 className="users_body_item">{user.email}</h3>
                                    <h3 className={`users_body_item ${user.userRole === "admin" ? "admin" : "user"}`}>{user.userRole}</h3>
                                    <h3 className="users_body_item">
                                        <Link to={`/admin/updateuser/${user._id}`}><AiFillEdit className="editUser" /></Link>
                                        <AiFillDelete className="deleteUser" onClick={() => handleDelete(user._id)} />
                                    </h3>
                                </div>
                                <div className="users_body_responsive">
                                    <div>
                                        <h3 className="users_label_item">Name</h3>
                                        <h3 className="users_label_item">Email</h3>
                                        <h3 className="users_label_item">Role</h3>
                                        <h3 className="users_label_item">Actions</h3>
                                    </div>
                                    <div>
                                        <h3 className="users_body_item">{user.name}</h3>
                                        <h3 className="users_body_item">{user.email}</h3>
                                        <h3 className={`users_body_item ${user.userRole === "admin" ? "admin" : "user"}`}>{user.userRole}</h3>
                                        <h3 className="users_body_item">
                                            <Link to={`/admin/updateuser/${user._id}`}><AiFillEdit className="editUser" /></Link>
                                            <AiFillDelete className="deleteUser" onClick={() => handleDelete(user._id)} />
                                        </h3>
                                    </div>

                                </div>
                            </Col>
                        ))}
                </Row>
            </Container>
        </div>
    </>);
}

export default AllUsers;