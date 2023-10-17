import Navbar from "@/components/navbar";
import UserHistoryItem from "@/components/history-item-row";
import apiCall from "@/lib";

const UserHistory = async () => {
  const { history } = await apiCall(`/api/history-users`);

  return (
    <>
      <Navbar />
      <UserHistoryItem histories={history} />
    </>
  );
};

export default UserHistory;
