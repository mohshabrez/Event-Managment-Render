import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { validateEventInput, validateRoleInput, volunteerRoles } from "../utils/eventUtils";
import { addEventAsync, updateEventAsync } from "../redux toolkit/eventSlice";

export const EventForm = () => {
    const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [roleRequirements, setRoleRequirements] = useState({
    role: "",
    requiredVolunteers: 0
  });

 
  const event = state ? state : null;

  
  const [eventInput, setEventInput] = useState({
    name: event ? event.name : "",
    date: event
      ? `${new Date(event.date).getFullYear()}-${
          new Date(event.date).getMonth() + 1
        }-${String(new Date(event.date).getDate()).padStart(2, "0")}`
      : "",
    location: event ? event.location : "",
    description: event ? event.description : "",
    volunteerRoleRequirements: event ? event.volunteerRoleRequirements : []
  });

  
  const handleAddRole = (e) => {
    e.preventDefault();

    const isRoleValidate = validateRoleInput(roleRequirements);

    
    if (isRoleValidate) {
      setError("");

      eventInput.volunteerRoleRequirements = [
        ...eventInput.volunteerRoleRequirements,
        roleRequirements
      ];

      
      setRoleRequirements({
        role: "",
        requiredVolunteers: 0
      });
    } else {
      setError("Please select the role and required number of volunteers");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidated = validateEventInput(eventInput);

    if (isValidated) {
      setError("");

      if (event) {
        dispatch(updateEventAsync({ id: event._id, updatedEvent: eventInput }));
        navigate(`/events/${event._id}`);
      } else {
        dispatch(addEventAsync(eventInput));
        navigate("/");
      }
    } else {
      setError("Please fill all the required fields");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-20">
    <div className="flex flex-col flex-wrap justify-between rounded-md  max-w-max gap-2 px-5 py-5 text-center bg-slate-700 text-white  place-items-center">
      <h2>{event ? "Edit Event" : "Add Event"}</h2>

      <form className="flex flex-col gap-5 py-2">
        <label className="flex justify-between px-2">
          Name:
          <input
            className="bg-gray-800 rounded-md"
            placeholder="Enter Name"
            type="text"
            value={eventInput.name}
            onChange={(e) =>
              setEventInput({ ...eventInput, name: e.target.value })
            }
            required
          />
        </label>

        <label className="flex justify-between px-2">
          Date:
          <input
            className="bg-gray-800 rounded-md"
            onChange={(e) =>
              setEventInput({
                ...eventInput,
                date: e.target.value
              })
            }
            value={eventInput.date}
            type="date"
          />
        </label>

        <label className="flex justify-between px-2">
          Location:
          <input
            className="bg-gray-800 rounded-md"
            placeholder="Enter Location"
            type="text"
            value={eventInput.location}
            onChange={(e) =>
              setEventInput({ ...eventInput, location: e.target.value })
            }
            required
          />
        </label>

        <label className="flex justify-between px-2">
          Description:
          <input
            className="bg-gray-800 rounded-md"
            placeholder="Enter Description"
            type="text"
            value={eventInput.description}
            onChange={(e) =>
              setEventInput({ ...eventInput, description: e.target.value })
            }
            required
          />
        </label>

        <label className="flex justify-between px-2">
          Role:
          <select
            className="bg-gray-800"
            onChange={(e) =>
              setRoleRequirements({
                ...roleRequirements,
                role: e.target.value
              })
            }
            value={roleRequirements.role}
          >
            {volunteerRoles?.map((role) => {
              return <option key={role}>{role}</option>;
            })}
          </select>
        </label>

        <label className="flex justify-between px-2">
          Required Volunteers:
          <input
            className="bg-gray-800 rounded-md"
            placeholder="Enter required volunteers"
            type="number"
            min={0}
            value={roleRequirements.requiredVolunteers}
            onChange={(e) =>
              setRoleRequirements({
                ...roleRequirements,
                requiredVolunteers: e.target.value
              })
            }
            required
          />
        </label>

        <button className="bg-gray-800 rounded-md w-fit-content px-2 py-0.5 font-semibold" onClick={handleAddRole}>
          Add role
        </button>

        <div className="flex gap-4">
          <p>All roles:</p>
          <ol>
            {eventInput?.volunteerRoleRequirements?.map((role) => {
              return (
                <li key={role.role}>
                  {role.role}: {role.requiredVolunteers}
                </li>
              );
            })}
          </ol>
        </div>

        {error && <small className="text-red-800">{error}</small>}

        <button className="bg-gray-800 rounded-md w-fit-content px-2 py-0.5 font-semibold" onClick={handleSubmit}>
          {event ? "Update" : "Add"}
        </button>
      </form>
    </div>
    </div>
  );
}