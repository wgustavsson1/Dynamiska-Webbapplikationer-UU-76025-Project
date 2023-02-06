import {getTranslation,getFoodData,test} from './api.js';

const marked_color = "#F4B942";
var foods = [];

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

        //TODO: Change back to translated_text when API is online again
        getFoodData("mushrooms and ham and cheese and bread").then(function(food){
            display_food(food);
        });
    });
}

/*When food is clicked then check which element was klicked and extract food name from that element
 and find matching <ul> to display using style.visibility */ 
/*
 function food_clicked(e)
{
    const clicked_element = e.srcElement;
    const food_name = clicked_element.innerHTML;
    console.log("klicked " + food_name)
    const contents = document.getElementById("contents")
    for(var child in contents.childNodes)
    {
        const element = contents.childNodes[child]
        if(element.nodeName == "UL")
        {
            const list_items = element.childNodes;
            const list_item_name = list_items[0]
            const name = list_item_name.firstChild.innerHTML;
            console.log(name)
            if(name == food_name)
            {

                const display = element.style.display;
                if(display == "none") element.style.display = "block"
                else element.style.display = "none"

                const clicked_element_color = clicked_element.style.color;
                if(clicked_element_color != "#F4B942") clicked_element.style.color = "F4B942";
                else clicked_element.style.color = "white";

                contents.removeChild(element);
                contents.insertBefore(element,contents.childNodes[0])
            }
        }
    }
}*/

function food_clicked(e)
{
    const clicked_element = e.srcElement;
    const food_name = clicked_element.innerHTML;
    const contents = document.getElementById("contents")

    console.log("klicked " + food_name)
    foods.forEach(food => {
        if(food.name == food_name)
        {
            const element = food.element;
            const display = element.style.display;
            if(display == "none") element.style.display = "block"
            else element.style.display = "none"

            const clicked_element_color = clicked_element.style.color;
            if(clicked_element_color != "#F4B942") clicked_element.style.color = "#F4B942";
            else clicked_element.style.color = "white";

            contents.removeChild(element);
            contents.insertBefore(element,contents.childNodes[0])
        }
    });
}

/*
function display_food(food)
{
    const result = document.getElementById("search-result-ul")
    result.innerHTML = ""; //Clear previous result
    const contents = document.getElementById("contents")
    contents.innerHTML = ""//Clear previous result
    console.log(food)
    food.forEach(f => {
        const new_li = document.createElement("li");
        new_li.innerHTML = f.name;
        new_li.addEventListener("click",food_clicked)
        result.append(new_li)
        
        const new_ul = document.createElement("ul");
        contents.append(new_ul);
        //Create UL for every food containing nutrition
        for(var key in f)
        {
            var new_content_li = document.createElement("li");
            if(key == 'name')
            {
                var name_h4 = document.createElement("h4");
                name_h4.innerHTML = f[key]
                new_content_li.append(name_h4)
            }
            else
            {
                new_content_li.innerHTML = key + ": " + f[key];
            }
            new_ul.append(new_content_li);
            new_ul.style.display = "none"
        }
    });
}
*/

function display_food(food)
{
    const result = document.getElementById("search-result-ul")
    result.innerHTML = ""; //Clear previous result
    const contents = document.getElementById("contents")
    contents.innerHTML = ""//Clear previous result
    console.log(food)
    food.forEach(f => {
        
        const new_li = document.createElement("li");
        new_li.innerHTML = f.name;
        new_li.addEventListener("click",food_clicked)
        result.append(new_li)
        
        const new_ul = document.createElement("ul");
        contents.append(new_ul);

        const new_food = new Food(new_ul,f.name,f.calories,f.serving_size_g,f.fat_total_g,f.fat_saturated_g,f.protein_g,
            f.sodium_mg,f.potassium_mg,f.cholesterol_mg,f.carbohydrates_total_g,f.fiber_g,f.sugar_g)
        foods.push(new_food);
        console.log(new_food);
        //Create UL for every food containing nutrition
        for(var key in f)
        {
            var new_content_li = document.createElement("li");
            if(key == 'name')
            {
                var name_h4 = document.createElement("h4");
                name_h4.innerHTML = f[key]
                new_content_li.append(name_h4)
            }
            else
            {
                new_content_li.innerHTML = key + ": " + f[key];
            }
            new_ul.append(new_content_li);
            new_ul.style.display = "none"
        }
    });
}

class Food
{
    constructor(element,name,calories,serving_size,fat_total,fat_saturated,protein,sodium,potassium,cholestrol,carbs,fiber,sugar)
    {
        this.element = element; //HTML UL element where food is displayed
        this.name = name;
        this.calories = calories;
        this.serving_size = serving_size;
        this.fat_total = fat_total;
        this.fat_saturated = fat_saturated;
        this.protein = protein;
        this.sodium = sodium;
        this.potassium = potassium;
        this.cholestrol = cholestrol;
        this.carbs = carbs;
        this.fiber = fiber;
        this.sugar = sugar;
    }
}