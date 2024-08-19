import { EllipsisOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function PatientsList({
  patientData,
  selectedPatient,
  onSelectPatient,
}) {
  return (
    <aside className="patients border-rounded App-card">
      <p className="heading">Patients</p>
      <div className="patients-list mb-3">
        <ul className="list-unstyled">
          {patientData?.map((patient, index) => (
            <li
              key={index}
              className={
                patient?.name === selectedPatient
                  ? `selected-patient p-3 mb-2`
                  : `p-3 mb-2`
              }
              onClick={() => onSelectPatient(patient?.name)}
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
  );
}
