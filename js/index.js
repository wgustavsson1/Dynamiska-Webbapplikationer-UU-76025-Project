import {getTranslation,getFoodData,test} from './api.js';

var submit_button = document.getElementById("search-form-submit-button");
submit_button.addEventListener("click", search);

export function search()
{
    var search_text =  document.getElementById("input-search").value;
    find_food(search_text)
}

function find_food(sentence)
{
    getTranslation(sentence).then(function(translated){
        const translated_text = translated.translated_text

        getFoodData(translated_text).then(function(food){
            display_food(food);
        });
    });
}

function display_food(food)
{
    const result = document.getElementById("search-result-ul")
    console.log(food)
    console.log(food)
    food.forEach(f => {
        const new_li = document.createElement("li");
        new_li.innerHTML = f.name;
        result.append(new_li)
        console.log(f)
    });
}