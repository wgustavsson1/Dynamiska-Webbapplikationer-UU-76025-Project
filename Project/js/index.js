import {getTranslation,getFoodData,test} from './api.js';

const MARKED_COLOR_HEX = "#F4B942";
const MARKED_COLOR_RGB = "rgb(244, 185, 66)";
const UNMARKED_COLOR_HEX = "#6FCF97";
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
        getFoodData(sentence).then(function(food){
            display_food(food);
        });
    });
}

function food_clicked(e)
{
    const clicked_element = e.srcElement;
    const food_name = clicked_element.innerHTML;
    const contents = document.getElementById("contents")

    foods.forEach(food => {
        if(food.name == food_name)
        {
            const element = food.element;
            const display = element.style.display;
            if(display == "none") element.style.display = "block"
            else element.style.display = "none"

            const clicked_element_color = clicked_element.style.color;
            if(clicked_element_color != MARKED_COLOR_HEX && clicked_element_color != MARKED_COLOR_RGB) 
                clicked_element.style.color = MARKED_COLOR_HEX;
            else clicked_element.style.color = UNMARKED_COLOR_HEX;

            contents.removeChild(element);
            contents.insertBefore(element,contents.childNodes[0])
        }
    });
}

function display_food(food)
{
    const result = document.getElementById("search-result-ul")
    result.innerHTML = ""; //Clear previous result
    const contents = document.getElementById("contents")
    contents.innerHTML = ""//Clear previous result
    foods = []; //Clear foods list
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

        create_food_ul(new_food);
    });
}

function create_food_ul(food)
{
    var new_food_li = document.createElement("li");
    var name_h4 = document.createElement("h4");
    name_h4.innerHTML = food.name;
    new_food_li.append(name_h4);
    food.element.append(new_food_li);
    food.element.style.display = "none"

    for(var key in food.nutrition)
    {
        var new_food_li = document.createElement("li");
        new_food_li.innerHTML = food.nutrition[key].desc + " : " + food.nutrition[key].value;
        food.element.append(new_food_li);
        food.element.style.display = "none"
    }
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

        this.nutrition = {};
        this.nutrition["serving_size"] = {desc:"Portionsstorlek (g)",value:this.serving_size};
        this.nutrition["calories"] = {desc:"Kalorier (Kcal)",value:this.calories};
        this.nutrition["fat_total"] = {desc:"Fett totalt (g)",value:this.fat_total};
        this.nutrition["fat_saturated"] = {desc:"Mättat fett (g)",value:this.fat_saturated};
        this.nutrition["carbs"] = {desc:"Kolhydrater (g)",value:this.carbs};
        this.nutrition["protein"] = {desc:"Protein (g)",value:this.protein};
        this.nutrition["cholestrol"] = {desc:"Kolestrol (mg)",value:this.cholestrol};
        this.nutrition["sodium"] = {desc:"Natrium (mg)",value:this.sodium};
        this.nutrition["potassium"] = {desc:"Kalium (mg)",value:this.potassium};
        this.nutrition["fiber"] = {desc:"Fiber (g)",value:this.fiber};
        this.nutrition["sugar"] = {desc:"Socker (g)",value:this.sugar};
    }
}