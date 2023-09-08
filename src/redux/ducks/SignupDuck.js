
// 액션 타입 정의
const INPUT_EMAIL = 'signup/INPUT_EMAIL';

// 액션 생성자 함수
// 액션 생성자 함수 정의
export const updateInput  = (value) => ({
    type: INPUT_EMAIL,
    payload: value,
});
// 초기 상태
const initialState = {
    email: '',
};

// 리듀서
export default function singupReducer(state = initialState, action) {
    switch (action.type) {
        case INPUT_EMAIL:
            return { ...state, email: action.payload };
        default:
            return state;
    }
}