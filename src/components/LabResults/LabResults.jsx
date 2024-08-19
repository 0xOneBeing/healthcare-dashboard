import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function LabResults({
  patientRecord,
  selectedResult,
  onSelectResult,
}) {
  return (
    <section className="lab-results border-rounded App-card">
      <p className="heading">Lab Results</p>
      <div className="patients-list mb-3">
        <ul className="list-unstyled">
          {patientRecord?.lab_results?.map((result, index) => (
            <li
              key={index}
              className={
                result === selectedResult ? `selected-lab_result p-2` : "p-2"
              }
              onClick={() => onSelectResult(result)}
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
  );
}
