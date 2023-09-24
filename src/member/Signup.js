import React, {useEffect, useState} from 'react';
import './Signup.css';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import Loading from "../common/Loading.js";
import {
    pwdInput,
    stateBtnEmail, stateBtnNext,
    stateCode,
    stateCodeBtn,
    stateEmail,
    statePwd,
    statePwdChk,
    updateInput, updateName
} from '../redux/ducks/SignupDuck';

function UserPwdChk(props) {
    const dispatch = useDispatch();
    const pwdChkDisabled = useSelector((state) => state.signup.pwdChkState);
    const [isError, setIsError] = useState(false);

    const content = "비밀번호가 일치하지 않습니다.";
    let pwd = useSelector((state) => state.signup.pwd);
    const chkPwd = (event) => {
        let input = event.target.value;
        if(pwd === input){
            setIsError(false);
            dispatch(stateBtnNext(false));
        } else {
            setIsError(true);
            dispatch(stateBtnNext(true));
        }

    }

    return (
        <div className="signup_form_columnFour">
            <input type="password" disabled={pwdChkDisabled} onChange = {chkPwd} name = "password" placeholder="비밀번호 확인" autoComplete="off" maxLength="20"/>
            {isError && <ErrorTooltip content = {content}></ErrorTooltip>}
        </div>

    );
}

function UserPwd(props) {

    const dispatch = useDispatch();
    const pwdDisabled = useSelector((state) => state.signup.pwdState);
    const [isError, setIsError] = useState(false);
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!]{8,})$/;
    const content = "비밀번호 형식이 맞지 않습니다.";

    const validationPwd = (event) => {
        let inputVal = event.target.value;
        if(regExp.test(inputVal)) {
            setIsError(false);
            dispatch(statePwdChk(false));
            dispatch(pwdInput(inputVal));
        } else {
            setIsError(true);
            dispatch(statePwdChk(true));
        }

    };

    return (
        <div className="signup_form_columnThree">
            <label>
                <span>비밀번호</span>
                <em>비밀번호는 8~20자 영문, 숫자, 특수문자로 입력하세요</em>
                <input type="password" disabled={pwdDisabled} name = "password" placeholder="비밀번호 입력" autoComplete="off" onChange={validationPwd} maxLength="20"/>
                {isError && <ErrorTooltip content = {content}></ErrorTooltip>}
            </label>
        </div>
    );
}
/* 타이머 기능 제외
function getSeconds(time) {

    //타이머 초부분 반환
    const seconds = Number(time % 60);
    if(seconds < 10) {
        return "0" + String(seconds);
    } else {
        return String(seconds);
    }

}
function Timer(props) {
    const dispatch = useDispatch();

    // 이메일 인증 코드 전송후 3분간 버튼 비활성화
    const [time, setTime] = useState(10);

    // 코드 입력 태그가 활성화 되있을때만 인증하기 버튼이 활성화 되도록
    const codeDisabled = useSelector((state) => state.signup.codeState);

    dispatch(stateBtnEmail(true));
    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => prev -1);
        },1000);

        if(time === 0){
            clearInterval(timer);
        }
        return () => clearInterval(timer);

    }, [time]);

    if(time === 0 && !codeDisabled) {
        dispatch(stateBtnEmail(false));
    }

    return (
        <div className="timer_container">
            <span>{parseInt(time/60)}</span>
            <span> : </span>
            <span>{getSeconds(time)}</span>
        </div>);
}
*/
function ChkEmailCode(props) {

    const [code, setCode] = useState("");
    const [isError, setIsError] = useState(false);
    const codeDisabled = useSelector((state) => state.signup.codeState);
    const codeBtnDisabled = useSelector((state) => state.signup.codeBtnState);

    const dispatch = useDispatch();

    let content = "코드가 일치하지 않습니다.";
    const inputEmail = useSelector((state) => state.signup.email);

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    }

    //인증코드 체크
    const chkCode = () => {

        axios.get('/api/email/chkCode',{params : {
            code : code,
            email: inputEmail
            }
        })
            .then( function (response) {

                if(response.data){
                    dispatch(statePwd(false));
                    setIsError(false);
                    dispatch(stateCode(true));
                    dispatch(stateBtnEmail(true));
                    dispatch(stateCodeBtn(true));

                } else {
                    setIsError(true);
                    dispatch(statePwd(true));
                    dispatch(statePwdChk(true));
                    dispatch(stateBtnNext(true));
                }

            })
            .catch(error => alert("에러가 발생했습니다 잠시후에 시도해주세요."))
    }

    return (
        <label>
            <span>코드</span>
            <input type="email" disabled={codeDisabled} name = "email" placeholder="코드입력" autoComplete="off" onChange={handleCodeChange}/>
            <button id = "emailBtn" disabled={codeBtnDisabled} type="button" onClick = {chkCode}>확인</button>
            {isError && <ErrorTooltip content = {content}></ErrorTooltip>}
        </label>
    );

}
function UserEmail(props) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    //이메일 정규표현식
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    const [isError, setIsError] = useState(false);
    const [codeDisplay, setCodeDisplay] = useState(false);
    const [email, setEmail] = useState('');

    const isDisabled = useSelector((state) => state.signup.emailBtnState);
    const emailDisabled = useSelector((state) => state.signup.emailState);

    let content = "이메일 형태로 입력해주세요."
    const validationEmail = (event) => {
        let inputEmailVal = event.target.value;
        setEmail(inputEmailVal);
        //이메일 형식이 맞을 경우
        if(regExp.test(inputEmailVal)){
            setIsError(false);
            dispatch(stateBtnEmail(false));
            dispatch(stateCode(false));
            dispatch(stateCodeBtn(false));

        } else {
            //이메일 형식이 맞지 않을경우 에러 표시 및 버튼 비활성화
            setIsError(true);
            dispatch(stateBtnEmail(true));
            dispatch(stateCode(true));
            dispatch(stateCodeBtn(true));
            dispatch(statePwd(true));
            dispatch(statePwdChk(true));
            dispatch(stateBtnNext(true));
        }
    }

    const sendEmailCode = () => {
        dispatch(updateInput(email));
        dispatch(stateBtnEmail(true));
        // api 호출 전에 true로 변경하여 로딩화면 띄우기
        setLoading(true);

        //이메일 인증 코드 전송
        axios.get('/api/email/sendChkEmail',{params : {email : email}})
            .then( function (response){
                setCodeDisplay(response.data);
                dispatch(stateBtnEmail(false));
                //완료시 로딩화면 제거
                setLoading(false);
            })
            .catch(error => alert("에러가 발생했습니다 잠시후에 시도해주세요."))
    }

    return (
        <div className="signup_form_columnTwo">
            <label>
                {loading && <Loading/>}
                <div className="email_container">
                    <span>이메일</span>
                </div>
                <input type="email"  disabled={emailDisabled} name = "email" placeholder="이메일 입력" autoComplete="off" onChange={validationEmail}/>
                <button id = "emailBtn" type="button" disabled= {isDisabled} onClick={sendEmailCode}>인증하기</button>
            </label>
            {isError && <ErrorTooltip content = {content}></ErrorTooltip>}
            {codeDisplay && <ChkEmailCode></ChkEmailCode>}
        </div>
    );
}

