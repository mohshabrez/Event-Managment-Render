import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { fetchEvents } from "../redux toolkit/eventSlice";
import { EventList } from "./EventList";


export const EventView = () => {
    const dispatch = useDispatch()
    const events = useSelector((state) => state.events.events);
    const status = useSelector((state) => state.events.status)
    const error = useSelector((state) => state.events.error)

    useEffect(() => {
        if(status === "idle"){
            dispatch(fetchEvents())
        }
    },[status, dispatch])

    return(
        <div className="px-4 py-4 flex flex-col gap-2 text-white">
            <h1>Event View</h1>
            <Link to={'/events/add'} className="flex flex-col justify-center items-center">
                <button className="px-2 py-2 bg-gray-600 font-semibold rounded-md">Add Event</button>
            </Link>
            {status === "loading" && <p>Loading....</p>}
            {error && <p className="text-red-800">*Error: {error}</p>}

            <EventList events={events}/>
        </div>
    )

}  
