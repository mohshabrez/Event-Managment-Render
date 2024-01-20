import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchEvents } from "../redux toolkit/eventSlice";
import { validateVolunteerInput } from "../utils/VolunteerUtils";
import { addVolunteerAsync, updateVolunteerAsync } from "../redux toolkit/volunteerSlice";

export const VolunteerForm = () => {
    const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const events = useSelector((state) => state.events.events);

  const volunteer = state ? state : null;

  const [volunteerInput, setVolunteerInput] = useState({
    name: volunteer ? volunteer.name : "",
    contact: volunteer ? volunteer.contact : 0,
    availability: volunteer ? volunteer.availability : false,
    skills: volunteer ? volunteer.skills : [],
    areasOfInterest: volunteer ? volunteer.areasOfInterest : [],
    assignedEvents: volunteer
      ? [volunteer.assignedEvents[0]?._id]
      : events.length > 0
      ? [events[0]._id]
      : []
  });

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidated = validateVolunteerInput(volunteerInput);

    if (isValidated) {
      setError("");

      if (volunteer) {
        dispatch(
          updateVolunteerAsync({
            id: volunteer._id,
            updatedVolunteer: volunteerInput
          })
        );
        navigate(`/volunteers/${volunteer._id}`);
      } else {
        dispatch(addVolunteerAsync(volunteerInput));
        navigate("/volunteers");
      }
    } else {
      setError("Please fill all the required fields");
    }
  };

  
  return (
    <div className="flex flex-col justify-center items-center py-20">
    <div className="flex flex-col flex-wrap justify-between rounded-md  max-w-max gap-2 px-5 py-5 text-center bg-slate-700 text-white  place-items-center">
      <h2>{volunteer ? "Edit Volunteer" : "Add Volunteer"}</h2>

      <form className="flex flex-col gap-5 py-2">
        <label className="flex justify-between px-2">
          Name:
          <input
            className="bg-gray-800 rounded-md"
            placeholder="Enter Name"
            type="text"
            value={volunteerInput.name}
            onChange={(e) =>
              setVolunteerInput({ ...volunteerInput, name: e.target.value })
            }
            required
          />
        </label>


        <label className="flex justify-between px-2">
          Contact:
          <input
            className="bg-gray-800 rounded-md"
            placeholder="Enter Contact"
            type="number"
            value={volunteerInput.contact}
            onChange={(e) =>
              setVolunteerInput({ ...volunteerInput, contact: e.target.value })
            }
            required
          />
        </label>

        <label className="flex justify-between px-2">
          Availability:
          <input
            className="bg-gray-800 rounded-md"
            placeholder="Enter Description"
            type="text"
            checked={
                volunteerInput.availability === "true" ||
                volunteerInput.availability === true
                  ? true
                  : false
              }
              value={volunteerInput.availability}
              onChange={(e) =>
                setVolunteerInput({
                  ...volunteerInput,
                  availability: !volunteerInput.availability
                })
              }
            required
          />
        </label>

        <label className="flex justify-between px-2">
        Skills: (seperated by comma)
          <input
            className="bg-gray-800 rounded-md"
            placeholder="Enter Skills"
            type="text"
            value={volunteerInput.skills.join(",")}
            onChange={(e) =>
              setVolunteerInput({
                ...volunteerInput,
                skills: e.target.value.split(",")
              })
            }
            required
          />
        </label>

        <label className="flex justify-between px-2">
          Areas of Interest: (seperated by comma)
          <input
            className="bg-gray-800 rounded-md"
            placeholder="Enter Interests"
            type="text"
            value={volunteerInput.areasOfInterest.join(",")}
            onChange={(e) =>
              setVolunteerInput({
                ...volunteerInput,
                areasOfInterest: e.target.value.split(",")
              })
            }
            required
          />
        </label>

        <label className="flex justify-between px-2">
          Assign Event:
          {events.length === 0 && <p className="error">* No event available</p>}
          {events.length > 0 && (
            <select
            className="bg-gray-800 rounded-md"
              onChange={(e) => {
                setVolunteerInput({
                  ...volunteerInput,
                  assignedEvents: [e.target.value]
                });
              }}
              value={volunteerInput.assignedEvents[0] || ""}
            >
              {events.map(({ _id, name }) => {
                return (
                  <option value={_id} key={_id}>
                    {name}
                  </option>
                );
              })}
            </select>
          )}
        </label>

        {error && <small className="text-red-800">{error}</small>}

        <button className="bg-gray-800 rounded-md w-fit-content px-2 py-0.5 font-semibold" onClick={handleSubmit}>
          {volunteer ? "Update" : "Add"}
        </button>
      </form>
    </div>
    </div>
  );
}