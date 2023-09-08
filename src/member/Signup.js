import React, {useEffect, useState} from 'react';
import './Signup.css';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import { updateInput } from '../redux/ducks/SignupDuck';


function Counter(props) {

    const [minute, setMinute] = useState(3);
    const [second, setSecond] = useState(0);

    useEffect(() => {
        setInterval(() => {

        },18000);
    });


}

function ChkEmailCode(props) {

    const [code, setCode] = useState("");
    const [isError, setIsError] = useState(false);

    let content = "코드가 일치하지 않습니다.";
    const inputEmail = useSelector((state) => state.signup.email);

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    }

    const chkCode = () => {

        axios.get('/api/email/chkCode',{params : {
            code : code,
            email: inputEmail
            }
        })
            .then( response =>  setIsError(!response.data))
            .catch(error => alert("에러가 발생했습니다 잠시후에 시도해주세요."))
    }

    return (
        <label>
            <span>코드</span>
            <input type="email" name = "email" placeholder="코드입력" autoComplete="off" onChange={handleCodeChange}/>
            <button id = "emailBtn" type="button" onClick = {chkCode}>확인</button>
            {isError && <ErrorTooltip content = {content}></ErrorTooltip>}
        </label>
    );

}
function UserEmail(props) {

    const dispatch = useDispatch();

    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    const [isError, setIsError] = useState(false);
    const [codeDisplay, setCodeDisplay] = useState(false);
    const [isDisabled , setIsDisabled] = useState(true);

    let content = "이메일 형태로 입력해주세요."
    let inputEmail;
    const validationEmail = (event) => {

        inputEmail = event.target.value;
        dispatch(updateInput(inputEmail));

        if(regExp.test(inputEmail)){
            setIsError(false);
            setIsDisabled(false);

        } else {
            setIsError(true);
            setIsDisabled(true);
        }
    }

    const sendEmailCode = () => {

        axios.get('/api/email/sendChkEmail',{params : {email : inputEmail}})
            .then( response =>   setCodeDisplay(response.data))
            .catch(error => alert("에러가 발생했습니다 잠시후에 시도해주세요."))
    }

    return (
        <div className="signup_form_columnTwo">
            <label>
                <div>
                    <span>이메일</span>
                    {codeDisplay && <Counter></Counter>}
                </div>
                <input type="email" name = "email" placeholder="이메일 입력" autoComplete="off" onChange={validationEmail}/>
                <button id = "emailBtn" type="button" disabled= {isDisabled} onClick={sendEmailCode}>인증하기</button>
            </label>
            {isError && <ErrorTooltip content = {content}></ErrorTooltip>}
            {codeDisplay && <ChkEmailCode></ChkEmailCode>}
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

function UserName(props) {

    const [isError, setIsError] = useState(false);
    let content = "이름을 입력해주세요."

    const userNameClass = isError ?  "name_input_error" : "name_input";
    const validationName = (event) => {

        let inputName = event.target.value;

        if(inputName.trim() === ''){
            setIsError(true);
        } else {
            setIsError(false);
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
function Signup(props) {

    return (
        <main>
            <div className="signup_container">
                <div className="signup_formwrapper">
                    <h1>회원가입</h1>
                    <form>
                        <fieldset>
                            <UserName></UserName>
                            <UserEmail></UserEmail>
                            <div className="signup_form_columnThree">
                                <label>
                                    <span>비밀번호</span>
                                    <em>비밀번호는 8~20자 영문, 숫자, 특수문자로 입력하세요</em>
                                    <input type="password" name = "password" placeholder="비밀번호 입력" autoComplete="off" maxLength="20"/>
                                </label>
                            </div>
                            <div className="signup_form_columnFour">
                                <input type="password" name = "password" placeholder="비밀번호 확인" autoComplete="off" maxLength="20"/>
                            </div>

                        </fieldset>
                        <button type="submit" disabled>다음</button>
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