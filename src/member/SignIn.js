import {useDispatch, useSelector} from "react-redux";
import './SignIn.css';
import axios from "axios";


function UserPwd(props) {

    return (
        <div className="signin_form_columnThree">
            <label>
                <span>비밀번호</span>
                <input type="password" name = "password" placeholder="비밀번호 입력" autoComplete="off" maxLength="20"/>
            </label>
        </div>
    );
}
function UserEmail(props) {

    return (
        <div className="signin_form_columnTwo">
            <label>
                <div className="email_container">
                    <span>이메일</span>
                </div>
                <input type="email" name = "email" placeholder="이메일 입력" autoComplete="off"/>
            </label>
        </div>
    );
}
function SignIn(props) {

    const handleSubmit = e => {
        e.preventDefault();

        // 로그인
        /*
        axios.post('/api/member/signin',{
            email : email,
            name : name,
            pwd : pwd})
            .then( function (response){
                console.log(response);
            })
            .catch(error => alert("에러가 발생했습니다 잠시후에 시도해주세요."))
            */
    }
    return (
        <main>
            <div className="signin_container">
                <div className="signin_formwrapper">
                    <h1>로그인</h1>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <UserEmail></UserEmail>
                            <UserPwd></UserPwd>
                        </fieldset>
                        <button  type="submit">로그인</button>
                        <div className="signin_form_signin">
                            <p>WEE!가 처음이신가요?</p>
                            <a href="/signup">회원가입</a>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default SignIn;