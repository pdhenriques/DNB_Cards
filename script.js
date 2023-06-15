
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

    const response = await fetch('https://vt8izmxwie.execute-api.eu-central-1.amazonaws.com/default/HoldMyCC', {
        method: 'POST',
        body: body,
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json();

    console.log(myJson);
}
