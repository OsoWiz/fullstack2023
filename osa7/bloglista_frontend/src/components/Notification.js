import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

const Notification = () => {
  const [notification] = useContext(NotificationContext);

  if (!notification) return null;

  return <div>{notification}</div>;
};

export default Notification;
