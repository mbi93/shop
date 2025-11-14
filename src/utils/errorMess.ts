export default function errorMess(error:any) {
    const response = error.response?.data;
    let text = '';
    for (const key in response) {
        if (key && Array.isArray(response[key])) {
            text += response[key][0]
        } 
        else if (key) {
            text += response[key]
        }
    }
    return text
}