/*global chrome*/
/* eslint-disable no-undef */
import React,{useState,useEffect} from "react";
import SimpleMDE from "react-simplemde-editor";

const Editor = ()=>{
    const [notes, setNotes] = useState("")

    useEffect(()=>{
        chrome.storage.local.get('notestext', (res) =>{
            let txt = res.notestext || "Write something..."
            setNotes(txt)
        });
    },[])

    const onChange = (value) => {
        chrome.storage.local.set({'notestext': value});
        setNotes(value);
    };
    return <SimpleMDE value={notes} onChange={onChange} />
    
}

export default Editor