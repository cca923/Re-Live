import styled from "styled-components";

const StylePurpleButton = styled.div`
  width: 150px;
  outline: 0;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  line-height: 38px;
  color: #fff;
  text-align: center;
  border-radius: 50px;
  background-image: linear-gradient(180deg, #7c8aff, #3c4fe0);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  &:hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }
`;

const StyleWhiteButton = styled.div`
  width: 150px;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: rgb(72, 76, 122);
  font-weight: 600;
  font-size: 1rem;
  line-height: 38px;
  text-align: center;
  border-radius: 50px;
  background-image: linear-gradient(180deg, #fff, #f5f5fa);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  &:hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }
`;

const StyleFacebookLoginButton = styled.div`
  background-color: #4267b2;
  background-image: linear-gradient(180deg, #7192d5, #345087);
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }

  @media only screen and (max-width: 1000px) {
    border-radius: 20px;
    font-size: 1rem;
  }
`;

const StyleGoogleLoginButton = styled.div`
  background-color: #e65f5c;
  background-image: linear-gradient(180deg, #e65f5c, #a94340);
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }

  @media only screen and (max-width: 1000px) {
    border-radius: 20px;
    font-size: 1rem;
  }
`;

export {
  StylePurpleButton,
  StyleWhiteButton,
  StyleFacebookLoginButton,
  StyleGoogleLoginButton,
};
