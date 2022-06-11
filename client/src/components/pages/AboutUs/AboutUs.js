import React from "react";
import "./AboutUs.css";
import { Container, Row, Col } from "react-bootstrap";
import aboutus from "../../../images/aboutus.jpg";
const AboutUs = () => {
    return (<>
        <Container fluid>
            <Row>
                <Col md={12}>
                    <div className="top_section">
                        <img src={aboutus} alt="AboutUs" />
                    </div>
                    <div className="bottom_section">
                        <h1 className="aboutus_heading">
                            About Us
                        </h1>
                        <p className="aboutus_subheading">We provide the best product at reasonable price
                            <br /> with fast delivery.</p>
                        <Row>
                            <Col md={6}>
                                <h2>Our Vision</h2>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, atque a. Fugiat rem consequatur reiciendis, quaerat magnam asperiores. Reiciendis quasi velit perspiciatis magni quidem pariatur aut vitae quibusdam. Tenetur, molestiae. Laboriosam ab debitis mollitia maiores, facere omnis aperiam magni quis nemo quia explicabo illum harum neque minima optio labore ratione ducimus vel? Blanditiis exercitationem nulla non beatae perspiciatis itaque cupiditate expedita! Placeat minus voluptatibus suscipit praesentium, eaque similique ea possimus dignissimos quod quasi facere alias aliquid quae reiciendis doloremque repellat eum obcaecati maxime, repudiandae accusantium sit ipsum nesciunt nulla exercitationem! Hic quisquam dolorum, beatae et velit ab consectetur iste, voluptatum doloremque excepturi laboriosam delectus dolore obcaecati veritatis illum amet exercitationem ducimus perferendis magni recusandae! Impedit facilis cupiditate a. Nulla, nemo! Sequi facilis ad vero libero cum quam sed maiores alias error? Accusantium quisquam, laborum veritatis non perferendis deserunt explicabo repellat? Beatae, repellendus. Ullam vero harum eum eos perferendis! Tenetur eligendi odit, ea repudiandae recusandae minima debitis minus labore dolore eveniet doloremque adipisci vero reprehenderit excepturi. Soluta exercitationem, sint consequuntur natus voluptates aut in quod doloribus, nemo ut eaque nobis veniam ab mollitia autem asperiores velit minima ipsam, consectetur quas harum repudiandae possimus. Mollitia consequatur illum incidunt facere quia autem laboriosam!</p>
                            </Col>
                            <Col md={6}>
                                <h2>Our Team</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sed natus porro corrupti distinctio a quisquam, dolore quis nesciunt aliquid veritatis blanditiis facere voluptatibus perferendis, itaque nemo facilis excepturi ea. Laborum, veritatis. Doloremque debitis quaerat accusantium laborum facere animi rem, odit mollitia, voluptatum libero voluptates nemo. Ad, labore ipsa! Molestias esse et quo atque est molestiae placeat quos fuga quidem? Rem rerum minus deleniti? Molestias tenetur minus doloribus vel voluptas sint eum aliquid ab voluptatem reprehenderit ratione praesentium deserunt sequi atque placeat, iure vero. Inventore delectus repellat laudantium neque consequatur, esse fuga labore ex harum iusto magnam iure. Unde quo perspiciatis eaque expedita! Nesciunt molestias rerum, perspiciatis repudiandae accusantium fuga! Veritatis, totam necessitatibus sit culpa vero quis perferendis commodi, odit fuga porro ipsa repudiandae molestiae facilis sint eligendi distinctio illo doloremque. Veritatis rerum neque nihil esse qui? Maxime accusamus nesciunt libero nam quas impedit illum neque, consequatur, adipisci laudantium reprehenderit vitae dolores eum error fuga veritatis quo deleniti nisi commodi. Excepturi consequatur aliquid minima id molestias ducimus, natus laborum exercitationem, voluptate, labore dolor? Quis, nam voluptatem assumenda eius id repudiandae nostrum consequuntur, recusandae mollitia rem eaque quos eos. Hic nam et maiores in temporibus deleniti ipsa, architecto provident exercitationem non explicabo? Laboriosam cum nesciunt adipisci porro aperiam iure molestiae libero, magnam nam blanditiis perferendis beatae excepturi quae cupiditate, numquam quisquam, provident facilis! Nisi ea sint quod iusto repellendus est reprehenderit eaque necessitatibus earum soluta alias, explicabo pariatur harum voluptates ipsam quia, neque, itaque non labore et veritatis omnis laboriosam. Amet dolorem optio suscipit ullam accusantium assumenda sed qui vitae ea. Voluptas tempore impedit quas laborum cumque nobis doloribus explicabo odio, quo rem suscipit quae amet magni a vitae quod dolorum facilis atque veritatis possimus porro debitis maxime libero pariatur! Incidunt perferendis sint perspiciatis maxime distinctio commodi modi, sunt veniam id.</p>
                            </Col>
                        </Row>
                    </div></Col>
            </Row>

        </Container>
    </>);
}

export default AboutUs;