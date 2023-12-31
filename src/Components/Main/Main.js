import React, { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Main = () => {
  const [listData, setListData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [inputVal, setInputVal] = useState("");
  const [backgroundColorCode, setColorCode] = useState("#000000");
  const [textColorCode, setTextColorCode] = useState("#ffffff");

  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "2000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  const addToData = () => {
    if (inputVal.trim() === "") {
      toastr.warning("Please Provide Value")
      setInputVal("");
      return;
    }
    let newData = [
      ...listData,
      {
        itemName: inputVal,
        id: Date.now(),
        checked: false,
        backgroundColor: backgroundColorCode,
        textColor: textColorCode,
      },
    ];
    toastr.success("Item Added to the List");
    localStorage.setItem("data", JSON.stringify(newData));
    setListData(newData);
    setInputVal("");
  };

  const hadleCheck = (id) => {
    let newData = listData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      } else {
        return item;
      }
    });
    toastr.info("List Updated")
    localStorage.setItem("data", JSON.stringify(newData));
    setListData(newData);
  };

  const removeList = (id) => {
    toastr.success("Item Deleted")
    let newData = listData.filter((item) => item.id !== id);
    localStorage.setItem("data", JSON.stringify(newData));
    setListData(newData);
  };

  return (
    <main>
      <h1>Grocery Bud</h1>
      <div className="list-input">
        <div className="text-input">
          <input
            type="text"
            placeholder="Enter Item"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button onClick={addToData}>
            Add Item
          </button>
        </div>
        <div className="color-input">
          <label htmlFor="background">Background Color: </label>
          <input
            type="color"
            id="background"
            value={backgroundColorCode}
            onChange={(e) => setColorCode(e.target.value)}
          />
        </div>
        <div className="color-input">
        <label htmlFor="text">Text Color: </label>
        <input
            type="color"
            id="text"
            value={textColorCode}
            onChange={(e) => setTextColorCode(e.target.value)}/>
          
          
        </div>
      </div>
      <div className="list-container">
        {listData.map((item, index) => {
          return (
            <div
              className="list"
              style={{ backgroundColor: item.backgroundColor }}
              key={item.id}
            >
              <input
                  style={{ accentColor: item.textColor }}
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => hadleCheck(item.id)}
                />
              <span
                style={{
                  color: item.textColor,
                  textDecoration: item.checked
                    ? `line-through ${item.backgroundColor} solid 2px`
                    : "none",
                }}
              >
                {item.itemName}
              </span>
              <div className="btn-container">
                
                <button onClick={() => removeList(item.id)}>
                  <i
                    style={{ color: item.textColor }}
                    class="bx bxs-trash-alt"
                  ></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Main;
