import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Card, CardHeader, CardBody, Table, Button } from "reactstrap";
import "../Styles/Report.css";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap"
import { Tab, Tabs } from "react-bootstrap";
import Expense from "../Tabs/Time & Expenses";
import "../Styles/Tabs.css";
import emailjs from 'emailjs-com';
import axios from 'axios';
import { PentahoArtifact } from 'react-pentaho-renderer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from "date-fns"

const table = [{
    name: "Billing Worksheet",
    date: "Pending",
    from: "Pending",
    to: "06-00-AM",
    status: "11",
    direction: "Radha",

},
{
    name: "Billing work sheet by billing group",
    date: "Pending",
    from: "Pending",
    to: "06-00-AM",
    status: "11",
    direction: "Radha",
},
{
    name: "Expenses by client - All",
    date: "Pending",
    from: "Pending",
    to: "06-00-AM",
    status: "11",
    direction: "Radha",
},
{
    name: "Expenses by client - Open",
    date: "Pending",
    from: "Pending",
    to: "06-00-AM",
    status: "11",
    direction: "Radha",
},
{
    name: "Expenses by staff - Open",
    date: "Pending",
    from: "Pending",
    to: "06-00-AM",
    status: "11",
    direction: "Radha",
},


]


export default function Report1(props) {


    //const notify = () => toast("!!For the futher details contact this Email:prowesstics@gmail.com ");


    const [showContainers, setShowContainers] = useState({});

    const handleNameClick = (name) => {
        const firstName = name.split(' ')[0].toLowerCase();
        console.log("Name", firstName);
        setShowContainers({ ...showContainers, [firstName]: true });
    };


    const [showContainer1, setShowContainer1] = useState(false);

    const handleButtonClick1 = () => {
        setShowContainer1(showContainer1);
    };


    const [FromDate, setFromDate] = useState(format(new Date("2023-02-01"), 'yyyy-MM-dd'));


    const [ToDate, setToDate] = useState(format(new Date("2023-06-06"), 'yyyy-MM-dd'));


    const handleDownloads = () => {
        axios.post('http://localhost:4000/report1', {
            fromDate: FromDate, // replace with your fromDate variable
            toDate: ToDate,
        }, {
            responseType: 'blob'
        }).then(response => {

            const contentType = response.headers['content-type'];

            if (contentType === 'application/pdf') {
                const file = new Blob([response.data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
                toast('PDf download successfully', {
                    position: toast.POSITION.TOP_RIGHT
                });
                //setResponse("");
                //setError("");
            } else {
                console.log(response.data.message);
                toast('This report have more than 5 pages, so pdf sended in our mail', {
                    position: toast.POSITION.TOP_RIGHT
                });
                //setError("");
            }

            console.log("Response", response);



        }).catch(error => {
            console.error(error);
        });
    }


    return (
        <div style={{ backgroundColor: "#e0e0e0", height: "100vh" }}>

            <Card className="p-2">
                <Row>
                    <Col lg={8}>
                        <h5>Report</h5>
                    </Col>
                    <Col lg={4}>

                        <Row>
                            <Col>
                                <button className="btn1" onClick={handleDownloads}>Run Report</button>
                            </Col>
                            <Col>
                                <button className="btn1" onClick={handleDownloads}>Reset Filters </button>
                            </Col>
                            <Col>
                                <button className="btn1">Email Log</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <ToastContainer />

            <Row>
                <Col lg={7}>
                    <Card className="p-2">
                        <Tabs defaultActiveKey="social3">
                            <Tab eventKey="social1" title="Accounting">

                            </Tab>
                            <Tab eventKey="social2" title="Invoicing">

                            </Tab>
                            <Tab eventKey="social3" title="Time & Expenses">
                                {/* <Expense /> */}
                                <Table className="align-items-center  table-flush" responsive >
                                    <thead className="">
                                        <tr className="" style={{ color: "#7dbf57", backgroundColor: "#344d7f" }}>
                                            <th scope="col">Report Name</th>
                                            <th scope="col">Favorite</th>
                                            <th scope="col">User Report</th>

                                        </tr>
                                    </thead>
                                    {table.map((item, index) => (
                                        <tbody  >
                                            <tr key={index} className="" style={{
                                                color: "var(--text-primary)",
                                                backgroundColor: "#e0e0e0"
                                            }}>
                                                <td onClick={() => handleNameClick(item.name)} >{item.name}</td>
                                                <td scope="row">{item.date}</td>
                                                <td scope="row">{item.from}</td>


                                            </tr>
                                        </tbody>
                                    ))}
                                </Table>

                            </Tab>
                            <Tab eventKey="social4" title="Performance">
                                <Table className="align-items-center  table-flush" responsive >
                                    <thead className="">
                                        <tr className="" style={{ color: "#7dbf57", backgroundColor: "#344d7f" }}>
                                            <th scope="col">Report Name</th>
                                            <th scope="col">Favorite</th>
                                            <th scope="col">User Report</th>

                                        </tr>
                                    </thead>
                                    {table.map((item, index) => (
                                        <tbody  >
                                            <tr onClick={handleButtonClick1} key={index} className="" style={{
                                                color: "var(--text-primary)",
                                                backgroundColor: "#e0e0e0"
                                            }}>
                                                <td >{item.name}</td>
                                                <td scope="row">{item.date}</td>
                                                <td scope="row">{item.from}</td>


                                            </tr>
                                        </tbody>
                                    ))}
                                </Table>

                            </Tab>
                            <Tab eventKey="social5" title="Payroll">

                            </Tab>
                        </Tabs>
                    </Card>
                </Col>
                <Col lg={5}>



                    {showContainers.billing && <Card className="p-2">

                        <Row>
                            <Col>
                                <h6>Report Filters</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3></h3>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <h6>From</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <input type="date" value={FromDate} onChange={e => setFromDate(e.target.value)} placeholder="From" />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <h6>To</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <input type="date" value={ToDate} onChange={e => setToDate(e.target.value)} placeholder="To" />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-2">

                            <Col>
                                <Row>
                                    <Col>
                                        <h6>Clients</h6>
                                    </Col>
                                </Row>

                            </Col>
                            <Col>

                                <Row>
                                    <Col>
                                        <DropdownMultiselect
                                            options={["PTE10060", "PTE10061", "PTE10062", "PTE10063", "PTE10064", "PTE10065"]}
                                            placeholder="Select Clients"
                                            name="countries"
                                            className="custom-dropdown"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <h3></h3>
                            </Col>
                        </Row>
                        <Row className="mt-2">

                            <Col>
                                <Row>
                                    <Col>
                                        <h6>Staffs</h6>
                                    </Col>
                                </Row>

                            </Col>
                            <Col>

                                <Row>
                                    <Col>
                                        <DropdownMultiselect
                                            options={["PTE10060", "PTE10061", "PTE10062", "PTE10063", "PTE10064", "PTE10065"]}
                                            placeholder="Select staffs"
                                            name="countries"
                                            className="custom-dropdown"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <h3></h3>
                            </Col>
                        </Row>
                        <Row className="mt-2">

                            <Col>
                                <Row>
                                    <Col>
                                        <h6>Orginators</h6>
                                    </Col>
                                </Row>

                            </Col>
                            <Col>

                                <Row>
                                    <Col>
                                        <DropdownMultiselect
                                            options={["PTE10060", "PTE10061", "PTE10062", "PTE10063", "PTE10064", "PTE10065"]}
                                            placeholder="Select orginate"
                                            name="countries"
                                            className="custom-dropdown"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <h3></h3>
                            </Col>
                        </Row>
                        <Row className="mt-2">

                            <Col>
                                <Row>
                                    <Col>
                                        <h6>Billing Partner</h6>
                                    </Col>
                                </Row>

                            </Col>
                            <Col>

                                <Row>
                                    <Col>
                                        <DropdownMultiselect
                                            options={["PTE10060", "PTE10061", "PTE10062", "PTE10063", "PTE10064", "PTE10065"]}
                                            placeholder="Select partner"
                                            name="countries"
                                            className="custom-dropdown"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <h3></h3>
                            </Col>
                        </Row>
                        <Row className="mt-2">

                            <Col>
                                <Row>
                                    <Col>
                                        <h6>Client Type</h6>
                                    </Col>
                                </Row>

                            </Col>
                            <Col>

                                <Row>
                                    <Col>
                                        <DropdownMultiselect
                                            options={["PTE10060", "PTE10061", "PTE10062", "PTE10063", "PTE10064", "PTE10065"]}
                                            placeholder="Select client"
                                            name="countries"
                                            className="custom-dropdown"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <h3></h3>
                            </Col>
                        </Row>
                    </Card>
                    }
                    {showContainers.expenses && <div>This is the container for Ajai.</div>}
                </Col>
            </Row>

        </div>
    )
}