import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser); 
      setUserId(user.id);
      setUsername(user.username);
    }
  }, []);

  const shareableLink = `${window.location.origin}/public/home?authorId=${userId}`;

  if (!userId || !username) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {username}</h1>
      <p>Share your blogs: <a href={shareableLink} className="text-blue-500 underline">{shareableLink}</a></p>
    </div>
  );
};
export default ProfilePage;