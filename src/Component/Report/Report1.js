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
    const [Success, setSuccess] = useState('');

    const notify = () => toast("!!For the futher details contact this Email:prowesstics@gmail.com ");

   
    const [reportDesign, setReportDesign] = useState(null);

    const [reportData, setReportData] = useState(null);
    //console.log("Reportdata", reportData);

    const [report, setReport] = useState(null);
    console.log("Reportdata", report);

    //const [report, setReport] = useState(null);

    console.log("Report", reportDesign);

    const [showContainers, setShowContainers] = useState({});
    
    const handleNameClick = (name) => {
        const firstName = name.split(' ')[0].toLowerCase();
        console.log("Name", firstName);
        setShowContainers({ ...showContainers, [firstName]: true });
    };

    //console.log("d", props);
    //const [email, setEmail] = useState("");

    const [csvFile, setCsvFile] = useState(null);


    const [showContainer1, setShowContainer1] = useState(false);

    const handleButtonClick1 = () => {
        setShowContainer1(showContainer1);
    };


    console.log("csv", csvFile);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleFileChange = (event) => {
        setCsvFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("csvFile", csvFile);

        try {
            const response = await fetch("http://localhost:4000/send-csv", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const form = useRef();

    function sendEmail(e) {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

        emailjs.sendForm('service_onckczc', 'template_yiz75j8', e.target, 'PJXXM2Irnlrg_0qJA')
            .then((result) => {
                window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
            }, (error) => {
                console.log(error.text);
            });
    }

    const [email, setEmail] = useState({ to: '', subject: '', text: '', pdf: null });

    console.log("email", email);

    const handleChange = (event) => {
        if (event.target.name === 'pdf') {
            setEmail({ ...email, [event.target.name]: event.target.files[0] });
        } else {
            setEmail({ ...email, [event.target.name]: event.target.value });
        }
    };

    const handleSubmits = (event) => {
        event.preventDefault();

        console.log("email1", email.to);

        const formData = new FormData();
        formData.append('to', email.to);

        console.log("to", formData);

        formData.append('subject', email.subject);
        formData.append('text', email.text);
        formData.append('pdf', email.pdf);

        console.log("FormData", formData);

        fetch('http://localhost:4000/send-email', {
            method: 'POST',
            headers: { 'content-type': 'multipart/form-data' },
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const config = {
        headers: {

            "Access-Control-Allow-Origin": " * ",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true",
            'Accept': 'application/pdf'
        }
    };




    const getReport = () => {
        axios.get('http://localhost:4000/report', {
            responseType: 'arraybuffer'
        }).then(response => {
            setReport(new Blob([response.data], { type: 'application/pdf' }));
        }).catch(error => {
            console.error(error);
        });
    };

    const handleButtonClick = () => {
        window.open('http://localhost:8080/pentaho/api/repos/%3Apublic%3AMango%3AActivity%20Codes_demo.prpt/report?CompanyID=1&&output-target=pageable/pdf', '_blank');
    };

    const handleDownload = () => {
        axios.get('http://localhost:4000/report', {
            responseType: 'blob'
        }).then(response => {
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        }).catch(error => {
            console.error(error);
        });
    }

    // const handleDownloads = () => {
    //     axios.get('http://localhost:4000/reports', {
    //         //responseType: 'blob'
    //     }).then(response => {
    //         // const file = new Blob([response.data], { type: 'application/pdf' });
    //         // const fileURL = URL.createObjectURL(file);
    //         // window.open(fileURL);

    //         console.log("response", response.data);


    //     })

    //         .catch(error => {
    //             console.error(error);
    //         });
    // }

    // const handleDownloads = () => {
    //     fetch('http://localhost:4000/reports', {
    //         method: 'GET',
    //         responseType: 'blob', // or any other type like "json", "text", etc.
    //     })
    //         .then(response => {
    //             console.log("Response",response.data);
    //             if (response.ok) {
    //                 console.log(response);
    //                 console.log(response.type);
    //                 if (response.type === 'blob') {
    //                     response.blob().then(blobData => {
    //                         // Process the binary data
    //                         console.log("Blob",blobData);
    //                     });

    //                     // const file = new Blob([response.data], { type: 'application/pdf' });
    //                     // const fileURL = URL.createObjectURL(file);
    //                     // window.open(fileURL);

    //                 } else {
    //                     // Handle other types of response
    //                     response.json().then(jsonData => {
    //                         // Process the JSON data
    //                         console.log("D", jsonData);
    //                     });
    //                 }
    //             } else {
    //                 throw new Error('Network response was not ok');
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }




    // const handleDownloads = async () => {

    //     try {
    //       const result = await axios.get('http://localhost:4000/reports', { responseType: 'arraybuffer' });
    //       console.log("Response",result );

    //       const contentType = result.headers['content-type'];
    //       console.log("content",contentType);

    //       if (contentType.startsWith('application/pdf')) {
    //         const file = new Blob([result.data], { type: 'application/pdf' });
    //         const fileURL = URL.createObjectURL(file);
    //         window.open(fileURL);

    //       } else {
    //         const data = result .data;
    //         console.log("Sucess",data);
    //       }

    //     } catch (error) {
    //         console.error(error);
    //     }
    //   };


    //   const handleDownloads = async () => {
    //     try {
    //       const response = await axios.get('http://localhost:4000/reports', { responseType: 'arraybuffer' });
    //       console.log("Response",response);
    //       const contentType = response.headers['content-type'];
    //       if (contentType === 'application/pdf') {
    //         const file = new Blob([response.data], { type: 'application/pdf' });
    //         const fileURL = URL.createObjectURL(file);
    //         window.open(fileURL);

    //       } else if (contentType === 'application/octet-stream') {
    //         const data = response.data;
    //         console.log("res",data);
    //         // Handle the buffer response data here
    //       } else {
    //         // Handle other content types here
    //       }
    //     } catch (error) {
    //       // Handle the error here
    //     }
    //   };


    const [FromDate, setFromDate] = useState(format(new Date("2023-02-01"), 'yyyy-MM-dd'));


    const [ToDate, setToDate] = useState(format(new Date("2023-06-06"), 'yyyy-MM-dd'));


    const handleDownloads = async () => {
        try {
            const response = await axios.post('http://localhost:4000/reports',
                {
                    fromDate: FromDate , // replace with your fromDate variable
                    toDate: ToDate,
                }, { responseType: 'arraybuffer' });
            console.log("Response", response);
            const contentType = response.headers['content-type'];
            if (contentType === 'application/pdf') {
                const file = new Blob([response.data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);

            } else if (contentType === 'application/octet-stream') {
                const data = response.data;
                console.log("res", data);
                // Handle the buffer response data here
            } else {
                // Handle other content types here
            }
        } catch (error) {
            // Handle the error here
        }
    };


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
                                <Expense />
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
                                        <input type="date" value={FromDate}  onChange={e => setFromDate(e.target.value)} placeholder="From" />
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


            {/* <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    CSV File:
                    <input type="file" accept=".pdf" onChange={handleFileChange} />
                </label>
                <br />
                <button type="submit">Send Email</button>
            </form> */}

            {/* <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="user_name" />
                <label>Email</label>
                <input type="email" name="user_email" />
                <label>Message</label>
                <textarea name="message" />
                <input type="file" accept=".pdf" />
                <input type="submit" value="Send" />
            </form>

            <form onSubmit={handleSubmits}>
                <label>
                    To:
                    <input type="email" name="to" value={email.to} onChange={handleChange} />
                </label>
                <label>
                    Subject:
                    <input type="text" name="subject" value={email.subject} onChange={handleChange} />
                </label>
                <label>
                    Text:
                    <textarea name="text" value={email.text} onChange={handleChange} />
                </label>
                <label>
                    PDF:
                    <input type="file" name="pdf" accept=".pdf" onChange={handleChange} />
                </label>
                <button type="submit">Send Email</button>
            </form> */}

            {/* <div>
                <div id="report-container"></div>
                <button onClick={handleDownload}>Download PDF</button>
            </div> */}

            {/* <iframe width="100%"
                height="600px"
                src={`http://localhost:8080/pentaho/api/repos/%3Apublic%3AMango%3AActivity%20Codes_demo.prpt/report?CompanyID=1&&output-target=pageable/pdf`} />
 */}


            {/* <div>
                {reportData && (
                    <ul>
                        {reportData.resultset.map((row, index) => (
                            <li key={index}>
                                {row[0]} - {row[1]}
                            </li>
                        ))}
                    </ul>
                )}
            </div> */}


            <div>
                <button onClick={getReport}>Get Report</button>
                {report && <object data={URL.createObjectURL(report)} type="application/pdf" width="100%" height="600px" />}
            </div>
        </div>
    )
}