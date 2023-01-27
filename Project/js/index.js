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

/*When food is clicked then check which element was klicked and extract food name from that element
 and find matching <ul> to display using style.visibility */ 
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
                if(clicked_element_color != "orange") clicked_element.style.color = "orange";
                else clicked_element.style.color = "white";

                contents.removeChild(element);
                contents.insertBefore(element,contents.childNodes[0])
            }
        }
    }
}

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