import React from 'react';
import "./ContactUs.css"
import { Container, Row, Col } from 'react-bootstrap';
import contactus from "../../../images/contactus.jpg";
import { FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={6}>
                        <div className="left_part">
                            <img src={contactus} alt="ContactUs" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="right_part">
                            <h2>How can we help you?</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sed natus porro corrupti distinctio a quisquam, dolore quis nesciunt aliquid veritatis blanditiis facere voluptatibus perferendis, itaque nemo facilis excepturi ea. Laborum, veritatis. Doloremque debitis quaerat accusantium laborum facere animi rem, odit mollitia, voluptatum libero voluptates nemo. Ad, labore ipsa! Molestias esse et quo atque est molestiae placeat quos fuga quidem? Rem rerum minus deleniti? Molestias tenetur minus doloribus vel voluptas sint eum aliquid ab voluptatem reprehenderit ratione praesentium deserunt sequi atque placeat, iure vero. Inventore delectus repellat laudantium neque consequatur, esse fuga labore ex harum iusto magnam iure. Unde quo perspiciatis eaque expedita! Nesciunt molestias rerum, perspiciatis repudiandae accusantium fuga! Veritatis, totam necessitatibus sit culpa vero quis perferendis commodi, odit fuga porro ipsa repudiandae molestiae facilis sint eligendi distinctio illo doloremque. Veritatis rerum neque nihil esse qui? Maxime accusamus nesciunt libero nam quas impedit illum neque, consequatur, adipisci laudantium reprehenderit vitae dolores eum error fuga veritatis quo deleniti nisi commodi. Excepturi consequatur aliquid minima id molestias ducimus, natus laborum exercitationem, voluptate, labore dolor? Quis, nam voluptatem assumenda eius id repudiandae nostrum consequuntur, recusandae mollitia rem eaque quos eos. Hic nam et maiores in temporibus deleniti ipsa, architecto provident exercitationem non explicabo? Laboriosam cum nesciunt adipisci porro aperiam iure molestiae libero, magnam nam blanditiis perferendis beatae excepturi quae cupiditate, numquam quisquam, provident facilis! Nisi ea sint quod iusto repellendus est reprehenderit eaque necessitatibus earum soluta alias, explicabo pariatur harum voluptates ipsam quia, neque, itaque non labore et veritatis omnis laboriosam. Amet dolorem optio suscipit ullam accusantium assumenda sed qui vitae ea. Voluptas tempore impedit quas laborum cumque nobis doloribus explicabo odio, quo rem suscipit quae amet magni a vitae quod dolorum facilis atque veritatis possimus porro debitis maxime libero pariatur! Incidunt perferendis sint perspiciatis maxime distinctio commodi modi, sunt veniam id.</p>

                            <div className="email_container">
                                <h2>Send Us..</h2> 
                                <FaEnvelope className="icon"/>
                                <a href="mailto:shudipto345@gmail.com">shudipto345@gmail.com</a>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default ContactUs;