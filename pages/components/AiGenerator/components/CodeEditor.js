import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
export default function CodeEditor({ia,setIa}) {
    return <Editor height="60vh"  onClick={()=>console.log(ok)} onChange={(value)=>setIa(value)} defaultLanguage="sql" value={ia}  />;
}