function UserName(props) {

    const dispatch = useDispatch();
    const [isError, setIsError] = useState(false);
    let content = "이름을 입력해주세요."
    const pwdChk = useSelector((state) => state.signup.pwdChkState);

    const userNameClass = isError ?  "name_input_error" : "name_input_collect";
    const validationName = (event) => {

        let inputName = event.target.value;

        if(inputName.trim() === ''){
            // 이름이 공백일경우 비활성화
            setIsError(true);
            dispatch(stateEmail(true));
            dispatch(stateBtnEmail(true));
            dispatch(stateCode(true));
            dispatch(stateCodeBtn(true));
            dispatch(stateBtnNext(true));
        } else {
            // 이름이 공백이 아닐경우
            setIsError(false);
            dispatch(stateEmail(false));
            dispatch(stateBtnEmail(false));
            dispatch(stateCode(false));
            dispatch(stateCodeBtn(false));

            dispatch(updateName(inputName));

            // 2차 비밀번호 까지 입력후 이름 입력시 다음 버튼 다시 활성화
            if(!pwdChk){
                dispatch(stateBtnNext(false));
            }

        }
    }

    return (
        <div className="signup_form_columnOne">
            <label>
                <span>이름</span>
                <input className = {userNameClass} type="text" name = "name" placeholder="이름 입력" autoComplete="off" onBlur={validationName}/>
            </label>
            {isError && <ErrorTooltip content = {content}></ErrorTooltip>}
        </div>
    );

}
function ErrorTooltip(props) {

    return (
        <div className = "error_tooltip_name">
            <div>
                <div className = "error_tooltip_name_menu">
                    <i className = "error_tooltip_icon"></i>
                    <p>{props.content}</p>
                </div>
            </div>
        </div>
    );
}
function Signup(props) {

    const nextBtnIsDisabled = useSelector((state) => state.signup.nextBtnState);
    const email = useSelector((state) => state.signup.email);
    const name = useSelector((state) => state.signup.name);
    const pwd = useSelector((state) => state.signup.pwd);
    const handleSubmit = e => {
        e.preventDefault();
        //회원가입
        axios.post('/api/member/signUp',{
                email : email,
                name : name,
                pwd : pwd})
            .then( function (response){
                console.log(response);
            })
            .catch(error => alert("에러가 발생했습니다 잠시후에 시도해주세요."))
    }

    return (
        <main>
            <div className="signup_container">
                <div className="signup_formwrapper">
                    <h1>회원가입</h1>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <UserName></UserName>
                            <UserEmail></UserEmail>
                            <UserPwd></UserPwd>
                            <UserPwdChk></UserPwdChk>
                        </fieldset>
                        <button  type="submit" disabled = {nextBtnIsDisabled}>다음</button>
                        <div className="signup_form_signin">
                            <p>이미 가입하셨나요?</p>
                            <a href="/landing/kr/signin">로그인</a>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Signup;