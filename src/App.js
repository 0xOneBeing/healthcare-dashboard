import "./App.css";

import React, { useState, useEffect } from "react";
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

import { Select } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

import userProfilePic from "./assets/images/gp.png";

import respPic from "./assets/images/respiratory rate.svg";
import tempPic from "./assets/images/temperature.svg";
import heartPic from "./assets/images/HeartBPM.svg";

import dobIcon from "./assets/images/BirthIcon.svg";
import phoneIcon from "./assets/images/PhoneIcon.svg";
import femaleIcon from "./assets/images/FemaleIcon.svg";
import insuranceIcon from "./assets/images/InsuranceIcon.svg";
import Header from "./components/Header/Header";
import PatientsList from "./components/PatientsList/PatientsList";
import LabResults from "./components/LabResults/LabResults";
import DiagnosticsList from "./components/DiagnosticsList/DiagnosticsList";
import PatientCard from "./components/PatientCard/PatientCard";
import DiagnosisHistory from "./components/DiagnosisHistory/DiagnosisHistory";

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
  const handleSelectedPx = () => {
    console.log("Selected Patient: ", selectedPx);
  };
  const [selectedPatientRecord, setSelectedPatientRecord] = useState(null);
  // const [selectedLabResult, setSelectedLabResult] = useState("CT Scans");
  const selectedLabResult = "CT Scans";
  const handleSelectedLabResult = () => {
    console.log("Selected lab result: ", selectedLabResult);
  };

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
        <Header />

        <PatientsList
          patientData={pxData}
          selectedPatient={selectedPx}
          onSelectPatient={handleSelectedPx}
        />

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

        <DiagnosisHistory
          selectedPatientRecord={selectedPatientRecord}
          respPic={respPic}
          tempPic={tempPic}
          heartPic={heartPic}
        />

        <PatientCard
          patientRecord={selectedPatientRecord}
          defaultProfilePic={userProfilePic}
          dobIcon={dobIcon}
          femaleIcon={femaleIcon}
          phoneIcon={phoneIcon}
          insuranceIcon={insuranceIcon}
        />

        <DiagnosticsList patientRecord={selectedPatientRecord} />

        <LabResults
          patientRecord={selectedPatientRecord}
          selectedResult={selectedLabResult}
          onSelectResult={handleSelectedLabResult}
        />
      </div>
    </div>
  );
}

export default App;
