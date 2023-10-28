import React from 'react';
import Typist from 'react-typist';
import atelierForestLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-forest-light';
import SyntaxHighlighter from 'react-syntax-highlighter';
import CodeEditor from './CodeEditor';
const TypingAi = ({ sql, setIa }) => {
    return (
        <div>
            <Typist >

                {/* <CodeEditor ia={sql} setIa={setIa} /> */}
                <Typist.Delay ms={10} />

            </Typist>
        </div>
    );
};

export default TypingAi;