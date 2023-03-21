import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowFiles from "./ShowFiles";

let formData = undefined;

const FileUpload = () => {

  const navigate=useNavigate()
  const [file, setFile] = useState([]);
  const [msg, setMsg] = useState({ msg: "", toShow: false });
  const [imgSrc, setImgSrc] = useState([]);
  const [userName, setUserName] = useState("");
  const [allFiles, setAllFiles] = useState([]);

  const uploadFile = async (e) => {
    e.preventDefault();

    if (!file) return;
    formData.append("userName", userName);

    const res = await fetch("http://localhost:3000/photos/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.msg === "File Uploaded") {
      setAllFiles(data.imageData);
      setMsg({
        msg: "File Uploaded 👍🏻",
        toShow: true,
      });

      setTimeout(() => {
        setMsg({
          msg: "",
          toShow: false,
        });
        setImgSrc([]);
        setFile([]);
      }, 3000);
    } else setMsg(false);
  };

  useEffect(() => {
    formData = new FormData();

    file.length > 0 &&
      file.map((ele, key) => {
        if (ele.size > 5242880) {
          setMsg({
            msg: "File size is greater then 5mb, Try Another ❌",
            toShow: true,
          });
          return;
        }
        const url = URL.createObjectURL(ele);
        setImgSrc((prev) => (prev ? [...prev, url] : [url]));
        formData.append("photo[]", ele);
      });
  }, [file]);
  return (
    <div
      className="
    text-white
    h-full
    flex
    flex-col
    justify-center
    items-center
    gap-10
    p-10
    "
    >
      <form
        className="
      flex
      flex-col
      justify-center
      items-centr
      gap-8
      "
        onSubmit={uploadFile}
      >
        <input
          className="text-black outline-none p-4 rounded-md"
          type="text"
          placeholder="Enter UserName"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          required
        />

      <label
          className="
        border-2
        border-dashed
        border-blue-500
        p-10
        rounded-md
        flex
        justify-center
        items-center
        flex-col
        hover:cursor-pointer
        "
        >
          <span>Click to Select File</span>
          <input
            className="
          hidden
          "
            type="file"
            multiple
            accept="image/*"
            name=""
            id="file"
            onChange={(e) => {
              setFile(Array.from(e.target.files));
            }}
          />

          {file ? (
            <span
              className="
           text-blue-500
           mt-6
           italic
          "
            >
              Selected File: {file.name}
            </span>
          ) : (
            <span
              className="
           text-blue-500
           mt-6
           italic
          "
            >
              No File Selected
            </span>
          )}
        </label>

        <button
          type="submit"
          className="
        customBtn
        flex 
        justify-center
        items-center
        gap-2
        "
        >
          📄 Upload File to Server
        </button>

        {msg.toShow ? (
          <span
            className="
        text-white
        text-center
        "
          >
            {msg.msg}
          </span>
        ) : null}
      </form>

      <div
        className="
      flex
      flex-row
      flex-wrap
      gap-4
      w-9/12
      justify-center
      items-center
      "
      >
        {imgSrc
          ? imgSrc.map((ele, key) => {
              return (
                <img
                  key={key}
                  className="
              max-w-lg
              max-h-64
              "
                  src={ele}
                />
              );
            })
          : null}
      </div>
      <div className="flex gap-6">
        <ShowFiles allFiles={allFiles} />

        <button 
        onClick={()=>navigate("/videoUpload")}
        className="customBtn justify-center" 
        type="button">
          Upload Video
        </button>

      </div>
    </div>
  );
};

export default FileUpload;
