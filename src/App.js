import "./App.css";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

import { Button, Select } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  MoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import logo from "./assets/images/logo.svg";

import homeIcon from "./assets/images/home.svg";
import groupIcon from "./assets/images/group.svg";
import calendarTodayIcon from "./assets/images/calendar_today.svg";
import chatBubbleIcon from "./assets/images/chat_bubble.svg";
import creditCardIcon from "./assets/images/credit_card.svg";

import userProfilePic from "./assets/images/gp.png";

import respPic from "./assets/images/respiratory rate.svg";
import tempPic from "./assets/images/temperature.svg";
import heartPic from "./assets/images/HeartBPM.svg";

import dobIcon from "./assets/images/BirthIcon.svg";
import phoneIcon from "./assets/images/PhoneIcon.svg";
import femaleIcon from "./assets/images/FemaleIcon.svg";
import insuranceIcon from "./assets/images/InsuranceIcon.svg";

function App() {
  const [pxData, setPxData] = useState([]);

  const [lineChartData, setLineChartData] = useState({
    type: "line",
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Systolic",
        data: [12, 19, 3, 5, 2, 3, 11],
        borderColor: "#C26EB4",
        fill: false,
        tension: 0.5,
        pointBackgroundColor: "#E66FD2",
        pointBorderColor: "#fff",
        pointRadius: 8,
        pointStyle: "circle",
      },
      {
        label: "Diastolic",
        data: [11, 3, 2, 5, 3, 19, 12],
        borderColor: "#7E6CAB",
        fill: false,
        tension: 0.5,
        pointBackgroundColor: "#8C6FE6",
        pointBorderColor: "#fff",
        pointRadius: 8,
        pointStyle: "circle",
      },
    ],
  });

  // const [selectedPx, setSelectedPx] = useState("Jessica Taylor");
  const selectedPx = "Jessica Taylor";
  const [selectedPatientRecord, setSelectedPatientRecord] = useState(null);
  // const [selectedLabResult, setSelectedLabResult] = useState("CT Scans");
  const selectedLabResult = "CT Scans";

  const noRef = null;

  const caretAndLevels = (levels) => {
    if (levels) {
      const firstWord = levels.split(" ")[0];

      if (firstWord === "Normal") {
        return <p>Normal</p>;
      } else if (firstWord === "Higher") {
        return (
          <p>
            <CaretUpOutlined /> {levels}
          </p>
        );
      } else if (firstWord === "Lower") {
        return (
          <p>
            <CaretDownOutlined /> {levels}
          </p>
        );
      }
    } else {
      console.log("The levels property is not available.");
    }
  };

  const fetchPxData = async () => {
    const username = "coalition";
    const password = "skills-test";
    const pxDataURL = `https://fedskillstest.coalitiontechnologies.workers.dev`;

    try {
      const response = await fetch(pxDataURL, {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPxData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchPxData();
  }, []);

  useEffect(() => {
    const patient = pxData.find((px) => px.name === selectedPx);
    setSelectedPatientRecord(patient || null);
  }, [pxData, selectedPatientRecord]);

  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
  );

  useEffect(() => {
    const labels = selectedPatientRecord?.diagnosis_history
      .slice(0, 6)
      .reverse()
      .map((entry) => {
        const month = entry.month.substring(0, 3);
        const year = entry.year;
        return `${month}, ${year}`;
      });

    const systolicData = selectedPatientRecord?.diagnosis_history
      .slice(0, 6)
      .reverse()
      .map((entry) => entry?.blood_pressure?.systolic?.value || 0);

    const diastolicData = selectedPatientRecord?.diagnosis_history
      .slice(0, 6)
      .reverse()
      .map((entry) => entry?.blood_pressure?.diastolic?.value || 0);

    setLineChartData({
      type: "line",
      labels: labels,
      datasets: [
        {
          label: "Systolic",
          data: systolicData,
          borderColor: "#C26EB4",
          fill: false,
          tension: 0.5,
          pointBackgroundColor: "#E66FD2",
          pointBorderColor: "#fff",
          pointRadius: 8,
          pointStyle: "circle",
        },
        {
          label: "Diastolic",
          data: diastolicData,
          borderColor: "#7E6CAB",
          fill: false,
          tension: 0.5,
          pointBackgroundColor: "#8C6FE6",
          pointBorderColor: "#fff",
          pointRadius: 8,
          pointStyle: "circle",
        },
      ],
    });
  }, [selectedPatientRecord?.diagnosis_history]);

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: false,
      },
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="App manrope">
      <Helmet>
        <title>HealthCare Dashboard</title>
      </Helmet>

      <div className="container-fluid App-grid p-3 pb-5 m-0 vh-100">
        <header className="header border-rounded App-card d-flex justify-content-between align-items-center">
          <img src={logo} alt="Logo" />
          <ul className="d-flex p-0 m-0 list-unstyled">
            <li className="py-2 px-3">
              <a href={noRef} className="d-flex align-items-center nav-link">
                <img className="me-2" src={homeIcon} alt="HomeIcon" />
                Overview
              </a>
            </li>
            <li className="py-2 px-3 active-li-link">
              <a href={noRef} className="d-flex align-items-center nav-link">
                <img className="me-2" src={groupIcon} alt="PxIcon" />
                Patients
              </a>
            </li>
            <li className="py-2 px-3">
              <a href={noRef} className="d-flex align-items-center nav-link">
                <img className="me-2" src={calendarTodayIcon} alt="HomeIcon" />
                Schedule
              </a>
            </li>
            <li className="py-2 px-3">
              <a href={noRef} className="d-flex align-items-center nav-link">
                <img className="me-2" src={chatBubbleIcon} alt="HomeIcon" />
                Message
              </a>
            </li>
            <li className="py-2 px-3">
              <a href={noRef} className="d-flex align-items-center nav-link">
                <img className="me-2" src={creditCardIcon} alt="HomeIcon" />
                Transactions
              </a>
            </li>
          </ul>
          <div className="profile d-flex align-items-center">
            <img
              className="me-3"
              width={"44"}
              src={userProfilePic}
              alt="user_profile_pic"
            />
            <div className="me-2">
              <p className="m-0 bold">Dr. Jose Simmons</p>
              <small className="m-0">General Practitioner</small>
            </div>
            <div className="d-flex align-items-center">
              <Button icon={<SettingOutlined />} type="ghost" />
              <Button icon={<MoreOutlined />} type="ghost" />
            </div>
          </div>
        </header>

        <aside className="patients border-rounded App-card">
          <p className="heading">Patients</p>
          <div className="patients-list mb-3">
            <ul className="list-unstyled">
              {pxData?.map((patient, index) => (
                <li
                  key={index}
                  className={
                    patient?.name === selectedPx
                      ? `selected-patient p-3 mb-2`
                      : `p-3 mb-2`
                  }
                >
                  <div className="patient d-flex align-items-center justify-content-between">
                    <div className="d-flex">
                      <img
                        className="me-3"
                        width={"44"}
                        src={patient?.profile_picture}
                        alt="user_profile_pic"
                      />
                      <div className="me-2">
                        <p className="m-0 bold">{patient?.name || "N'A"}</p>
                        <small className="m-0">
                          {patient?.gender || "N/A"},&nbsp;
                          {patient?.age || "N/A"}
                        </small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <Button icon={<EllipsisOutlined />} type="ghost" />
                    </div>
                  </div>
                </li>
              ))}
              {/* <li className="mb-4">
                <div className="patient d-flex align-items-center justify-content-between">
                  <div className="d-flex">
                    <img
                      className="me-3"
                      width={"44"}
                      src={userProfilePic}
                      alt="user_profile_pic"
                    />
                    <div className="me-2">
                      <p className="m-0 bold">Dr. Jose Simmons</p>
                      <small className="m-0">Female, 29</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Button icon={<EllipsisOutlined />} type="ghost" />
                  </div>
                </div>
              </li> */}
            </ul>
          </div>
        </aside>

        <section className="diagnosis-history border-rounded App-card">
          <p className="heading mb-4">Diagnosis History</p>
          <div className="blood-pressure p-3">
            <div className="row">
              <div className="col-9">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="sub-heading m-0">Blood Pressure</p>
                  <Select defaultValue={"Last 6 months"} />
                </div>
                <div>
                  <Line data={lineChartData} options={options} />
                </div>
              </div>
              <div className="col-3">
                <p className="sub-heading-2 m-0 d-flex align-items-center">
                  <span className="systolic-color me-2"></span>
                  <span>Systolic</span>
                </p>
                <p className="heading-2 m-0">
                  {
                    selectedPatientRecord?.diagnosis_history[0]?.blood_pressure
                      ?.systolic?.value
                  }
                </p>
                {caretAndLevels(
                  selectedPatientRecord?.diagnosis_history[0]?.blood_pressure
                    ?.systolic?.levels
                )}
                <hr className="w-80" />
                <p className="sub-heading-2 m-0 d-flex align-items-center">
                  <span className="diastolic-color me-2"></span>
                  <span>Diastolic</span>
                </p>
                <p className="heading-2 m-0">
                  {
                    selectedPatientRecord?.diagnosis_history[0]?.blood_pressure
                      ?.diastolic?.value
                  }
                </p>
                {caretAndLevels(
                  selectedPatientRecord?.diagnosis_history[0]?.blood_pressure
                    ?.diastolic?.levels
                )}
              </div>
            </div>
          </div>
          <div className="diagHx-2 mt-3 ">
            <div className="resp-rate px-3 py-2">
              <img className="mt-2" src={respPic} alt="Respiratory pic" />
              <p className="m-0 mt-3">Respiratory rate</p>
              <p className="bold diagHx-2-value">
                {selectedPatientRecord?.diagnosis_history[0]?.respiratory_rate
                  ?.value || 0}{" "}
                bpm
              </p>
              {caretAndLevels(
                selectedPatientRecord?.diagnosis_history[0]?.respiratory_rate
                  ?.levels
              )}
            </div>
            <div className="temp px-3 py-2">
              <img className="mt-2" src={tempPic} alt="Temperature pic" />
              <p className="m-0 mt-3">Temperature</p>
              <p className="bold diagHx-2-value">
                {selectedPatientRecord?.diagnosis_history[0]?.temperature
                  ?.value || 0}{" "}
                °F
              </p>
              {caretAndLevels(
                selectedPatientRecord?.diagnosis_history[0]?.temperature?.levels
              )}
            </div>
            <div className="heart-rate px-3 py-2">
              <img className="mt-2" src={heartPic} alt="Heart rate pic" />
              <p className="m-0 mt-3">Heart rate</p>
              <p className="bold diagHx-2-value">
                {selectedPatientRecord?.diagnosis_history[0]?.heart_rate
                  ?.value || 0}{" "}
                bpm
              </p>
              {caretAndLevels(
                selectedPatientRecord?.diagnosis_history[0]?.heart_rate?.levels
              )}
            </div>
          </div>
        </section>

        <aside className="patient-card border-rounded App-card">
          <p className="heading d-none">Patient Card</p>
          <div className="patient-card-content">
            <div className="my-3 text-center">
              <img
                src={
                  selectedPatientRecord?.profile_picture
                    ? selectedPatientRecord?.profile_picture
                    : userProfilePic
                }
                alt="Px Card pic"
                width={200}
                className="text-center mb-3 mt-3"
              />
            </div>
            <p className="patient-name heading-2 text-center">
              {selectedPatientRecord?.name || "N/A"}
            </p>
            <div className="patient-date_of_birth d-flex align-items-center my-3">
              <img
                className="patient_card_icon me-2"
                src={dobIcon}
                alt="Date of birth"
              />
              <div>
                <p className="m-0">Date of birth</p>
                <p className="m-0 bold">
                  {selectedPatientRecord?.date_of_birth || "N/A"}
                </p>
              </div>
            </div>
            <div className="patient-gender d-flex align-items-center my-3">
              <img
                className="patient_card_icon me-2"
                src={femaleIcon}
                alt="Gender"
              />
              <div>
                <p className="m-0">Gender</p>
                <p className="m-0 bold">
                  {selectedPatientRecord?.gender || "N/A"}
                </p>
              </div>
            </div>
            <div className="patient-contact-info d-flex align-items-center my-3">
              <img
                className="patient_card_icon me-2"
                src={phoneIcon}
                alt="Contact Info"
              />
              <div>
                <p className="m-0">Contact Info.</p>
                <p className="m-0 bold">
                  {selectedPatientRecord?.phone_number || "N/A"}
                </p>
              </div>
            </div>
            <div className="patient-emergency-contact d-flex align-items-center my-3">
              <img
                className="patient_card_icon me-2"
                src={phoneIcon}
                alt="Emergency Contacts"
              />
              <div>
                <p className="m-0">Emergency Contacts</p>
                <p className="m-0 bold">
                  {selectedPatientRecord?.emergency_contact || "N/A"}
                </p>
              </div>
            </div>
            <div className="patient-insurance d-flex align-items-center my-3">
              <img
                className="patient_card_icon me-2"
                src={insuranceIcon}
                alt="Insurance Provider"
              />
              <div>
                <p className="m-0">Insurance Provider</p>
                <p className="m-0 bold">
                  {selectedPatientRecord?.insurance_type || "N/A"}
                </p>
              </div>
            </div>
            <div className="text-center mt-5">
              <button className="btn-action btn-md bold" type="button">
                Show All Information
              </button>
            </div>
          </div>
        </aside>

        <section className="diagnostics-list border-rounded App-card">
          <p className="heading">Diagnostics List</p>
          <table className="table table-borderless p-3">
            <thead className="table-light">
              <tr>
                <th scope="col">Problem/Diagnosis</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {selectedPatientRecord?.diagnostic_list?.map((dx_list, index) => (
                <tr key={index}>
                  <td>{dx_list?.name}</td>
                  <td>{dx_list?.description}</td>
                  <td>{dx_list?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="lab-results border-rounded App-card">
          <p className="heading">Lab Results</p>
          <div className="patients-list mb-3">
            <ul className="list-unstyled">
              {selectedPatientRecord?.lab_results?.map((result, index) => (
                <li
                  className={
                    result === selectedLabResult
                      ? `selected-lab_result p-2`
                      : "p-2"
                  }
                  key={index}
                >
                  <div className="patient d-flex align-items-center justify-content-between">
                    <p className="m-0">{result}</p>
                    <Button icon={<DownloadOutlined />} type="ghost" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
