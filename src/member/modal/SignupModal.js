import React from 'react';
import './Modal.css';
import './SignupModal.css';
import {useDispatch} from "react-redux";
import {openModal} from "../../redux/ducks/ModalDuck";
import {useNavigate} from "react-router-dom";
function SignupModal({closeModal}){

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const open = () => {
        dispatch(openModal());
    };

    const close = () => {
        dispatch(closeModal());
    };
    if (!open) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: open ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">WEE!</h5>
                        <button type="button" className="close" onClick={close}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <button type="button" className="signup_email" onClick={() =>
                            navigate("/signup")
                        }>
                            이메일로 가입
                        </button>
                        <button type="button" className="signup_naver">
                            네이버로 간편 가입
                        </button>
                        <button type="button" className="signup_kakao">
                            카카오로 간편 가입
                        </button>
                    </div>
                    <div className="modal-footer">
                        <span>이미 회원이신가요? <a href="#">로그인 하기</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupModal;