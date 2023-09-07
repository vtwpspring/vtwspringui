
// 액션 타입 정의
const OPEN_MODAL = 'modal/OPEN_MODAL';
const CLOSE_MODAL = 'modal/CLOSE_MODAL';

// 액션 생성자 함수
export const openModal = () => ({ type: OPEN_MODAL });
export const closeModal = () => ({ type: CLOSE_MODAL });

// 초기 상태
const initialState = {
    isOpen: false,
};

// 리듀서
export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return { isOpen: true };
        case CLOSE_MODAL:
            return { isOpen: false };
        default:
            return state;
    }
}