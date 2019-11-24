(function($){
	$.fn.jQselect = function(settings) {
      var element = $(this);

    var defaults = {
      select: null,
        title: null,
        label:{
            abort:'Abort',
            save: 'Save',
            single: 'item',
            plural: 'items',
        },
        action: true,
        livesearch: true,
        searchtext: 'search...',
        noresults: 'no results'
    }

    var plugin = this;
    plugin.settings = $.extend({}, defaults, settings);
      // code goes here
  let footerAction = '';
  if(plugin.settings.action == true){
  footerAction = '<span class="abort">'+plugin.settings.label.abort+'</span><span class="success">'+plugin.settings.label.save+'</span>';
  }
  let start = '<div class="input-search" data-title="'+plugin.settings.title+'"></div><div class="input-modal"><div class="input-select"></div>';
  let end = footerAction+'</div></div>';
  let rep =  $(element)
  .clone()
  .wrap('<div></div>')
  .parent().html()
  .replace(/select/g,'ul')
  .replace(/optgroup/g,"span")
  .replace(/option/g,"li");
  $(element).replaceWith(start + rep + end);
  let selector = null;

  if($(rep).attr('class')){
    selector = "."+$(rep).attr('class');
  }
  else
  {
    selector = "#"+$(rep).attr('id');
  }

  var selected = $(selector + " > li:first").text();
  $(selector + " > li:first").attr('selected', "true");
  $(selector).parent().parent().find(".input-search").text(selected);
  $(selector).parent().parent().find(".input-modal ul").append('<div class="no-entrys">'+plugin.settings.noresults+'</div>');
  $(selector).parent().parent().on("click", function(e){
    $(this).find(".input-modal ul li").each(function() {
    $(this).show();
    $(this).parent().find(".no-entrys").hide();
  });
    e.preventDefault();
    $(this).find(".input-modal").css("display", "block");
    $(this).find(".input-select input").val("");
    $(this).find(".input-select input").focus();
    $(this).find(".input-select input").keyup(function() {
        var filter = $(this).val();
          count = 0;
          $(selector).find("li").each(function() {
          if ($(this).text().search(new RegExp(filter, "i")) < 0) {
            $(this).hide(); 
          } else {
            $(this).show(); // MY CHANGE
            count++;
          }
        });
        if(count === 0 ){
          $(selector).find(".no-entrys").show();
        }
        else
        {
         $(selector).find(".no-entrys").hide();
        }
      });
});

let value = [];

$(selector).find("li").each(function() {
  $(this).on("click", function(){
    $(selector).find("li").attr('selected', false);
    if ($(element).attr("multiple")){
    value.push($(this).attr('value'));
    }
    else
    {
      value = [$(this).attr('value')];
    }
    onChange.call(this, value);
    update();
  });
});
  let innerHtml = '<input class="input-select-search" type="text"><div data-list=""></div>';
  if(plugin.settings.livesearch === true){
    $(selector).parent().find(".input-select").html(innerHtml);
  if(plugin.settings.searchtext.length > 0){
    $(selector).parent().find(".input-select").find(".input-select-search").attr("placeholder", plugin.settings.searchtext);
  }
  }
$(document).on("click",".abort, .success",function(){
  $(selector).parent().parent().find(".input-modal").css("display", "none");
});

$(selector).parent().on("click", ".success", function(){
$(this).parent().hide();
  update();
  $(selector).find("li").each(function() {
    for (let x = 0; x < value.length; x++) {
      if(parseInt(value[x]) == parseInt($(this).attr("value"))){
       $(selector).parent().parent().find(".input-search").text($(this).text());
    }
  }
  });
});


$(document).mouseup(function(e) 
{
    var container = $(selector).parent().parent().find(".input-modal");
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.hide();
    }
});


var onChange = settings.onChange;
var onShow = settings.onShow;
var onClick = settings.onClick;

function update(){
  $(selector).find("li").each(function() {
    $(this).attr('selected', false);
    for (let x = 0; x < value.length; x++) {
      if(parseInt(value[x]) == parseInt($(this).attr("value"))){
        $(this).attr('selected', true);
    }
  }
  });
}

	};
})(jQuery);