function requestData(url) {
    let data;

    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.onreadystatechange = function () {
        if(request.readyState === 4) {
            if(request.status === 200 || request.status == 0) {
                data = request.responseText;
                data = JSON.parse(data);
            }
        }
    };
    request.send(null);

    return data.data;
}

module.exports = requestData;