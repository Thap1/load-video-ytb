import React, { useEffect, useState } from "react";
import "./style.css";
const LoadYoutube = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [isUrl, setIsUrl] = useState(false);
  const [idVideo, setIdVideo] = useState();
  const [comment, setComment] = useState("");
  const [listComment, setListComment] = useState([]);
  const [convertPath, setConvertPath] = useState();

  useEffect(() => {
    updateComment();
  }, [idVideo, listComment]);

  function updateComment() {
    if (idVideo && listComment.length > 0) {
      localStorage.setItem(`comment-${idVideo}`, JSON.stringify(listComment));
    }
  }

  function loadComment(idPath) {
    if (idPath) {
      let comment = localStorage.getItem(`comment-${idPath}`);
      if (comment) {
        setListComment(JSON.parse(comment));
      } else setListComment([]);
    }
  }

  function handleInput(e) {
    setInputUrl(e.target.value);
  }

  function handleComment(e) {
    setComment(e.target.value);
  }

  function handleClick() {
    let regex =
      /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/gim;
    let arrPath = regex.exec(inputUrl);
    if (inputUrl && arrPath) {
      let idPath = arrPath[1];
      setIdVideo(idPath);
      setConvertPath(`https://www.youtube.com/embed/${idPath}`);
      setIsUrl(false);
      loadComment(idPath);
    } else {
      setIsUrl(true);
    }
  }

  function inputEvent() {
    if (idVideo && comment) {
      setListComment((e) => [...e, { id: idVideo, comment: comment }]);
      setComment("");
    }
  }

  return (
    <div>
      <div>
        <input
          type='text'
          value={inputUrl}
          placeholder='Please input URL youtube'
          onChange={(e) => handleInput(e)}
          className='style-input'
        />
      </div>
      <div>
        <button onClick={handleClick}>Click</button>
        <div className='not-url'>
          {isUrl && <div>Not URL video youtube. Plsase input again!</div>}
        </div>
      </div>
      <div>
        <iframe title='Video' width='600' height='345' src={convertPath} />
      </div>
      <div>
        {listComment.map((e, index) => {
          return (
            <div className='comment' key={index}>
              {e.comment}
            </div>
          );
        })}
      </div>
      <div>
        <input
          className='style-input'
          value={comment}
          placeholder='Enter comment'
          onChange={(e) => handleComment(e)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              inputEvent();
            }
          }}></input>
      </div>
    </div>
  );
};

export default LoadYoutube;
