import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMCE = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    return (
        <>
            <>
                <Editor
                    apiKey="3qbmgq849vj55cwykzp3mu8glhfo78cffzbbjffp84hrh4gc"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="<p></p>"
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                />
                <button onClick={log}>Log editor content</button>
            </>
        </>
    );
};

export default TinyMCE;
