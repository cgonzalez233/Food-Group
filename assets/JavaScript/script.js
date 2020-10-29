const RECIPEAPIKEY = `d7ff51b2246ccf813a3815611cf0417a`;
const RECIPEAPIID = `3377a3e7`;
const SEARCHBAR = $("#userRecipeSearch");
const SEARCHBUTTON = $(".searchBtn");
const CARDSHOW = $(".cardShow");
const RECIPECARDDIV = $(".recipeCard");
const HOMEBTN = $(".homeBtn");
const FAVBTN = $(".favorites");
const HISTBTN = $(".history");
const INGREDIENTSBTN = $(".ingredientsBtn");
const GROCERYBTN = $(".groceryBtn");
const ADDFAVBTN = $(".addFavBtn");
const FAVMODAL = $(".favModal");
var favStorage = [];

// Nav
$(document).ready(function () {
    // materialize js fires
    $(".sidenav").sidenav();
    $(".modal").modal();
    M.updateTextFields();
    setFavModal();

    SEARCHBUTTON.on("click", basicCall);

    // runs on search click
    function basicCall(e) {
        e.preventDefault();
        let userSearch = SEARCHBAR.val();
        SEARCHBAR.empty();
        CARDSHOW.empty();
        // basic query search
        apiRecipeCall = `https://api.edamam.com/search?q=${userSearch}&app_id=${RECIPEAPIID}&app_key=${RECIPEAPIKEY}`;

        $.ajax({
            url: apiRecipeCall,
        }).then((response) => {
            // console.log(response);
            let hits = response.hits;
            // targets each recipe received and targets elements we need
            var i = 0;
            hits.forEach((hit, i) => {
                // console.log(hit);

                let recipeTitle = hit.recipe.label;
                let recipeImage = hit.recipe.image;
                let recipeTime = hit.recipe.totalTime;
                let recipeUrl = hit.recipe.url;
                let recipeServings = hit.recipe.yield;
                let recipeCalories = Math.round(hit.recipe.calories);

                // check to see if recipe has a time listed
                if (recipeTime === 0) {
                    recipeTime = "Time is not listed";
                    var showRecipeTime = `<p> Time to Cook: ${recipeTime}</p>`;
                } else {
                    var showRecipeTime = `<p> Time to Cook: ${recipeTime} minutes</p>`;
                }
                // calls healthFacts function and stores in healthReturn
                let healthReturn = getHealthFacts(hit);
                // console.log(healthReturn);

                // healthInfoValues
                let recipeFat = healthReturn[0].fat;
                let recipeCarbs = healthReturn[0].carbs;
                let recipeProtein = healthReturn[0].protein;
                let recipeCholesterol = healthReturn[0].cholesterol;

                var recipeh5 = $("<h5>");
                recipeh5.addClass("light");
                recipeh5.addClass(`recipeHeader${i}`);
                recipeh5.text(recipeTitle);

                var cardSize = $("<div>");
                cardSize.addClass("card large");

                var imageDiv = $("<div>");
                imageDiv.addClass("card-image");

                var cardImage = $("<img>");
                cardImage.addClass("responsive-img");
                cardImage.attr("src", recipeImage);
                cardImage.attr("alt", "Image Example");

                var cardContent = $("<div>");
                cardContent.addClass("card-content");

                var cardRecipe = $("<p>");
                cardRecipe.text(recipeUrl);

                var navTag = $("<nav>");

                var divWrap = $("<div>");
                divWrap.addClass("nav-wrapper teal");
                ``;

                var mobileDemo = $("<a>");
                mobileDemo.attr("href", "#");
                mobileDemo.attr("data-target", "mobile-demo2");
                mobileDemo.attr("class", "sidenav-trigger");

                var iTag = $("<i>");
                iTag.addClass("material-icons text-darken-5");
                iTag.text("more_horiz");

                var ulTag = $("<ul>");
                ulTag.addClass("right hide-on-med-and-down");

                var liIngredients = $("<li>");

                var liGrocery = $("<li>");

                var liFavorites = $("<li>");

                var aIngredients = $("<a>");
                aIngredients.addClass(
                    "ingredientsBtn waves-effect waves-light btn-small modal-trigger"
                );
                aIngredients.attr("href", "#modal1");
                aIngredients.text("Ingredients");

                var aGrocery = $("<a>");
                aGrocery.addClass(
                    "groceryBtn waves-effect waves-light btn-small modal-trigger"
                );
                aGrocery.attr("href", "#modal2");
                aGrocery.text("Grocery");

                var aFavorites = $("<a>");
                aFavorites.addClass(
                    `addFavBtn${i} waves-effect waves-light btn-small`
                );
                aFavorites.text("Add");

                var iFavorites = $("<i>");
                iFavorites.addClass("material-icons right");
                iFavorites.text("favorite");

                var sidenav = $("<ul>");
                sidenav.addClass("sidenav");
                sidenav.attr("id", "mobile-demo2");

                var liMobileRecipe = $("<li>");

                var liMobileIngredients = $("<li>");

                var liMobileGrocery = $("<li>");

                var liMobileFav = $("<li>");

                var h4Recipe = $("<h4>");
                h4Recipe.addClass("teal white-text center-align");
                h4Recipe.text("The Recipe");

                var aMobileIngredients = $("<a>");
                aMobileIngredients.addClass("modal-trigger");
                aMobileIngredients.attr("href", "#modal1");

                var aMobileGrocery = $("<a>");
                aMobileGrocery.addClass("modal-trigger");
                aMobileGrocery.attr("href", "#modal2");

                var aMobileFav = $("<a>");
                aMobileFav.attr("href", "#");
                aMobileFav.text("Add Fav");

                CARDSHOW.append(recipeh5, cardSize);
                cardSize.append(imageDiv, cardContent, navTag, sidenav);
                imageDiv.append(cardImage);
                cardContent.append(cardRecipe);
                navTag.append(divWrap);
                divWrap.append(mobileDemo, ulTag);
                mobileDemo.append(iTag);
                ulTag.append(liIngredients, liGrocery, liFavorites);
                liIngredients.append(aIngredients);
                liGrocery.append(aGrocery);
                liFavorites.append(aFavorites);
                aFavorites.append(iFavorites);

                sidenav.append(
                    liMobileRecipe,
                    liMobileIngredients,
                    liMobileGrocery,
                    liMobileFav
                );
                liMobileRecipe.append(h4Recipe);
                liMobileIngredients.append(aMobileIngredients);
                liMobileGrocery.append(aMobileGrocery);
                liMobileFav.append(aMobileFav);

                // $(document).on("click", `.addFavBtn${i}`, addFav);
                $(document).on("click", `.addFavBtn${i}`, function addFav() {
                    var favTarget = $(`.recipeHeader${i}`).text();
                    if (favTarget && favStorage.indexOf(favTarget) === -1) {
                        favStorage.push(favTarget);
                        localStorage.setItem(
                            "favorites",
                            JSON.stringify(favStorage)
                        );
                    }
                    setFavModal();
                });

                // calls function to get the ingredients
                getIngredients(hit);
            });
            i++;
        });
    }

    // grabs ingredient info for each recipe
    function getIngredients(hit) {
        // console.log(hit);
        let ingredients = hit.recipe.ingredients;

        ingredients.forEach((ingredient) => {
            // console.log(ingredient);
            let ingredientImage = ingredient.image;
            let ingredientText = ingredient.text;

            // check to see if the ingredient has a picture
            if (ingredientImage === null) {
                // console.log("This is Null");

                // picture to use if there isnt one available
                ingredientImage = `assets/images/noImageAvailable300.png`;
            }

            // creats elements for ingredients
            let showIngredientImage = `<img src="${ingredientImage}"</img>`;
            let showIngredientText = `<p>${ingredientText}</p>`;
        });
    }

    // grabs health facts we want from the array
    function getHealthFacts(hit) {
        // targets the digest array with contains the health facts
        let recipeHealthFacts = hit.recipe.digest;
        // return array
        let healthFacts = [];
        // object to push to return array
        let healthObj = {};

        recipeHealthFacts.forEach((healthFact) => {
            // console.log(healthFact);
            if (healthFact.label === "Fat") {
                let recipeFat = Math.round(healthFact.total);
                let healthUnit = healthFact.unit;
                recipeFat.toString();
                healthObj.fat = recipeFat + healthUnit;
            }

            if (healthFact.label === "Carbs") {
                var recipeCarbs = Math.round(healthFact.total);
                let healthUnit = healthFact.unit;
                recipeCarbs.toString();
                healthObj.carbs = recipeCarbs + healthUnit;
            }

            if (healthFact.label === "Protein") {
                let recipeProtein = Math.round(healthFact.total);
                let healthUnit = healthFact.unit;
                recipeProtein.toString();
                healthObj.protein = recipeProtein + healthUnit;
            }
            if (healthFact.label === "Cholesterol") {
                let recipeCholesterol = Math.round(healthFact.total);
                let healthUnit = healthFact.unit;
                recipeCholesterol.toString();
                healthObj.cholesterol = recipeCholesterol + healthUnit;
            }
        });

        // pushes to the return array
        healthFacts.push(healthObj);

        // returns an array of objects with healthFacts
        return healthFacts;
    }
});

function setFavModal() {
    FAVMODAL.empty();
    var favList = JSON.parse(localStorage.getItem("favorites")) || [];
    favStorage = favList;
    favList.forEach((favorite) => {
        var favListDisplay = generateFavList(favorite);
        FAVMODAL.append(favListDisplay);
    });
}
function generateFavList(favItem) {
    return $(`<a class= "collection-item" href = "#!"> ${favItem}</a>`);
}
