<SunEditor 
    setOptions={{
        buttonList: [
            ['undo', 'redo', 'removeFormat'],
            ['align', /* 'font', 'fontSize', */ 'fontColor', 'hiliteColor', 'formatBlock'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['image'],
            ['video'],
        ],
    }}
    onChange={(content) => {console.log(content)}} 
    width="100%" 
    height="1000px"
    setDefaultStyle="font-family: Arial, sans-serif; font-size: 18px;" 
/>