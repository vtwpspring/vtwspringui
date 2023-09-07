import React from 'react';
import axios from "axios";

function test(){
    axios.get("/api/test")
        .then(response =>
            console.log("잉")
        )
        .catch(error => alert("좌석 예약중 오류가 발생했습니다 다시 시도해주세요."));
}

function MainIndex(props) {
    return (
        <div>
            <input type="button" onClick = {test} value="테스트"/>
        </div>
    );
}

export default MainIndex;