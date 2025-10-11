import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const [emailQuery, setEmailQuery] = useState("");

  // 🔍 Search user by email (React Query)
  const {
    data: users = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["searchedUsers", emailQuery],
    enabled: !!emailQuery, // manually trigger by refetch()
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
      return res.data;
    },
  });

  // 🔄 Mutation for changing role
  const { mutateAsync: updateRole, isPending } = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire("Success", data.message, "success");
      queryClient.invalidateQueries(["searchedUsers"]);
    },
    onError: (error) => {
      Swal.fire("Error", error.response?.data?.message || "Failed", "error");
    },
  });

  // 🔎 Handle Search Submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (!emailQuery.trim()) {
      Swal.fire("Warning", "Please enter an email to search", "warning");
      return;
    }
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">👑 Manage Admin Access</h2>

      {/* 🔍 Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search user by email"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary">
          {isFetching ? "Searching..." : "Search"}
        </button>
      </form>

      {/* 🧭 Loading State */}
      {isLoading && <p>Loading users...</p>}

      {/* 📋 User Table */}
      {users.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td className="text-red-600">{user.role || "user"}</td>
                  <td>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        onClick={() =>
                          updateRole({ id: user._id, role: "user" })
                        }
                        className="btn btn-sm btn-error"
                        disabled={isPending}
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          updateRole({ id: user._id, role: "admin" })
                        }
                        className="btn bg-amber-400 btn-sm btn-success"
                        disabled={isPending}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ❌ No Results */}
      {!isLoading && users.length === 0 && emailQuery && (
        <p className="text-center text-gray-500 mt-4">
          No users found for “{emailQuery}”
        </p>
      )}
    </div>
  );
};

export default MakeAdmin;
