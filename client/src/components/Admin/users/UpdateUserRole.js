import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../Authentication/LoginSignup.css";
import { useAlert } from "react-alert";
import { Link, useNavigate,useParams } from "react-router-dom";
import { getSingleUserApi, updateUserRoleApi } from "../../../api";

const UpdateUserRole = () => {
    const alert = useAlert();
    const {id} = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState("user");
    const [user,setUser]= useState({});

    const handleUpdate = async (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.set("role", role);
        const res = await updateUserRoleApi(formdata,id, alert); // api call
        if (res.status === 200) {
            alert.success("User Role Updated Successfully");
            navigate("/admin/allusers");
        }
    };

    useEffect(()=>{
     const getSingleUser = async()=>{
          const res = await getSingleUserApi(id,alert); // api call
          if(res.status===200)
          {
             setUser(res.data.user);
          }
     }
     getSingleUser();
    },[])

    return (
        <>
            <Container className="loginsignup_container">
                <Row>
                    <Col md={12} className="mx-auto">
                        <div className="loginsignup_formcontainer">
                            <div className="formtogglegroup">
                                <button className={`toggleborder`}>Update User Role</button>
                            </div>
                            <form action="" onSubmit={handleUpdate}>
                                <div className="formgroup">
                                    <input
                                        type="text"
                                        disabled={true}
                                        value={user.name}
                                        className="formcontroller"
                                    />
                                </div>
                                <div className="formgroup">
                                    <input
                                        type="email"
                                        disabled={true}
                                        value={user.email}
                                        className="formcontroller"
                                    />
                                </div>
                                <div className="formgroup">
                                    <input
                                        type="text"
                                        disabled={true}
                                        value={user.userRole}
                                        className="formcontroller"
                                    />
                                </div>
                                <div className="formgroup">
                                    <select
                                        name="role"
                                        className="formcontroller"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select></div>

                                <div className="formgroup">
                                    <button type="submit" className="whiteButton">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UpdateUserRole;
