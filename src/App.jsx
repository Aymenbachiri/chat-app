import { useState, useRef } from "react";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase.config";

const cookies = new Cookies();
function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth} />
      </>
    );
  }
  return (
    <>
      <div className="flex items-center w-screen h-full flex-col">
        {room ? (
          <Chat room={room} />
        ) : (
          <div className="flex flex-col mt-11">
            <label className="text-center text-xl mb-5 font-bold">
              Enter Room Name :
            </label>
            <input
              ref={roomInputRef}
              className="w-[200px] h-7 border border-[#3b5998] outline-none rounded-md pl-1 text-xl text-center m-1"
              type="text"
            />
            <button
              onClick={() => setRoom(roomInputRef.current.value)}
              className="text-white bg-[#3b5998] w-[210px] h-10 border-none rounded-lg pl-1 text-xl text-center m-1 cursor-pointer"
            >
              Enter Chat
            </button>
          </div>
        )}
        <button
          onClick={signUserOut}
          className="mt-10 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none"
        >
          Sign Out
        </button>
      </div>
    </>
  );
}

export default App;
