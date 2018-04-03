// var recipes = ["Chicken Parm", "Lasagna"];
var recipes = [];

function displayRecipeInfo() {
 console.log(this);
    var recipe = $(this).attr("data-name");
    var queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=767cd386&_app_key=" +
        "82a2adbda2618297314b0af2e488f406&q=" + recipe + "&requirePictures=true&maxResult=8&start=8&source=true";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        response.matches.forEach( function (item)  {
            var recipeDiv = $("<div class='recipe'>");

        var dishName = item.recipeName;

        var pOne = $("<p>").text("Name: " + dishName);

        recipeDiv.append(pOne);

        if (item.numberOfServings) {
            var numberServings = item.numberOfServings;

            var pTwo = $("<p>").text("Servings: " + numberServings);

            recipeDiv.append(pTwo);
        }

        var ingredients = item.ingredients;

        var pThree = $("<p>").text("Ingredients: " + ingredients);

        recipeDiv.append(pThree);

        var creator = item.sourceDisplayName;

        var pFour = $("<p>").text("Created By : " + creator);

        recipeDiv.append(pFour);

        var source = item.sourceRecipeUrl;

        var pFive = $("<p>").text("Url: " + source);

        recipeDiv.append(pFive);

        var imageURL = item.smallImageUrls[0];

        var image = $("<img>").attr("src", imageURL);

        recipeDiv.append(image);


        // $("#recipe-view").text(JSON.stringify(response));
        $("#recipe-view").append(recipeDiv);

    });

        console.log(response.matches);




        // renderButtons();
    });
}

function renderButtons() {

    // Deleting the buttons prior to adding new recipes
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of recipes
    for (var i = 0; i < recipes.length; i++) {

        // Then dynamically generating buttons for each recipe in the array

        var a = $("<button>");
        // Adding a class of recipe to our button
        a.addClass("recipe-btn");
        // Adding a data-attribute
        a.attr("data-name", recipes[i]);
        // Providing the initial button text
        a.text(recipes[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-recipe").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var recipe = $("#recipe-input").val().trim();

    // Adding the recipe from the textbox to our array
    recipes.push(recipe);
    console.log(recipes);

    // Calling renderButtons which handles the processing of our recipe array
    renderButtons();
});

// Function for displaying the recipe info
// Using $(document).on instead of $(".recipe-btn").on to add event listeners to dynamically generated elements
$(document).on("click", ".recipe-btn", displayRecipeInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();