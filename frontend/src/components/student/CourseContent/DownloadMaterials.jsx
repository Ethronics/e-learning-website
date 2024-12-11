import React from "react";

const DownloadMaterials = ({ materials }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Download Materials</h2>
      <ul className="space-y-2">
        {materials.map((material) => (
          <li key={material.id}>
            <a href={material.link} download className="text-blue-600 hover:underline">
              {material.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadMaterials;
