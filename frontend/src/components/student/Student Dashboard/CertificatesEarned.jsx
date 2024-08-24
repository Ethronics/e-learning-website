import React from "react";

const CertificatesEarned = ({ certificates }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Certificates Earned</h2>
      {certificates.map((certificate) => (
        <div key={certificate.id} className="mb-4">
          <h3 className="font-semibold">{certificate.title}</h3>
          <p>Date Earned: {certificate.date}</p>
          <a
            href={certificate.url}
            className="btn btn-primary"
            download
          >
            Download Certificate
          </a>
        </div>
      ))}
    </div>
  );
};

export default CertificatesEarned;
