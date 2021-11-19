import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import editIcon from "../../../../../../images/edit.png";
import editIconHover from "../../../../../../images/edit-hover.png";
import saveIcon from "../../../../../../images/save.png";
import saveIconHover from "../../../../../../images/save-hover.png";
import firebase from "../../../../../../utils/config/firebase-config";

const StyleEditorArea = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  position: relative;
`;

const StyleReactQuill = styled(ReactQuill)`
  width: 100%;
  z-index: 1000;
`;

const StyleReactQuillDisplay = styled.div`
  max-width: 100%;
  width: 100%;
  height: fit-content;
  z-index: 1000;
  line-height: 1.6rem;
  padding: 10px 30px;

  a {
    text-decoration: underline;
    color: #4267b2;
  }

  h1 {
    line-height: 2.5rem;
  }
`;

const StyleEditButton = styled.img`
  width: 50px;
  padding: 8px;
  background-size: 50%;
  border-radius: 15px;
  position: fixed;
  position: absolute;
  right: 0%;
  bottom: 0%;
  z-index: 1000;
  display: ${(props) => (props.hover ? "inline-block" : "none")};
  outline: 0;
  border: 0;
  cursor: pointer;
  background-image: linear-gradient(180deg, #7c8aff, #3c4fe0);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }
`;

const Editor = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const resumeData = identityData.resume;

  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const studentsRef = db.collection("students").doc(user.email);

  const [value, setValue] = useState(); // 設定初始值，是 detail 還是 firebase 資料
  const [edit, setEdit] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const [displayDetail, setDisplayDetail] = useState(false);

  const detail = `
    <h1>Work Experience</h1>
    <h1>Education</h1>
    <h1>Skill</h1>
  `;

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "script",
    "indent",
    "direction",
    "size",
    "header",
    "color",
    "background",
    "font",
    "align",
    "link",
  ];

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  useEffect(() => {
    // 初始狀態
    if (!resumeData) {
      // 沒有過 resume
      setValue(detail);
      // 不設定 display(true)，因為出來的值是吃有沒有 resume.detail，所以 StyleReactQuill 重複寫一次
      // setDisplayDetail(true);

      // 不在沒有 resume 時先加到firebase，畫面先呈現 detail 格式，save 再加入
      // studentsRef.set({ resume }, { merge: true }).then(() => {
      //   setValue(detail);
      //   setDisplayDetail(true);
      // });
    } else if (resumeData && !resumeData.detail) {
      // 沒有過 Detail 會立刻幫他補上，就瞬間 update 成有過 Detail
      const resume = {
        detail,
      };
      studentsRef.set({ resume }, { merge: true }).then(() => {
        setValue(detail);
        setDisplayDetail(true);
      });
    } else if (resumeData && resumeData.detail) {
      // 有過 Detail
      setValue(resumeData.detail);
      setDisplayDetail(true);
    }
  }, [resumeData]);

  return (
    <StyleEditorArea>
      {edit ? (
        // 依照 firebase 是否有 resume.detail 來判斷
        displayDetail ? (
          <StyleReactQuill
            placeholder="開始編輯履歷吧！"
            value={value}
            onChange={(value) => setValue(value)}
            modules={modules}
            formats={formats}
          />
        ) : (
          <StyleReactQuill
            placeholder="開始編輯履歷吧！"
            value={value}
            onChange={(value) => setValue(value)}
            modules={modules}
            formats={formats}
          />
        )
      ) : displayDetail ? (
        <StyleReactQuillDisplay>
          {ReactHtmlParser(resumeData.detail)}
        </StyleReactQuillDisplay>
      ) : (
        <StyleReactQuillDisplay>
          {ReactHtmlParser(value)}
        </StyleReactQuillDisplay>
      )}

      <StyleEditButton
        hover={props.hover}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => {
          setOnHover(false);
        }}
        src={
          edit
            ? onHover
              ? saveIconHover
              : saveIcon
            : onHover
            ? editIconHover
            : editIcon
        }
        onClick={() => {
          if (edit) {
            const resume = {
              detail: value,
            };
            studentsRef.set({ resume }, { merge: true });
          }
          edit ? setEdit(false) : setEdit(true);
        }}
      />
    </StyleEditorArea>
  );
};

export default Editor;