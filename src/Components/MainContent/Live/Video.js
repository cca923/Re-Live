import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLiveData, getLiveStatus } from "../../../Redux/Action";
import styled from "styled-components";
import Swal from "sweetalert2";
import firebase from "../../../utils/config/firebase-config";
import videoOn from "../../../images/video-on.png";
import exit from "../../../images/exit.png";
import Joyride from "react-joyride";

const StyleVideo = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);

  @media only screen and (max-width: 950px) {
    flex-direction: row;
    height: fit-content;
  }

  @media only screen and (max-width: 730px) {
    flex-direction: column;
  }
`;

const StyleVideoContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const StyleVideoSize = styled.div`
  height: 200px;
  width: 100%;
  overflow: hidden;
  border-radius: 0 0 20px 20px;
`;

const StyleVideoArea = styled.video`
  height: 300px;
  background-color: black;
  border-radius: 0 0 20px 20px;
`;

const StyleLocalArea = styled.div`
  width: 330px;
  margin: 20px;

  @media only screen and (max-width: 730px) {
    margin: 20px auto;
  }
`;

const StyleRemoteArea = styled.div`
  width: 330px;
  margin: auto 20px 20px 20px;

  @media only screen and (max-width: 950px) {
    margin: 20px 20px 20px auto;
  }

  @media only screen and (max-width: 730px) {
    margin: 20px auto;
  }
`;

const StyleName = styled.div`
  padding: 8px;
  text-align: center;
  background-color: #fff;
  font-size: 1.5rem;
  font-weight: 800;
  vertical-align: middle;
  height: 40px;
  border-radius: 20px 20px 0 0;
`;

const StyleToggleArea = styled.div`
  display: flex;
  position: absolute;
  bottom: 11px;
  padding-left: 7px;
`;

const StyleToggle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 3px;
`;

const StyleOpenWebCam = styled.img`
  margin: auto;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 50%;
  display: inline-block;
  align-content: center;
  background-size: cover;
  background-position: center;
  background-color: ${(props) => (props.video ? "#8fb996" : "#595959")};
  border: ${(props) =>
    props.video ? "2px solid #8fb996" : "2px solid #c3c3c3"};

  &:hover {
    background-color: ${(props) => (props.video ? "red" : "#c3c3c3")};
    border: ${(props) => (props.video ? "2px solid red" : "2px solid #595959")};
  }
`;

const StyleMicrophone = styled.img`
  margin: auto;
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 50%;
  display: inline-block;
  align-content: center;
  background-size: cover;
  background-position: center;
  background-color: ${(props) => (props.video ? "#8fb996" : "#c0c0c0")};

  &:hover {
    background-color: ${(props) => (props.video ? "red" : "#8fb996")};
  }
`;

const StyleExit = styled.img`
  margin: auto;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 50%;
  display: inline-block;
  align-content: center;
  background-size: cover;
  background-position: center;
  background-color: ${(props) => (props.video ? "#8fb996" : "#595959")};
  border: ${(props) =>
    props.video ? "2px solid #8fb996" : "2px solid #c3c3c3"};

  &:hover {
    background-color: ${(props) => (props.video ? "red" : "#c3c3c3")};
    border: ${(props) => (props.video ? "2px solid red" : "2px solid #595959")};
  }
`;

const StyleLabel = styled.div`
  font-size: 10px;
  color: #fff;
  padding-bottom: 5px;
`;

const StyleCalloutArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const StyleCreateRoomIdArea = styled.div`
  display: flex;
`;

const StyleButton = styled.div`
  width: 120px;
  font-size: 1rem;
  outline: 0;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  color: #fff;
  text-align: center;
  line-height: 38px;
  border-radius: 0 50px 50px 0;
  background-image: linear-gradient(180deg, #7c8aff, #3c4fe0);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }
`;

const StyleSendButton = styled.div`
  width: 120px;
  font-size: 1rem;
  margin: 0 auto 10px auto;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: rgb(72, 76, 122);
  font-weight: 600;
  text-align: center;
  line-height: 38px;
  border-radius: 50px;
  background-image: linear-gradient(180deg, #fff, #f5f5fa);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }
`;

