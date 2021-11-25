import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  changeSignPage,
  getLiveStatus,
  startRunGuide,
} from "../../Redux/Action";
import firebase from "../../utils/firebase";
import Swal from "sweetalert2";

const StyleNav = styled.nav`
  margin-left: auto;
  line-height: 100px;
  position: relative;

  @media only screen and (max-width: 1020px) {
    display: none;
  }
`;

const StyleLink = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => (props.headercolor ? "#222" : "#fff")};
  border-left: 2px solid ${(props) => (props.headercolor ? "#666" : "#fff")};
  width: 150px;
  padding: 0px 20px;

  :hover {
    color: ${(props) => (props.headercolor ? "#8e94f2" : "#fd8e87")};
    transition: all 0.2s;
  }

  @media only screen and (max-width: 1020px) {
    color: #fff;
    border-left: 2px solid #fff;
    height: 30px;
    width: fit-content;
    line-height: 30px;
    margin: auto;

    &:hover {
      color: #ffbfaa;
      transition: all 0.2s;
    }
  }
`;

const StyleSignLink = styled.a`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => (props.headerColor ? "#222" : "#fff")};
  border-left: 2px solid ${(props) => (props.headerColor ? "#666" : "#fff")};
  width: 150px;
  padding: 0px 20px;
  cursor: ${(props) => (props.liveStatus ? "not-allowed" : "pointer")};

  :hover {
    color: ${(props) => (props.headerColor ? "#8e94f2" : "#fd8e87")};
    transition: all 0.2s;
  }

  @media only screen and (max-width: 1020px) {
    color: #fff;
    height: 30px;
    width: fit-content;
    line-height: 30px;
    margin: auto;

    &:hover {
      color: #ffbfaa;
      transition: all 0.2s;
    }
  }
`;

const StyleInvitationArea = styled.div`
  display: inline;
  font-size: 1.5rem;
  font-weight: 400;
  border-left: 2px solid ${(props) => props.headercolor};
  padding: 0px 40px;
  position: relative;
`;

const StyleNoNotification = styled.div`
  position: absolute;
  right: 25px;
  top: -1px;
  width: 30px;
  height: 30px;
  line-height: 100px;
  display: ${(props) => props.invitationdata};
  align-content: center;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-image: ${(props) => props.headercolor};
`;

const StyleNewNotification = styled.div`
  position: absolute;
  right: 25px;
  top: -1px;
  width: 30px;
  height: 30px;
  line-height: 100px;
  display: ${(props) => props.invitationdata};
  align-content: center;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-image: url("/images/bell.gif");
  border-radius: 50%;
  padding: 5px;
  opacity: 0.8;
`;

const StyleInvitation = styled.div`
  position: absolute;
  right: 25px;
  top: -12px;
  width: 30px;
  height: 30px;
  color: ${(props) => props.headercolor};
  font-size: 1rem;
`;

const StylequestionArea = styled.div`
  position: absolute;
  right: 100px;
  top: 35px;
  width: 30px;
  height: 30px;
  line-height: 100px;
  display: inline-block;
  align-content: center;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-image: ${(props) => props.headercolor};
`;

const Nav = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const invitationData = identityData.invitation;
  const identity = useSelector((state) => state.identity);
  const liveStatus = useSelector((state) => state.liveStatus); // 視訊室狀態
  const dispatch = useDispatch();
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);
    });
  }, []);

  // 不用 signStatus Redux 判斷，用 onAuthStateChanged，拆開成兩個 useEffect
  return currentUser === null ? (
    <StyleNav layer={props.layer}>
      <StyleLink headercolor={props.headerColor} exact to="/">
        Home
      </StyleLink>
      <StyleSignLink
        headerColor={props.headerColor}
        onClick={() => dispatch(changeSignPage(true))}>
        Sign
      </StyleSignLink>
    </StyleNav>
  ) : (
    <StyleNav layer={props.layer}>
      {liveStatus ? (
        <>
          <StyleSignLink
            headercolor={props.headerColor}
            liveStatus={liveStatus}>
            Live
          </StyleSignLink>
          <StylequestionArea
            headercolor={
              props.headerColor
                ? "url('/images/question-scroll.png')"
                : "url('/images/question-static.png')"
            }
            onClick={() => {
              dispatch(startRunGuide(true)); // 開始操作導覽
            }}
          />
        </>
      ) : (
        <>
          {identity === "student" ? (
            <>
              <StyleLink headercolor={props.headerColor} exact to="/">
                Home
              </StyleLink>
              <StyleLink headercolor={props.headerColor} to="/teachers">
                Teachers
              </StyleLink>
            </>
          ) : null}

          <StyleLink headercolor={props.headerColor} to="/live">
            Live
          </StyleLink>

          {identity === "student" ? (
            <>
              <StyleLink headercolor={props.headerColor} to="/profile/myresume">
                Profile
              </StyleLink>
              <StyleInvitationArea
                headercolor={props.headerColor ? "#666" : "#fff"}>
                <StyleNewNotification
                  invitationdata={invitationData ? "inline-block" : "none"}
                  onClick={() => {
                    if (invitationData) {
                      Swal.fire({
                        title: `預約對象｜${invitationData.name}`,
                        html: `<h3>正在邀請您前往視訊！</h3>`,
                        confirmButtonText: "Go｜前往",
                        showLoaderOnConfirm: true,
                        showCancelButton: true,
                        cancelButtonText: "Cancel｜取消",
                        showCloseButton: true,
                        customClass: {
                          confirmButton: "confirm__button",
                          cancelButton: "cancel__button",
                        },
                        imageUrl: "/images/theme/theme-7.png",
                        imageWidth: 130,
                        imageAlt: "theme image",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          dispatch(getLiveStatus(true)); // 視訊室狀態
                          history.push("/live");
                          dispatch(startRunGuide(true)); // 開始操作導覽
                        }
                      });
                    }
                  }}
                />
                <StyleNoNotification
                  invitationdata={invitationData ? "none" : "inline-block"}
                  headercolor={
                    props.headerColor
                      ? "url('/images/bell-scroll.png')"
                      : "url('/images/bell-static.png')"
                  }
                  onClick={() => {
                    Swal.fire({
                      title: "沒有任何視訊邀請！",
                      customClass: {
                        confirmButton: "confirm__button",
                      },
                    });
                  }}
                />
                {invitationData ? (
                  <StyleInvitation
                    headercolor={props.headerColor ? "red" : "#ffee32"}>
                    New!
                  </StyleInvitation>
                ) : null}
              </StyleInvitationArea>
            </>
          ) : (
            <StyleLink headercolor={props.headerColor} to="/profile/myprofile">
              Profile
            </StyleLink>
          )}
        </>
      )}
    </StyleNav>
  );
};

export default Nav;
