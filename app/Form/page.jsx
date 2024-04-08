"use client";
import submitHandler from "../support/postFetch";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

import { ErrorAnimation,LoadingAnimation } from "../components/LoadingAnimations";
import { CiCreditCard1 } from "react-icons/ci";



export default function Form({searchParams}) {
const hospitalName = searchParams.hospital_name;
const h_No = searchParams.H_No;
let todayDate = new Date().toJSON().slice(0, 10);

const [roomCost,setRoomCost] = useState(6100)

const router = useRouter();

const [formData, setFormData] = useState({
  hospitalName: hospitalName,
  hospitalId: h_No,
  roomId:"R1",
  patName:"kekda",
  date:"5/5/2023",
  MOP:"Cash",
  roomType:"General",
  aadhar:"",
  phoneNo:"",
  address: "",
  problem:"",
  description: "",

  // roomId:roomId
});

const handleRoomChange = (e) => {
  const selectedRoomType = e.target.value;
  switch (selectedRoomType) {
    case "General":
      setRoomCost(500);
      //formData.roomId = values[0].Room_ID;
      break;
    case "Double bed Premium":
      setRoomCost(1200);
      //formData.roomId = values[1].Room_ID;
      break;
    case "Single bed Premium":
      setRoomCost(2400);
      //formData.roomId = values[2].Room_ID;
      break;
    default:
      break;
  }
  handleChange(e);
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value
  }));
};
//console.log(formData);

//fetching the rest details to show in the form
async function getRestData(){
  const res = await fetch(`http://localhost:4000/form_details?ID=${h_No}`)
  const result = await res.json()
  console.log(result);
  return result;
  
}

  const [values, setValues] = useState({});
  const [error, setError] = useState(null);

    useEffect(() => {
      async function fetchFromDetails() {
        try {
          const data = await getRestData();
          setValues(data);
          //console.log(values);
        } catch (error) {
          setError(error);
        }
      }
      fetchFromDetails();
    }, []);

  if (error) {
    return <ErrorAnimation errorMessage={error.message} />;
  }

  useEffect(() => {
    console.log(values);
}, [values]);

  if (!values) {
    return <LoadingAnimation />;
  }

  //console.log(values);



 async function submitForm(e){
   e.preventDefault()
  //   const res = await fetch("http://localhost:4000/fetch-data",{
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(formData)
  // })
  //  const result = await res.json()
  // if there is result then this alert will show other wise null
  //alert(result.message)
  alert("Your Bed has been booked");

  router.push('/');
  //return result;
  // We don't want the page to refresh
  // console.log("am here");
  // const res = await fetch("http://localhost:8000/fetch-data")
}



  return (
    <section className="flex justify-center items-center w-screen h-screen  ">
      <div className=" flex justify-start w-1/4 h-screen font-semibold text-4xl p-4">
        {hospitalName}
      </div>
      {/* onSubmit function needs to be called to post the formData */}
      <form method="POST" className="w-3/4 h-80" onSubmit={submitForm}>
      {/* <form method="POST" className="w-full max-w-sm h-80" > */}
        <div className="flex container border rounded-xl flex-wrap -mx-3 mb-4 h-full max-w-xl p-5">
          {/* hospital name */}
          <div className="w-full">
            <input
              type="text"
              id="hosName"
              name="hosName"
              value={hospitalName}
              readOnly
              onChange={handleChange}
              className="appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline mb-2 "
            />
          </div>
          {/* Patient Name */}
          <div className="w-full flex gap-2">
            <input
              type="text"
              id="patName"
              name="patName"
              className="appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline mb-2 "
              placeholder="Patient name"
              onChange={handleChange}
            />
            <input
              type="number"
              id="patNo"
              name="PatNo"
              className="appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline mb-2 "
              placeholder="Phone no"
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              id="patAddress"
              name="patAddress"
              className=" border  rounded-xl w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline mb-2 "
              placeholder="Patient Adress"
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              id="patAadhar"
              name="patAadhar"
              className="appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline mb-2 "
              placeholder="Patient Aadhar"
              onChange={handleChange}
            />
          </div>
          {/* Date */}
          <div className="w-full">
            <input
              type="date"
              id="date"
              name="date"
              min={todayDate}
              className="appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 "
              onChange={handleChange}
            />
          </div>
          {/* Radio 1 Payement */}
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mode of Payment
            </label>
            <div className="flex items-center">
              <CiCreditCard1 />
              <input
                type="radio"
                id="Cash"
                name="MOP"
                value="Cash"
                className="form-radio h-4 w-4 text-blue-500 focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
              <label htmlFor="Cash" className="mx-2">
                Cash
              </label>
              <input
                type="radio"
                id="Card"
                name="MOP"
                value="Card"
                className="form-radio h-4 w-4 text-blue-500 focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
              <label htmlFor="Card" className="mx-2">
                Card
              </label>
              <input
                type="radio"
                id="UPI"
                name="MOP"
                value="UPI"
                className="form-radio h-4 w-4 text-blue-500 focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
              <label htmlFor="male" className="mx-2">
                UPI
              </label>
            </div>
          </div>

          <div className="w-full">
          <>
          <label htmlFor="roomType" className="mr-2">Choose a room:</label>
          <select className="focus:outline-none" id="roomType" name="roomType" onChange={handleRoomChange}>
          <option value="General">General</option>
          <option value="Double bed Premium">Double bed Premium</option>
          <option value="Single bed Premium">Single bed Premium</option>
          </select>
          </>
          <>
          <label htmlFor="roomCost" className="mx-2">Cost:</label>
          <span>{roomCost}</span>
          </>

          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            // onClick={handleFormSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Book now
          </button>
        </div>
      </form>

    </section>
  );
}