const StyleRoomId = styled.div`
  width: 100%;
  font-size: 1rem;
  border: 2px solid #c5c5c5;
  border-radius: 50px;
  text-align: center;
  visibility: hidden;
`;

const StyleInvitationArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Video = (props) => {
  const identityData = useSelector((state) => state.identityData); // 目前的使用者
  const identity = useSelector((state) => state.identity); // 目前的使用者身份
  const liveData = useSelector((state) => state.liveData); // 要視訊的對象
  const history = useHistory();
  const dispatch = useDispatch();

  const db = firebase.firestore();
  const studentsCollection = db.collection("students");
  const teachersCollection = db.collection("teachers");

  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  // Global state
  let pc = new RTCPeerConnection(servers);
  let localStream = null;
  let remoteStream = null;

  // Control element via Dom
  const localVideo = useRef();
  const remoteVideo = useRef();
  const createId = useRef();
  const joinRoom = useRef();

  const openWebCam = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    remoteStream = new MediaStream();

    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    // Show stream in HTML video
    localVideo.current.srcObject = localStream;
    remoteVideo.current.srcObject = remoteStream;

    if (identity === "teacher") {
      createOffer();
    }
  };

  const createOffer = async () => {
    const callDoc = db.collection("calls").doc(); // create id
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    // 老師產生的房間代碼，儲存起來要寄給學生
    // setcreateRoomId(callDoc.id); //BUG
    createId.current.textContent = callDoc.id;
    console.log(createId.current.textContent);

    // Get candidates for caller, save to db
    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // Create offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    // Listen for remote answer
    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    // When answered, add candidate to peer connection
    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  const answerCall = async () => {
    // 學生收到通知複製貼上的房間代碼，依照 id 進入房間
    // const callDoc = db.collection("calls").doc(joinRoomId); //BUG
    const callId = joinRoom.current.textContent;
    const callDoc = db.collection("calls").doc(callId);
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();
    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change);
        if (change.type === "added") {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  const hangupCall = async () => {
    const closeStream = () => {
      localVideo.current.srcObject.getTracks().forEach(function (track) {
        track.stop();
      });
      remoteVideo.current.srcObject.getTracks().forEach(function (track) {
        track.stop();
      });

      localVideo.current.srcObject = null;
      remoteVideo.current.srcObject = null;

      pc.ontrack = null;
      pc.onicecandidate = null;
      pc.close();
      pc = null;
    };

    if (identity === "teacher") {
      closeStream();
      history.push("/profile/myclass"); // 導回 profile
      dispatch(getLiveData(null));
      dispatch(getLiveStatus(false)); // 視訊室狀態

      // BUG:老師離開會如果從學生 firebase 中移除 invitation，會立刻顯示 Error!(因為資料被移除了)
      // TODO:如果老師邀請了，卻想離開要怎麼把通知收回呢！？
      // studentsCollection.doc(liveData.email).update({
      //   invitation: firebase.firestore.FieldValue.delete(),
      // });
    } else if (identity === "student") {
      Swal.fire({
        title: "歡迎留下評論！",
        input: "textarea",
        inputLabel: `覺得 ${identityData.invitation.name} 如何？`,
        inputPlaceholder: `分享您對與 ${identityData.invitation.name} 視訊的想法吧！(限 200 字)`,
        inputAttributes: {
          maxlength: "200",
        },
        showLoaderOnConfirm: true,
        confirmButtonText: "Submit｜發送",
        showDenyButton: true,
        denyButtonText: "Dismiss｜略過",
        customClass: {
          confirmButton: "confirm__button",
          denyButton: "deny__button",
        },
        allowOutsideClick: false,
        inputValidator: (value) => {
          if (!value) {
            return "沒有輸入任何評論喔！";
          }
        },
      }).then((result) => {
        if (result.isDenied) {
          closeStream();
          history.push("/"); // 導回首頁
          dispatch(getLiveStatus(false)); // 視訊室狀態

          // 從學生 firebase 中移除 invitation
          studentsCollection.doc(identityData.email).update({
            invitation: firebase.firestore.FieldValue.delete(),
          });
        } else if (result.isConfirmed) {
          closeStream();

          // 學生把留言加到老師 comments []
          const comments = {
            email: identityData.email,
            comment: result.value,
            time: new Date().getTime(),
          };
          teachersCollection
            .doc(identityData.invitation.email)
            .update({
              comments: firebase.firestore.FieldValue.arrayUnion(comments),
            })
            .then(() => {
              Swal.fire({
                title: "評論成功，自動跳轉至首頁",
                icon: "success",
                timer: 1200,
                timerProgressBar: true,
                showConfirmButton: false,
              })
                .then(() => {
                  history.push("/"); // 導回首頁
                  dispatch(getLiveStatus(false)); // 視訊室狀態
                })
                .then(() => {
                  // 從學生 firebase 中移除 invitation
                  studentsCollection.doc(identityData.email).update({
                    invitation: firebase.firestore.FieldValue.delete(),
                  });
                });
            });
        }
      });
    }
  };

  const handleInvitation = () => {
    const invitation = {
      email: identityData.email,
      name: identityData.name,
      roomId: createId.current.textContent,
    };
    // 加入 firebase 學生邀請
    studentsCollection
      .doc(liveData.email)
      .update({ invitation })
      .then(() => {
        Swal.fire({
          title: `已發送邀請通知，請稍候！`,
          html: `<h3>發送對象｜${liveData.name}</h3>`,
          showCloseButton: true,
          customClass: {
            confirmButton: "confirm__button",
          },
          imageUrl: "/images/theme/theme-9.png",
          imageWidth: 200,
          imageAlt: "theme image",
        });
      });
  };

  return (
    <StyleVideo>
      <StyleLocalArea>
        <StyleName>{identityData.name}</StyleName>
        <StyleVideoContainer>
          <StyleVideoSize>
            <StyleVideoArea autoPlay playsInline ref={localVideo} />
          </StyleVideoSize>

          <StyleToggleArea>
            <StyleToggle>
              <StyleLabel>開啟視訊</StyleLabel>
              <StyleOpenWebCam src={videoOn} onClick={openWebCam} />
            </StyleToggle>
            <StyleToggle>
              <StyleLabel>離開房間</StyleLabel>
              <StyleExit src={exit} onClick={hangupCall} />
            </StyleToggle>
            {/* <div>
              <StyleMicrophone src={microphone ? phoneOff : phoneOn} />
              <StyleLabel>
                {microphone ? "關掉麥克風" : "開啟麥克風"}
              </StyleLabel>
            </div> */}
          </StyleToggleArea>
        </StyleVideoContainer>

        {identity === "teacher" ? (
          <StyleCalloutArea>
            <StyleInvitationArea>
              <StyleSendButton
                onClick={() => {
                  handleInvitation();
                }}>
                寄送通知
              </StyleSendButton>
            </StyleInvitationArea>
            <StyleCreateRoomIdArea>
              <StyleRoomId ref={createId} />
              {/* <StyleButton onClick={createOffer}>產生房間代碼</StyleButton> */}
            </StyleCreateRoomIdArea>
          </StyleCalloutArea>
        ) : (
          <StyleInvitationArea>
            <StyleSendButton onClick={answerCall}>加入房間</StyleSendButton>

            <StyleRoomId ref={joinRoom}>
              {identityData.invitation ? identityData.invitation.roomId : null}
            </StyleRoomId>
          </StyleInvitationArea>
        )}
      </StyleLocalArea>

      <StyleRemoteArea>
        <StyleName>
          {identity === "teacher"
            ? liveData.name
            : identityData.invitation.name}
        </StyleName>
        <StyleVideoSize>
          <StyleVideoArea autoPlay playsInline ref={remoteVideo} />
        </StyleVideoSize>
      </StyleRemoteArea>
    </StyleVideo>
  );
};

export default Video;