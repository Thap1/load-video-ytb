import { useState } from "react";
import "./App.css";

const LoadURLVideo = ({ idYoutube }) => {
  const [nameURL, setNameURL] = useState("");
  const [convertPath, setConvertPath] = useState(
    "https://www.youtube.com/embed/ZSfAw1gnxZw"
  );

  const [checkPath, setCheckPath] = useState(false);
  function handClick() {
    let pathUrl = nameURL;

    let checkUrl =
      pathUrl.includes("https://youtu.be") ||
      pathUrl.includes("http://youtu.be") ||
      pathUrl.includes("https://www.youtube.com/watch?v=") ||
      pathUrl.includes("http://www.youtube.com/watch?v=");

    if (checkUrl && pathUrl) {
      let regex = /()+([^/=&?#%])+(\w+)+\w/g;
      let arrPath = pathUrl.match(regex);

      for (let i = 0; i < arrPath.length; i++) {
        const element = arrPath[i];
        if (element.length === 11) {
          idYoutube = element;
          setConvertPath(`https://www.youtube.com/embed/${idYoutube}`);
          setCheckPath(false);
        } else setCheckPath(true);
      }
    } else setCheckPath(true);
  }

  return (
    <div>
      <div>
        <input
          onChange={(e) => {
            setNameURL(e.target.value);
          }}
          className='style-input'
          type='text'
          placeholder='Please Input Url'
        />
      </div>
      <div>
        {checkPath && <h3>Path False </h3>}
        <button onClick={handClick}>Click{checkPath}</button>
      </div>
      <div>
        <iframe title='Video' width='600' height='345' src={convertPath} />
      </div>
    </div>
  );
};

const ComemntVideo = ({ idYoutube }) => {
  const [textComment, setTextComment] = useState();
  console.log("idYoutube", idYoutube);
  function inputEvent(number) {
    console.log("number:::", typeof number);
    number += 2;
    console.log("Test", number);
    window.localStorage.setItem(`Comment-${number}`, textComment);
  }
  return (
    <input
      className='style-input'
      type='text'
      onChange={(e) => setTextComment(e.target.value)}
      placeholder='Comment'
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          inputEvent(0);
        }
      }}
    />
  );
};
function App() {
  const [idYoutube] = useState();
  return (
    <div className='App'>
      <h2>Load Video Youtube</h2>
      <LoadURLVideo idYoutube={(e) => console.log(e)} />
      <ComemntVideo idYoutube={idYoutube} />
    </div>
  );
}

export default App;
