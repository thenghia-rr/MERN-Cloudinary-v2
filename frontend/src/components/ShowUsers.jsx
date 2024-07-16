import { getAllUsers } from "../services/uploads";
import { useQuery } from "@tanstack/react-query";

export const ShowUsers = () => {
  const { data: listUsers, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  const handleRefetch = () => {
    refetch();
  }

  return (
    <div>
     <button style={{marginTop: '40px'}} onClick={handleRefetch}>Refresh Users</button>
      {isLoading ? (
        <h2>Loading....</h2>
      ) : (
        listUsers.map((user, index) => (
          <div key={index}>
            <h3>{`${index+1}. ${user?.name}`}</h3>
            <img width='500px' src={user?.avatar} alt={user?.name} />
          </div>
        ))
      )}
    </div>
  );
};
