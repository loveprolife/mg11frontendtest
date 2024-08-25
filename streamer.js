let server_url = 'https://mgtest.learntech123.com/api/v1/agents/chat_draft'
function get_agent_id(model_type){
    if(model_type === '1'){
        return 101
    }
    if(model_type === '2'){
        return 102
    }
    if(model_type === '3'){
        return 103
    }
    if(model_type === '4'){
        return 104
    }
    if(model_type === '5'){
        return 105
    }
    if(model_type === '6'){
        return 106
    }
}
async function readChatbotReply(model_type, url, content, func) {
    if(content.length > 0){
        const response = await fetch(server_url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            timeout: 15000,
            mode: "cors",
            body: JSON.stringify({'agent_id': get_agent_id(model_type), 'sentence': content})
        });
        const readableStream = response.body;
        if (readableStream) {
            const reader = readableStream.getReader();
            let first = true
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    break;
                }
                const chunkValue = new TextDecoder().decode(value)
                console.log("chunkValue: ", chunkValue)
                console.log("typeof chunkValue: ", typeof chunkValue)
                if(model_type === "2" || model_type === "4" || model_type === "6"){
                    let tmp = JSON.parse(chunkValue);
                    func(first, tmp["msg"])
                }else{
                    func(first, chunkValue)
                }
                first = false
            }
            reader.releaseLock();
        }
    }
}
