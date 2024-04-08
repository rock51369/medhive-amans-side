// // React-Next modules import
// import { HospitalApi } from "../support/url";
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// //the custom modules import
// import { SearchSvgComponent } from "./SvgComponent";
// import { FaLeaf } from "react-icons/fa";

// export default function SearchBar() {
//   let suggestionValues;
//   const [suggestPromptArray, setSuggestPropmptArray] = useState([])
//   const[hospitalSearched,SethospitalSearched] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [search, setSearch] = useState({
//     searchString: 0
//   });


//   // fetching the suggestions
//   async function getRestData(keyword) {
//     const res = await fetch(`http://localhost:8000/suggestions?keyword=${keyword}`)
//     const result = await res.json()
//     return result;
//   }



//   // useEffect(() => {
//   //   fetchHospitals();
//   // }, [searchTerm]);

//   const handleChange = (event) => {
//     //console.log(event.target.value.length)
//     //Setwordcount(event.target.value.length)
//     if(event.target.value.length%3 == 0 && event.target.value.length !== 0)
//     {
//       SetsearchTerm(event.target.value)
//       //setSuggestPropmptArray(hospitalSearched)
      
//     }
//     setShowSuggestions(false)
//   }

//   useEffect( () => {
//     if(searchTerm !== ""){
//       fetchHospitals();
//       //setShowSuggestions(true)
//     }  
//   }, [searchTerm]);

//   useEffect(() => {
//     // Log the updated array here
//     setShowSuggestions(true)
//     console.log(suggestPromptArray);
    
//   }, [suggestPromptArray]);  

//   const clearChange = () => {
//     console.log("hello")
//     //SetsearchTerm("")
//     setSuggestPropmptArray([])
//   }
  
    

//   return (
//     <div className="w-full  h-full ">
//       <div className="flex flex-col top-0 relative">
//         <label htmlFor="simple-search" className="sr-only">
//           Searched
//         </label>
//         < div className="relative w-full">
//           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//             <SearchSvgComponent />
//           </div>
//           <input
//             type="text"
//             id="simple-search"
//             className="bg-white/50 w-full text-black text-sm rounded-lg  block pl-10 p-2 focus:outline-none"
//             placeholder="Search"
//             required
//             onChange={handleChange}
//             onKeyDown={handleEnter}
//             name="searchString"
//             autoComplete="off"
//           />
//         </div>
//         <motion.div className={`${showSuggestions ? 'block' : 'hidden'} `}>
//           <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 2 } }} className="absolute top-[45px] w-full rounded bg-sky-200" >
//             {/* {suggestPromptArray.map((eachPromptElement, index) => {
//               let linkToGo
//               eachPromptElement.Source == "Hospital" ? linkToGo = `/pages/Hospitals/${eachPromptElement.Hospital_Id}` : linkToGo = `/pages/Diseases/${eachPromptElement.Specialty_Id}`
//               return (
//                 <li className="p-3 list-none bg-white w-full px-12 last:rounded-b-3xl hover:bg-zinc-100 text-black"><Link href={linkToGo} key={index} className=" overflow-hidden">{eachPromptElement.Source == "Hospital" ? eachPromptElement.Hospital_Name : eachPromptElement.Specialty}</Link></li>
//               )
//             })} */}
//             {suggestPromptArray.map((hospital) => {

//               return(
              
//               <li className=" py-1 pl-4 rounded border-zinc-950 hover:border-1 hover:bg-sky-100" key={hospital.HospitalID}  id={hospital.HospitalID} onClick={clearChange}>
//                 <Link href={`/pages/Hospitals/${hospital.HospitalID}`}>
//                 <h1 >{hospital.HospitalName}</h1>
//                 <div className=" flex overflow-hidden text-xs">
//                   <strong>Specialities: </strong>
//                   <ul className=" pl-1 flex w-fit">
//                     {hospital.SpecialitiesName.slice(0, 4).map((specialty, index) => (
//                       <li key={index} className=" w-fit pr-1 ">{specialty}</li>
                      
//                     ))}
//                     {hospital.SpecialitiesName.length > 4 && <li>...</li>}
//                   </ul>
//                 </div>
//                 </Link>
                
