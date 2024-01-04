import { useEffect, useState } from "react";
import send from "../assets/send-message.png";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase.config";

const Chat = (props) => {
  const room = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage == "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });

    setNewMessage("");
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden"
      >
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex w-full mt-2 space-x-3 max-w-xs"
            >
              <div className="flex-shrink-0 h-fit w-fit p-2 rounded-full bg-[#d1d5db] text-black font-bold">
                {message.user}{" "}
              </div>
              <div>
                <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                  <p>{message.text} </p>
                </div>
                <span className="text-xs text-gray-500 leading-none">
                  {/* {message.createdAt} */}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-300 p-4 flex items-center">
          <input
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            className="flex items-center h-10 w-full rounded px-3 text-sm outline-none"
            type="text"
            placeholder="Type your message…"
          />
          <button
            type="submit"
            className="flex items-center duration-300 hover:bg-gray-600 rounded-full p-2 ml-2 font-bold"
          >
            <img style={{ width: "30px" }} src={send} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
