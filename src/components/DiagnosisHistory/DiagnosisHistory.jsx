import { Select } from "antd";
import CaretAndLevels from "../../utilities/CaretAndLevels/CaretAndLevels";
import { useState } from "react";

export default function DiagnosisHistory({
  selectedPatientRecord,
  respPic,
  tempPic,
  heartPic,
}) {
  const [
    defaultSelectValue,
    // setDefaultSelectValue
  ] = useState("Last 6 months");

  return (
    <section className="diagnosis-history border-rounded App-card">
      <p className="heading mb-4">Diagnosis History</p>
      <div className="blood-pressure p-3">
        <div className="row">
          <div className="col-9">
            <div className="d-flex align-items-center justify-content-between">
              <p className="sub-heading m-0">Blood Pressure</p>
              <Select defaultValue={defaultSelectValue} />
            </div>
            <div>{/* <Line data={lineChartData} options={options} /> */}</div>
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
            {CaretAndLevels(
              selectedPatientRecord?.diagnosis_history[0]?.blood_pressure
                ?.systolic?.levels || ""
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
            {CaretAndLevels(
              selectedPatientRecord?.diagnosis_history[0]?.blood_pressure
                ?.diastolic?.levels || ""
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
          {CaretAndLevels(
            selectedPatientRecord?.diagnosis_history[0]?.respiratory_rate
              ?.levels || ""
          )}
        </div>
        <div className="temp px-3 py-2">
          <img className="mt-2" src={tempPic} alt="Temperature pic" />
          <p className="m-0 mt-3">Temperature</p>
          <p className="bold diagHx-2-value">
            {selectedPatientRecord?.diagnosis_history[0]?.temperature?.value ||
              0}{" "}
            °F
          </p>
          {CaretAndLevels(
            selectedPatientRecord?.diagnosis_history[0]?.temperature?.levels ||
              ""
          )}
        </div>
        <div className="heart-rate px-3 py-2">
          <img className="mt-2" src={heartPic} alt="Heart rate pic" />
          <p className="m-0 mt-3">Heart rate</p>
          <p className="bold diagHx-2-value">
            {selectedPatientRecord?.diagnosis_history[0]?.heart_rate?.value ||
              0}{" "}
            bpm
          </p>
          {CaretAndLevels(
            selectedPatientRecord?.diagnosis_history[0]?.heart_rate?.levels ||
              ""
          )}
        </div>
      </div>
    </section>
  );
}
