import {getTranslation,getFoodData,test} from './api.js';

function find_food(sentence)
{
    getTranslation(sentence).then(function(translated){
        const translated_text = translated.translated_text
        getFoodData(translated_text).then(function(food){
            console.log(food);
        });
    });
}

find_food("blåbärspaj med lingonsylt och gräddfil");
