import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteVolunteerAsync } from "../redux toolkit/volunteerSlice";

export const VolunteerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const volunteer = useSelector((state) =>
    state.volunteers.volunteers.find((volunteer) => volunteer._id === id)
  );
  
  
    if (!volunteer) {
      return <div>Volunteer not found.</div>;
    }
  
  
    const handleDelete = (id) => {
      dispatch(deleteVolunteerAsync(id));

      navigate("/volunteers");
    };
  
    return (
        <div className="flex flex-col flex-wrap bg-gray-700 text-white">
      <div className="flex flex-col justify-center text-center gap-1 px-1 py-1">
        <h2 className="underline py-3">Volunteer Detail</h2>
  
        <div className="w-[100%] overflow-x">
          <table className="w-[100%] border-collapse bg-black-200">
            <tr className="hover: cursor-pointer shadow-sm font-bold">
              <th className="text-center px-2">Name:</th>
              <td className="hover: cursor-pointer font-bold">{volunteer.name}</td>
            </tr>
            <tr className="hover: cursor-pointer shadow-sm font-bold">
              <th className="text-center px-2">Contact:</th>
              <td className="hover: cursor-pointer font-bold">{volunteer.contact}</td>
            </tr>
            <tr className="hover: cursor-pointer shadow-sm font-bold">
              <th className="text-center px-2">Availability:</th>
              <td className="hover: cursor-pointer font-bold">{volunteer.availability === "true"
                ? "Available"
                : "Not available"}</td>
            </tr>
            <tr className="hover: cursor-pointer shadow-sm font-bold">
              <th className="text-center px-2">Skills:</th>
              <td className="hover: cursor-pointer font-bold">
              <ul className="list">
                {volunteer.skills.map((skill) => {
                  return <li key={skill}>{skill}</li>;
                })}
              </ul>
              </td>
            </tr>
            <tr className="hover: cursor-pointer shadow-sm font-bold">
              <th className="text-center px-2">Areas of Interest:</th>
              <td className="hover: cursor-pointer font-bold">
              <ul className="list">
                {volunteer.areasOfInterest.map((interest) => {
                  return <li key={interest}>{interest}</li>;
                })}
              </ul>
              </td>
            </tr>
            <tr className="hover: cursor-pointer shadow-sm font-bold">
              <th className="text-center px-2">Registered Events:</th>
              <td className="hover: cursor-pointer font-bold">
              {volunteer.assignedEvents.length === 0 &&
                "Not registered for any events"}
              <ul className="list">
                {volunteer.assignedEvents.map((event) => {
                  return <li key={event?._id}>{event?.name}</li>;
                })}
              </ul>
              </td>
            </tr>
          </table>
        </div>
  
        <div className="flex justify-center gap-4 mt-4">
          <Link to={`/volunteers/edit/${volunteer._id}`} state={volunteer}>
            <button className="bg-gray-800 rounded-md w-fit-content px-2 py-0.5 font-semibold">Edit Details</button>
          </Link>
          <button
            className="bg-gray-800 rounded-md w-fit-content px-2 py-0.5 font-semibold"
            onClick={() => handleDelete(volunteer._id)}
          >
            Delete
          </button>
        </div>
      </div>
      </div>
    );
  };