export default function DiagnosticsList({ patientRecord }) {
  return (
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
          {patientRecord?.diagnostic_list?.map((dx_list, index) => (
            <tr key={index}>
              <td>{dx_list?.name}</td>
              <td>{dx_list?.description}</td>
              <td>{dx_list?.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
