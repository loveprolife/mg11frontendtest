let server_url = 'https://mgtest.learntech123.com/api/v1/agents/test_streaming?prompt='
async function readChatbotReply(url, content, func) {
    console.log(content.length);
    if(content.length > 0){
        const response = await fetch(server_url + content, {
            method: 'GET',
            timeout: 15000,
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
                const chunkValue = new TextDecoder().decode(value);
                func(first, chunkValue)
                first = false
            }
            reader.releaseLock();
        }
    }
}
