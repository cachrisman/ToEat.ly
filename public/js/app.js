// on page load
$(function() {
    // get and render the food
    Food.all();
    //set event listeners
    View.init();
});

// // // // // // //

// VIEW OBJECT
function View() {}
View.render = function(items, parentId, templateId) {
    // render a template
    var template = _.template($("#" + templateId).html());
    // input data into template and append to parent
    $("#" + parentId).html(template({
        collection: items
    }));
};

View.init = function() {
    $('#food-form').on("submit", function(event) {
        event.preventDefault();
        // console.log($(this).serialize());
        $.post("/foods", $(this).serialize())
            .done(function(res) {
                Food.all();
                $('#food-form')[0].reset();
            });
    });
    // $('.close').on("click")
};

View.reset = function() {
  $('#food-form').off();
};
// FOOD OBJECT
function Food() {}

Food.all = function() {
    $.get("/foods", function(res) {
        // parse the response
        var foods = JSON.parse(res);
        // render the results
        View.render(foods, "food-ul", "foods-template");
    }).done(function(res){
      View.reset();
      View.init();
    });
};

Food.delete = function(item) {
    // console.log(item);
    // url = "/foods/:" + $(item).attr("data-id");
    url = "/foods/" + $(item).data().id;
    // console.log(url);
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(response) {
            console.log(response);
            Food.all();
        }
    });
};
