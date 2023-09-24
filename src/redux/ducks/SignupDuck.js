
// 액션 타입 정의
const INPUT_NAME = 'signup/INPUT_NAME';
const INPUT_EMAIL = 'signup/INPUT_EMAIL';
const STATE_EMAIL_BTN = 'signup/STATE_EMAIL_BTN';
const STATE_EMAIL = 'signup/STATE_EMAIL';
const STATE_CODE = 'signup/STATE_CODE';
const STATE_CODE_BTN = 'signup/STATE_CODE_BTN';
const STATE_PWD = 'signup/STATE_PWD';
const INPUT_PWD = 'signup/INPUT_PWD';
const STATE_PWD_CHK =  'signup/STATE_PWD_CHK';
const STATE_NEXT_BTN =  'signup/STATE_NEXT_BTN';
// 액션 생성자 함수
// 액션 생성자 함수 정의
export const updateName  = (value) => ({
    type: INPUT_NAME,
    payload: value,
});

export const updateInput  = (value) => ({
    type: INPUT_EMAIL,
    payload: value,
});

export const stateBtnEmail = (value) => ({
   type: STATE_EMAIL_BTN,
   payload: value
});

export const stateEmail = (value) => ({
    type: STATE_EMAIL,
    payload: value
});

export const stateCode = (value) => ({
    type: STATE_CODE,
    payload: value
});
export const stateCodeBtn = (value) => ({
    type: STATE_CODE_BTN,
    payload: value
});
export const statePwd = (value) => ({
    type: STATE_PWD,
    payload: value
});
export const pwdInput = (value) => ({
    type: INPUT_PWD,
    payload: value
});
export const statePwdChk = (value) => ({
    type: STATE_PWD_CHK,
    payload: value
});
export const stateBtnNext = (value) => ({
    type: STATE_NEXT_BTN,
    payload: value
});


// 초기 상태
const initialState = {
    name : '',
    email: '',
    emailBtnState : true,
    emailState : true,
    codeState : true,
    codeBtnState : true,
    pwdState : true,
    pwd : '',
    pwdChkState : true,
    nextBtnState : true,
};

// 리듀서
export default function singupReducer(state = initialState, action) {
    switch (action.type) {
        case INPUT_NAME:
            return { ...state, name: action.payload };
        case INPUT_EMAIL:
            return { ...state, email: action.payload };
        case STATE_EMAIL_BTN:
            return { ...state, emailBtnState: action.payload };
        case STATE_EMAIL:
            return { ...state, emailState: action.payload };
        case STATE_CODE:
            return { ...state, codeState: action.payload };
        case STATE_CODE_BTN:
            return { ...state, codeBtnState: action.payload };
        case STATE_PWD:
            return { ...state, pwdState: action.payload };
        case INPUT_PWD:
            return { ...state, pwd: action.payload };
        case STATE_PWD_CHK:
            return { ...state, pwdChkState: action.payload };
        case STATE_NEXT_BTN:
            return { ...state, nextBtnState: action.payload };
        default:
            return state;
    }
}