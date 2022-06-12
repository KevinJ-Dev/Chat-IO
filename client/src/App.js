import { useState, useEffect } from "react";
import socket from './socket';

function App() {
    //State
    const [username, setUsername] = useState("");
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() =>{
        socket.on("user joined", (msg) => {
            console.log("user joined message", msg);
        });

        return() => {
            socket.off("user joined")
        };
    },[])
    
    const handleUsername = (e) => {
        e.preventDefault();
        console.log(username);
        socket.emit("username", username);
        setConnected(true);
    };

    const handleMessage = (e) => {
        e.preventDefault();
        socket.emit("message", `${username} - ${message}`)
        setMessage("");
    }

    // console.log("socket", socket);
  return (
    <div className="container text-center">
      <div className="row">
          {connected ?
              (<form onSubmit={handleMessage} className="text-center pt-3">
                  <div className="row g-3">
                      <div className="col-md-8">
                          <input
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              type="text"
                              placeholder="Votre message"
                              className="form-control"
                          />
                      </div>

                      <div className="col-md-4">
                          <button className="btn btn-secondary" type="submit">
                              Envoyer
                          </button>
                      </div>
                  </div>
              </form>
              ) : (
                  <form onSubmit={handleUsername} className="text-center pt-3">
                      <div className="row g-3">
                          <div className="col-md-8">
                              <input
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  type="text"
                                  placeholder="Nom"
                                  className="form-control"
                              />
                          </div>

                          <div className="col-md-4">
                              <button className="btn btn-secondary" type="submit">
                                  Entrer
                              </button>
                          </div>
                      </div>
                  </form>
              )}
      </div>
  </div>
  );
}

export default App;
