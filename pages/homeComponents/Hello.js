import React from 'react';

const Hello = () => {
    return (
        <div onClick={() => console.log("OK")}>
            Hello
        </div>
    );
};

export default Hello;