//https://rapidapi.com/armangokka/api/translo
//https://rapidapi.com/apininjas/api/nutrition-by-api-ninjas/

export function getTranslation(sentence)
{   
    const encodedParams = new URLSearchParams();
    encodedParams.append("from", "sv");
    encodedParams.append("to", "en");
    encodedParams.append("text", sentence);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '918ec6b019msh24fbbf1db4553c5p19d446jsn8a94c8d805f1',
            'X-RapidAPI-Host': 'translo.p.rapidapi.com'
        },
        body: encodedParams
};

return fetch('https://translo.p.rapidapi.com/api/v3/translate', options)
	.then(function(response){
        return response.json();
    })
	.then(function(response){
        return response;
    })
	.catch(err => console.error(err));
}

export function getFoodData(sentence)
{
        sentence.replace(" ","%20");
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '918ec6b019msh24fbbf1db4553c5p19d446jsn8a94c8d805f1',
            'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
        }
    };
    
    return fetch('https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=' + sentence, options)
        .then(function(response){
            return response.json()
        })
        .then(function(response){
            return response;
        })
        .catch(err => console.error(err));
}

export function test()
{
    return 5;
}