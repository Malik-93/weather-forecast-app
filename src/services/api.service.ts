const postRequest = async (url: string = '', body: Object = {}, onSuccess: (data: any) => void, onError: (error: Error | TypeError | any) => void) => {
    try {
        const resposne = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        });
        const data = await resposne.json();
        onSuccess(data);
    } catch (error) {
        onError(error)
    }

}
const getRequest = async (url: string = '', onSuccess: (data: any) => void, onError: (error: Error | TypeError | any) => void) => {
    try {
        const resposne = await fetch(url);
        console.log('[getRequest].resposne', resposne);
        const data = await resposne.json();
        console.log('[getRequest].data', data);
        onSuccess(data);
    } catch (error) {
        console.log('[getRequest].error', error);
        onError(error)
    }
}

export {
    postRequest,
    getRequest
}