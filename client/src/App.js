import { io } from "socket.io-client";

const URL = "localhost:8000";
const socket = io(URL, {
    path: "/socket.io",
    reconnection: false,
});

function App() {
    console.log("socket", socket);
  return (
    <div className="">React App</div>
  );
}

export default App;
