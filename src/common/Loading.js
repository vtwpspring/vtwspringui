import React from 'react';

import {Background, LoadingText} from './Styles';
export default () => {
    return (
        <Background>
            <img src={`${process.env.PUBLIC_URL}/gif/loading.gif`} alt="로딩" />
        </Background>
    );
};