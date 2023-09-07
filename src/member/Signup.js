import React from 'react';

function Signup(props) {
    return (
        <main>
            <div className="signup_container">
                <div className="signup_formwrapper">
                    <h1>회원가입</h1>
                    <form>
                        <fieldset>
                            <legend>회원가입</legend>
                            <div className="signup_form_columnOne">
                                <label>
                                    <span>이름</span>
                                    <input type="text" name = "name" placeholder="이름 입력" autoComplete="off"/>
                                </label>
                            </div>
                            <div className="signup_form_columnTwo">
                                <label>
                                    <span>이메일</span>
                                    <input type="email" name = "email" placeholder="이메일 입력" autoComplete="off"/>
                                </label>
                            </div>
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
                        <button type ="submit"> 다음</button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Signup;