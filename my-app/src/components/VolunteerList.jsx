import { useNavigate } from "react-router-dom"

export const VolunteerList = ({ volunteers }) => {
    const navigate = useNavigate()
    return(
        <div>
            <div className="w-[100%] overflow-x-scroll text-black">
                <table className="w-[100%]">
                    <thead className="bg-gray-200 border-2 border-gray-300">
                        <tr className="hover: cursor-pointer shadow-sm font-bold">
                            <th className="text-center px-2">Name</th>
                            <th className="text-center px-2">Contact</th>
                            <th className="text-center px-2">Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {volunteers.data ? volunteers?.data?.map((volunteer) => (
                            <tr key={volunteer?._id} onClick={() => navigate(`/volunteers/${volunteer?._id}`)} className="bg-gray-200 text-center px-2">
                                <td className="hover: cursor-pointer font-bold">{volunteer?.name}</td>
                                <td className="hover: cursor-pointer font-bold">{volunteer?.contact}</td>
                                <td className="hover: cursor-pointer font-bold"> {volunteer.availability === "true"
                    ? "Available"
                    : "Not available"}</td>
                            </tr>
                        )):  volunteers?.map((volunteer) => (
                            <tr key={volunteer?._id} onClick={() => navigate(`/volunteers/${volunteer?._id}`)} className="bg-gray-200 text-center px-2">
                                <td className="hover: cursor-pointer font-bold">{volunteer?.name}</td>
                                <td className="hover: cursor-pointer font-bold">{volunteer?.contact}</td>
                                <td className="hover: cursor-pointer font-bold"> {volunteer.availability === "true"
                    ? "Available"
                    : "Not available"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}