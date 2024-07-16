import { deleteUser, getAllUsers } from "../services/users";
import { useMutation, useQuery } from "@tanstack/react-query";

export const ShowUsers = () => {
  // Get all user
  const {
    data: listUsers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  //  Mutate delete user
  const { mutate: mutateDeleteUser } = useMutation({
    mutationFn: ({ userId }) => deleteUser({ userId }),
    onSuccess: (data) => {
      console.log(data)
      alert(`User ${data?.data?.name} deleted successfully"`);
      refetch();
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const handleRefetch = () => {
    refetch();
  };

  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure you want to delete")) {
      mutateDeleteUser({ userId });
    }
  };

  return (
    <div>
      <button style={{ marginTop: "40px" }} onClick={handleRefetch}>
        Refresh Users
      </button>
      {isLoading ? (
        <h2>Loading....</h2>
      ) : (
        listUsers.map((user, index) => (
          <div key={index}>
            <h3>{`${index + 1}. ${user?.name}`}</h3>
            <img width="500px" src={user?.avatar} alt={user?.name} /> <br />
            <button type="submit" onClick={() => handleDeleteUser(user._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};
