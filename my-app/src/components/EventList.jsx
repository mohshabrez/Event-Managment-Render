import { useNavigate } from "react-router-dom"

export const EventList = ({ events }) => {
    const navigate = useNavigate()
    return(
        <div>
            <div className="w-[100%] overflow-x-scroll text-black">
                <table className="w-[100%]">
                    <thead className="bg-gray-200 border-2 border-gray-300">
                        <tr className="hover: cursor-pointer shadow-sm font-bold">
                            <th className="text-center px-2">Name</th>
                            <th className="text-center px-2">Date</th>
                            <th className="text-center px-2">Location</th>
                            <th className="text-center px-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.data ? events?.data?.map((event) => (
                            <tr key={event?._id} onClick={() => navigate(`/events/${event?._id}`)} className="bg-gray-200 text-center px-2">
                                <td className="hover: cursor-pointer font-bold">{event?.name}</td>
                                <td className="hover: cursor-pointer font-bold">{event?.date}</td>
                                <td className="hover: cursor-pointer font-bold">{event?.location}</td>
                                <td className="hover: cursor-pointer font-bold">{event?.description}</td>
                            </tr>
                        )):  events?.map((event) => (
                            <tr key={event?._id} onClick={() => navigate(`/events/${event?._id}`)} className="bg-gray-200 text-center px-2">
                                <td className="hover: cursor-pointer font-bold">{event?.name}</td>
                                <td className="hover: cursor-pointer font-bold">{event?.date}</td>
                                <td className="hover: cursor-pointer font-bold">{event?.location}</td>
                                <td className="hover: cursor-pointer font-bold">{event?.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}