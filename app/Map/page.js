'use client'

import { useState, useEffect } from "react";
import { HospitalApi } from "../support/url";

export default function Map() {
  const[searchTerm,SetsearchTerm] = useState("A");
  const[hospitalSearched,SethospitalSearched] = useState([]);

  async function fetchHospitals() {
    try {
      const data = await HospitalApi.fetchHospitalsbyname(searchTerm);
      SethospitalSearched(data);
    } catch (error) {
      setError(error);
    }
  }
  useEffect(() => {
    fetchHospitals();
  }, []);


  return (

  <div className="border-4">
    {hospitalSearched.map((hospital) => (
        <div key={hospital._id}>
          <p>Hospital Name: {hospital.Hospital_Name}</p>
          <p>Location: {hospital.Place}</p>
          <p>Total Doctors: {hospital.Total_Doctors}</p>
          <p>Total Beds: {hospital.Total_Beds}</p>
          <p>Cleanliness Score: {hospital.Cleanliness_Score}</p>
          <p>Specialties: {hospital.Specialties_Present}</p>
          <p>Total Specialties: {hospital.Total_Specialties_Present}</p>
          <p>Stars: {hospital.Stars}</p>
          <img src={hospital.Image} alt={hospital.Hospital_Name} />
        </div>
      ))}

      {/* {hospitalSearched.map((hospital) => (
        <div className="border-4">
          {hospital}
          </div>
      ))} */}
  </div>
  );
}
