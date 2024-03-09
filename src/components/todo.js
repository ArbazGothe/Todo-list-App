import React, { useState, useEffect } from "react";
import "./style.css";

// getting the localStorage data back to show on UI
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState();
  const [toggleButton, setToggleButton] = useState(false);

  //   add items function in state variable mai...
  const addItem = () => {
    if (!inputData) {
      alert("Please fill the Data");
      //   if inputdata is there and togglebutton is true than:
    } else if (inputData && toggleButton) {
      // if curelem of id is match with isEditItem then return curElem pura and change name property wala inputData...
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          } else {
            return curElem;
          }
        })
      );

      //   after the element get edit we want to clear input field and get back to add icon and empty field

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      // adding new unique identifier or id for using delete functionality
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //   Editing items section of todolist

  const editItem = (index) => {
    const item_todo_edit = items.find((curElem) => {
      return curElem.id === index;
    });

    // to show data in input after user click on edit button
    setInputData(item_todo_edit.name);
    // pass that id we get in  new state variable
    setIsEditItem(index);
    // toggle button from add to edit
    setToggleButton(true);
  };

  //   how to delete items from todolist sections
  //   user ne kis id pe click uski id hum yaha GET karne wale hai
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  //   remove All button functionality
  const removeAll = () => {
    setItems([]);
  };

  //   using locatStorage to GET and SET the data it can saved the data if we reload the page
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add items"
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />

            {/* toggle add button from edit button */}
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* show all items on UI using map */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="REMOVE ALL"
              onClick={removeAll}
            >
              <span>CHECKLIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
