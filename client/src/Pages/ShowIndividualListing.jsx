import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function ShowIndividualListing() {
   const { id } = useParams();

   const fetchListing = async (id) => {
      await axios
         .get(`http://localhost:4000/api/v1/listing/listing/${id}`, {
            withCredentials: true,
         })
         .then((data) => console.log(data.data))
         .catch((err) => console.log(err));
   };
   useEffect(() => {
      fetchListing(id);
   });
   return <div className="text-black">Hello</div>;
}

export default ShowIndividualListing;
