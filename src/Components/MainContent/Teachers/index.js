import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import GroupTeachers from "./GroupTeachers";

const StyleTeachers = styled.div`
  opacity: 0.8;
`;

const StyleImageStudentArea = styled.div`
  width: 100%;
  height: 400px;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-block;
  vertical-align: bottom;
  background-image: url("/images/home-student.png");

  @media only screen and (max-width: 1020px) {
    height: 200px;
  }
`;

const StyleTeachersContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;

  @media only screen and (max-width: 1020px) {
    flex-direction: column;
  }
`;

const Teachers = (props) => {
  const [selectIndustry, setSelectIndustry] = useState("");
  const [selectTitle, setSelectTitle] = useState("");
  const [selectLanguage, setSelectLanguage] = useState("");
  const [displayTag, setDisplayTag] = useState(false);

  return (
    <StyleTeachers>
      <StyleImageStudentArea />
      <StyleTeachersContainer>
        <Sidebar
          selectIndustry={selectIndustry}
          setSelectIndustry={setSelectIndustry}
          selectTitle={selectTitle}
          setSelectTitle={setSelectTitle}
          selectLanguage={selectLanguage}
          setSelectLanguage={setSelectLanguage}
          displayTag={displayTag}
          setDisplayTag={setDisplayTag}
        />
        <GroupTeachers
          selectIndustry={selectIndustry}
          setSelectIndustry={setSelectIndustry}
          selectTitle={selectTitle}
          setSelectTitle={setSelectTitle}
          selectLanguage={selectLanguage}
          setSelectLanguage={setSelectLanguage}
          displayTag={displayTag}
          setDisplayTag={setDisplayTag}
        />
      </StyleTeachersContainer>
    </StyleTeachers>
  );
};

export default Teachers;
