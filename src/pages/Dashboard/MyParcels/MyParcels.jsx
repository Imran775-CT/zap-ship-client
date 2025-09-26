import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../hooks/useAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();
    const { data: parcels } = useQuery({
        queryKey: ["my-parcels", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        },
    });
    console.log(parcels);

    return (
        <div>
            <h2>My parcels coming here....{parcels?.length || 0}</h2>
        </div>
    );
};

export default MyParcels;
