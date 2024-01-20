import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteEventAsync } from "../redux toolkit/eventSlice";

export const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const event = useSelector((state) =>
      state.events.events.find((event) => event._id === id)
    );
    const volunteers = useSelector((state) => state.volunteers.volunteers);
  
    
    const registeredVolunteers = volunteers.filter((volunteer) =>
      volunteer.assignedEvents.some((e) => e._id === event._id)
    );
  
    if (!event) {
      return <div>Event not found.</div>;
    }
  
    const date = new Date(event.date);
  
    const handleDelete = (id) => {
      dispatch(deleteEventAsync(id));

      navigate("/");
    };
  
    return (
        <div className="flex flex-col flex-wrap bg-gray-700 text-white">
      <div className="flex flex-col justify-center text-center gap-1 px-1 py-1">
        <h2 className="underline py-3">Event Detail</h2>
  
        <div className="w-[100%] overflow-x">
          <table className="w-[100%] border-collapse bg-black-200">
            <tr className="hover: cursor-pointer shadow-sm font-bold">
              <th className="text-center px-2">Name:</th>
              <td className="hover: cursor-pointer font-bold">{event.name}</td>
            </tr>
            <tr className="hover: cursor-pointer shadow-sm font-bold">
              <th className="text-center px-2">Date:</th>
              <td className="hover: cursor-pointer font-bold">{`${date.getDate()}-${
                date.getMonth() + 1
              }-${date.getFullYear()}`}</td>
            </tr>
            <tr className="hover: cursor-pointer shadow-sm font-bold">
              <th className="text-center px-2">Location:</th>
              <td className="hover: cursor-pointer font-bold">{event.location}</td>
            </tr>
            <tr className="hover: cursor-pointer shadow-sm font-bold">
              <th className="text-center px-2">Description:</th>
              <td className="hover: cursor-pointer font-bold">{event.description}</td>
            </tr>
            <tr className="hover: cursor-pointer shadow-sm font-bold">
              <th className="text-center px-2">Volunteer Role Requirements:</th>
              <td className="hover: cursor-pointer font-bold">
                <ul className="list-none">
                  {event?.volunteerRoleRequirements?.map((requirement) => {
                    return (
                      <li key={requirement.role}>
                        {requirement.role}: {requirement.requiredVolunteers}{" "}
                        volunteers
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
            <tr className="hover: cursor-pointer shadow-sm font-bold">
              <th className="text-center px-2">Registered Volunteers:</th>
              <td className="hover: cursor-pointer font-bold">
                {registeredVolunteers.length === 0 && "No volunteers registered"}
                <ul className="list-none">
                  {registeredVolunteers.map((volunteer) => {
                    return <li key={volunteer?._id}>{volunteer?.name}</li>;
                  })}
                </ul>
              </td>
            </tr>
          </table>
        </div>
  
        <div className="flex justify-center gap-4 mt-4">
          <Link to={`/events/edit/${event._id}`} state={event}>
            <button className="bg-gray-800 rounded-md w-fit-content px-2 py-0.5 font-semibold">Edit Details</button>
          </Link>
          <button
            className="bg-gray-800 rounded-md w-fit-content px-2 py-0.5 font-semibold"
            onClick={() => handleDelete(event._id)}
          >
            Delete
          </button>
        </div>
      </div>
      </div>
    );
  };