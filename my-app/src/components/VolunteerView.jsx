import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVolunteers } from "../redux toolkit/volunteerSlice";
import { Link } from "react-router-dom";
import { VolunteerList } from "./VolunteerList";

export const VolunteerView = () => {
    const dispatch = useDispatch();
    const volunteers = useSelector((state) => state.volunteers.volunteers);
    const status = useSelector((state) => state.volunteers.status);
    const error = useSelector((state) => state.volunteers.error);
  
    useEffect(() => {
      if (status === "idle") {
        dispatch(fetchVolunteers());
      }
    }, []);
  
    return (
      <div className="px-4 py-4 flex flex-col gap-2 text-white">
        <h2>Volunteer View</h2>
  
        <Link to={`/volunteers/add`} className="flex flex-col justify-center items-center">
          <button className="px-2 py-2 bg-gray-600 font-semibold rounded-md">Add volunteer</button>
        </Link>
  
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Something went wrong!</p>}
  
        <VolunteerList volunteers={volunteers} />
      </div>
    );
  };
  