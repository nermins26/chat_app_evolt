import React from "react";
import "../App.css";

function Chat ({handleMessage, message, setMessage}) {
    return (
        <div id="chat" className="mx-auto mt-5 text-center col-12">
          <form onSubmit={handleMessage} className="text-center pt-3"> 
            <div className="row g-3">
                <div className="col-md-8 mb-1">
                    <div className="input-group">
                        <input type="text" value={message} placeholder="Your message" className="form-control"
                        onChange={e => setMessage(e.target.value)}/>
                        <div className="input-group-append">
                            <button className="btn btn-secondary" type="submit">Send</button>
                        </div>
                    </div>
                </div>
            </div>
          </form>
        </div>
    )
}

export default Chat;