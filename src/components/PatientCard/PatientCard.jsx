export default function PatientCard({
  patientRecord,
  defaultProfilePic,
  dobIcon,
  femaleIcon,
  phoneIcon,
  insuranceIcon,
}) {
  return (
    <aside className="patient-card border-rounded App-card">
      <p className="heading d-none">Patient Card</p>
      <div className="patient-card-content">
        <div className="my-3 text-center">
          <img
            src={
              patientRecord?.profile_picture
                ? patientRecord?.profile_picture
                : defaultProfilePic
            }
            alt="Px Card pic"
            width={200}
            className="text-center mb-3 mt-3"
          />
        </div>
        <p className="patient-name heading-2 text-center">
          {patientRecord?.name || "N/A"}
        </p>
        <div className="patient-date_of_birth d-flex align-items-center my-3">
          <img
            className="patient_card_icon me-2"
            src={dobIcon}
            alt="Date of birth"
          />
          <div>
            <p className="m-0">Date of birth</p>
            <p className="m-0 bold">{patientRecord?.date_of_birth || "N/A"}</p>
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
            <p className="m-0 bold">{patientRecord?.gender || "N/A"}</p>
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
            <p className="m-0 bold">{patientRecord?.phone_number || "N/A"}</p>
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
              {patientRecord?.emergency_contact || "N/A"}
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
            <p className="m-0 bold">{patientRecord?.insurance_type || "N/A"}</p>
          </div>
        </div>
        <div className="text-center mt-5">
          <button className="btn-action btn-md bold" type="button">
            Show All Information
          </button>
        </div>
      </div>
    </aside>
  );
}
