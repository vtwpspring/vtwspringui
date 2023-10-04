import React from 'react';
import './MainIndex.css';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '../redux/ducks/ModalDuck';
import SignupModal from '../member/modal/SignupModal';
import {useNavigate} from "react-router-dom";

function LeftContainer() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const open = () => {
        dispatch(openModal());
    };

    return (
        <div className="Container_left">
            <h1>가장 쉬운 협업 공간</h1>
            <p className="Container_left_title">WEE!</p>
            <p>단절된 소통, 번거로운 자료 공유, 보안 위협은 이제 그만!</p>
            <p>협업툴 WEE!와 함께라면 효율적으로 협업할 수 있습니다.</p>
            <div className="Container_left_btn">
                <button type="button" onClick={() =>
                    navigate("/signin")
                }>로그인</button>
                <button type="button" className="Signup_btn" onClick = {open}>회원가입</button>
            </div>
        </div>
    );
}
function RightContainer() {

    return (
        <div className="Container_right">
            <div className="Container_right_img">
                <img src={`${process.env.PUBLIC_URL}/img/indexTemp.png`} alt="Movie Poster" />
            </div>
        </div>

    );

}

function MainIndex(props) {
    const isModalOpen = useSelector((state) => state.modal.isOpen);

    return (
        <main>
            <section className="TopContainer">
                <div className="Wrapper_container">
                    <LeftContainer></LeftContainer>
                    <RightContainer></RightContainer>
                </div>
                {isModalOpen && (<SignupModal closeModal = {closeModal}/>)}
            </section>
            <section className="TopContainer">
                <div className="Wrapper_container">
                </div>
            </section>
        </main>
    );
}

export default MainIndex;