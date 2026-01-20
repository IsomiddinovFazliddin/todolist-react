import { IoMoonOutline, IoSearch } from "react-icons/io5";
import "./App.css";
import { FiMoon, FiPlus } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";

function App() {
  const [modal, setModal] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleCheck = (id) => {
    setData(
      data.map((item) =>
        item.id == id ? { ...item, isDone: !item.isDone } : item,
      ),
    );
  };

  const [data, setData] = useState([
    {
      id: 1,
      title: "Ertalab voxli turish",
      isDone: false,
    },
    {
      id: 2,
      title: "Dars qilish",
      isDone: true,
    },
  ]);
  const [inputTitle, setInputTitle] = useState();
  const [modalInput, setModalInput] = useState();

  const [search, setSearch] = useState();

  const del = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className={dark ? "App dark" : "App"}>
      {modal ? (
        <div className="modal">
          <div className="modal-wrap">
            <h3>New Note</h3>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();

                if (!modalInput || modalInput.trim() === "") return;
                const obj = {
                  id: Math.floor(Math.random() * 9999),
                  title: modalInput,
                  isDone: false,
                };
                if (modalInput.trim().length !== 0) {
                  setData([...data, obj]);
                }
                setModalInput("");
                setModal(!modal);
              }}
            >
              <input
                value={modalInput}
                type="text"
                placeholder="Input your note..."
                onInput={(e) => {
                  setModalInput(e.target.value);
                }}
              />
            </form>
            <div className="btns">
              <button
                className="censel"
                onClick={() => {
                  setModal(!modal);
                  setModalInput("");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="apply"
                onClick={() => {
                  const obj = {
                    id: Math.floor(Math.random() * 9999),
                    title: modalInput,
                    isDone: false,
                  };

                  if (modalInput.trim().length !== 0) {
                    setData([...data, obj]);
                    setModal(!modal);
                  }
                  setModalInput("");
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="container">
        <h1>TODO LIST</h1>
        <div className="formBtns">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();

              const filterData = data.filter((item) => {
                item.title.toLowerCase().includes(search.toLowerCase());
              });
            }}
          >
            <input
              value={inputTitle}
              type="text"
              placeholder="Search note..."
              onInput={(e) => {
                setSearch(e.target.value);
              }}
            />
            <IoSearch />
          </form>
          <select name="" id="">
            <option value="">all</option>
            <option value="">Complete</option>
            <option value="">Incomplete</option>
          </select>
          <button
            onClick={() => {
              setDark(!dark);
            }}
          >
            {dark ? <MdOutlineWbSunny /> : <FiMoon />}
          </button>
        </div>
        <ol>
          {data.map((item) => {
            return (
              <div className="row" key={item.id}>
                <div className="box">
                  <input
                    checked={item.isDone}
                    onChange={() => toggleCheck(item.id)}
                    type="checkbox"
                  />
                  <li className={item.isDone ? "done" : ""}>{item.title}</li>
                </div>
                <div className="btns">
                  <GoPencil className="edit" />
                  <RiDeleteBinLine
                    className="del"
                    onClick={() => del(item.id)}
                  />
                </div>
              </div>
            );
          })}
        </ol>
        <button
          className="add"
          onClick={() => {
            setModal(!modal);
          }}
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
}

export default App;
