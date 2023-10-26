import React from 'react';
import Typist from 'react-typist';
import atelierForestLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-forest-light';
import SyntaxHighlighter from 'react-syntax-highlighter';
const TypingAi = ({sql}) => {
    return (
        <div>
            <Typist >

                <SyntaxHighlighter style={atelierForestLight} lineNumberContainerStyle={{ backgroundColor: "white", fontSize: '10px' }} showLineNumbers language="sql" customStyle={{ margin: '3px', borderRadius: '8px', fontSize: '14px', textAlign: 'justify', color: '#0DD1ADE8', backgroundColor: 'white' }}>
                    {sql}
                </SyntaxHighlighter>
                <Typist.Delay ms={10} />

            </Typist>
        </div>
    );
};

export default TypingAi;