//               </li>
              
//             )})}
//           </motion.ul>
//         </motion.div>


//       </div>
//     </div>
//   );
// }


// React-Next modules import
import { HospitalApi } from "../support/url";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

//the custom modules import
import { SearchSvgComponent } from "./SvgComponent";
import { FaLeaf } from "react-icons/fa";

export default function SearchBar() {
  let suggestionValues;
  const [suggestPromptArray, setSuggestPropmptArray] = useState([])
  const[hospitalSearched,SethospitalSearched] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [wordcount,Setwordcount] = useState(0);
  const[searchTerm,SetsearchTerm] = useState("");
  // const [search, setSearch] = useState({
  //   searchString: 0
  // });

  const [search, setSearch] = useState(false);

  async function fetchHospitals() {
    try {
      const data = await HospitalApi.fetchHospitalsbyname(searchTerm);
      setSuggestPropmptArray(data);
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect(() => {
  //   fetchHospitals();
  // }, [searchTerm]);

  const handleChange = (event) => {
    //console.log(event.target.value.length)
    //Setwordcount(event.target.value.length)
    if(event.target.value.length%3 == 0 && event.target.value.length !== 0)
    {
      SetsearchTerm(event.target.value)
      //setSuggestPropmptArray(hospitalSearched)
      
    }
    setShowSuggestions(false)
  }

  useEffect( () => {
    if(searchTerm !== ""){
      fetchHospitals();
      //setShowSuggestions(true)
    }  
  }, [searchTerm]);

  useEffect(() => {
    // Log the updated array here
    setShowSuggestions(true)
    console.log(suggestPromptArray);
    
  }, [suggestPromptArray]);  

  const clearChange = () => {
    console.log("hello")
    //SetsearchTerm("")
    setSuggestPropmptArray([])
  }
  
    

  return (
    <div className="w-full  h-full ">
      <div className="flex flex-col top-0 relative">
        <label htmlFor="simple-search" className="sr-only">
          Searched
        </label>
        < div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchSvgComponent />
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-white/50 w-full text-black text-sm rounded-lg  block pl-10 p-2 focus:outline-none"
            placeholder="Search"
            required
            onChange={handleChange}
            name="searchString"
            autoComplete="off"
          />
        </div>
        <motion.div className={`${showSuggestions ? 'block' : 'hidden'} `}>
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 2 } }} className="absolute top-[45px] w-full rounded bg-sky-200" >
            {/* {suggestPromptArray.map((eachPromptElement, index) => {
              let linkToGo
              eachPromptElement.Source == "Hospital" ? linkToGo = `/pages/Hospitals/${eachPromptElement.Hospital_Id}` : linkToGo = `/pages/Diseases/${eachPromptElement.Specialty_Id}`
              return (
                <li className="p-3 list-none bg-white w-full px-12 last:rounded-b-3xl hover:bg-zinc-100 text-black"><Link href={linkToGo} key={index} className=" overflow-hidden">{eachPromptElement.Source == "Hospital" ? eachPromptElement.Hospital_Name : eachPromptElement.Specialty}</Link></li>
              )
            })} */}
            {suggestPromptArray.map((hospital) => {

              return(
              
              <li className=" py-1 pl-4 rounded border-zinc-950 hover:border-1 hover:bg-sky-100" key={hospital.HospitalID}  id={hospital.HospitalID} onClick={clearChange}>
                <Link href={`/pages/Hospitals/${hospital.HospitalID}`}>
                <h1 >{hospital.HospitalName}</h1>
                <div className=" flex overflow-hidden text-xs">
                  <strong>Specialities: </strong>
                  <ul className=" pl-1 flex w-fit">
                    {hospital.SpecialitiesName.slice(0, 4).map((specialty, index) => (
                      <li key={index} className=" w-fit pr-1 ">{specialty}</li>
                      
                    ))}
                    {hospital.SpecialitiesName.length > 4 && <li>...</li>}
                  </ul>
                </div>
                </Link>
                
              </li>
              
            )})}
          </motion.ul>
        </motion.div>


      </div>
    </div>
  );
}
