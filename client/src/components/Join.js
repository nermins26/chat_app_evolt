import React from "react";

function Join ({joinChat, username}) {
    return (
        <div id="join" className="mx-auto mt-5 text-center col-12">
          <p>Click below to join the chat</p>
          <button onClick={joinChat} className="btn btn-primary">Join</button><br />
          <p className="p-3 m-2 bg-light">Your username: <span className="font-weight-bold font-italic">{username}</span></p>
        </div>
    )
}

export default Join;