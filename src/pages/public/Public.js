import React, { useState, useEffect } from "react";
import "./bulletin.css";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
var randomColor = require("randomcolor");

export default function Public() {
// Initialize states
const [item, setItem] = useState("");
const [items, setItems] = useState(
  JSON.parse(localStorage.getItem("items")) || []
);

// Generates a new note on the screen with the string the user typed in input.
const newitem = () => {
  if (item.trim() !== "") {
    const newitem = {
      id: uuidv4(),
      item: item,
      color: randomColor({
        luminosity: "light",
      }),
      defaultPos: { x: 100, y: 0 },
    };
    setItems((items) => [...items, newitem]);
    setItem("");
  } else {
    alert("Introduce tu comentario");
    setItem("");
  }
};

// The user can type something in the input field then press ENTER key or click on the ENTER button 
// to generate a new note on screen.
const keyPress = (event) => {
  var code = event.keyCode || event.which;
  if (code === 13) {
    newitem();
  }
};

useEffect(() => {
  localStorage.setItem("items", JSON.stringify(items));
}, [items]);

const updatePos = (data, index) => {
  let newArr = [...items];
  newArr[index].defaultPos = { x: data.x, y: data.y };
  setItems(newArr);
};

const deleteNote = (id) => {
  setItems(items.filter((item) => item.id !== id));
};

return (
  <div className="Appb">
  {/* <div className="bodyb"> */}
    <div id="new-item">
      <input
        className="inputb"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Escribe tu solicitud"
        onKeyPress={(e) => keyPress(e)}
      />
      <button className="buttonb" onClick={newitem}>ENTER</button>
    </div>
    {items.map((item, index) => {
      return (
        <Draggable
          key={item.id}
          defaultPosition={item.defaultPos}
          onStop={(e, data) => {
            updatePos(data, index);
          }}
        >
          <div style={{ backgroundColor: item.color }} className="boxb">
            {`${item.item}`}
            <button className="buttonb" id="delete" onClick={(e) => deleteNote(item.id)}>
              X
            </button>
          </div>
        </Draggable>
      );
    })}
  {/* </div> */}
  </div>
);
}



