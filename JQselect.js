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
noresults: 'no results',
null: "all items",
onSave: function() { return null; },
onChange: function() { return null; },
onShow: function() { return null; },
onHide: function() { return null; },
}

var plugin = this;
plugin.settings = $.extend({}, defaults, settings);


let value = [];
var onSave = plugin.settings.onSave;
var onChange = plugin.settings.onChange;
var onShow = plugin.settings.onShow;
var onHide = plugin.settings.onHide;
// code goes here
let footerAction = '';
if(plugin.settings.action == true){
footerAction = '<span class="abort">'+plugin.settings.label.abort+'</span><span class="success">'+plugin.settings.label.save+'</span>';
}
let start = '<div class="input-search" data-title="'+plugin.settings.title+'"><div class="inside"></div><div class="input-modal"><div class="input-select"></div>';
let end = footerAction+'</div></div></div>';
let rep =  $(element)
.clone()
.wrap('<div></div>')
.parent().html()
.replace(/select/g,'ul')
.replace(/uled/g,'selected')
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
var selected = "";
if ($(selector+" li").attr('selected')){
selected = $(selector+" li[selected]").text();
}
if ($(element).attr("multiple")){
$(selector).parent().parent().parent().find(".input-search").find(".inside").text(plugin.settings.null);
}
else
{
$(selector).parent().parent().parent().find(".input-search").find(".inside").text(selected);
}
$(selector).parent().parent().find(".input-modal ul").append('<div class="no-entrys">'+plugin.settings.noresults+'</div>');

var state = 0;
$(selector).parent().parent().parent().find(".input-search").find(".inside").click(function() {
  if(state == 0){
  $(selector).parent().addClass( "active" );
  open($(selector).parent());
  onShow.call(this);
  state = 1;
  }
  else
  {
    state = 0;
    $(selector).parent().removeClass( "active" );
  onHide.call(this);
  }
});


function open(selectID){
$(selectID).find("ul li").each(function() {
$(selectID).find("ul").find(".no-entrys").hide();
});
$(selectID).find(".input-select input").val("");
if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  $(selectID).find(".input-select input").focus();
 }
$(selectID).parent().find(".input-select input").keyup(function() {
var filter = $(this).val();
count = 0;
$(selector).find("li").each(function() {
if ($(selectID).text().search(new RegExp(filter, "i")) < 0) {
$(this).hide(); 
} else {

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
}

$(selector).find("li").each(function() {
  if ($(element).attr("multiple")){
    $(this).append('<span class="select_icon"></span>');
  }
if( $(this).attr("selected") === "selected"){
value = [$(this).attr('value')];
update();
}
$(this).on("click", function(){
$(selector).find("li").attr('selected', false);
$(selector).find("li").find("span").addClass('selected');
if ($(element).attr("multiple")){
  if(value.includes($(this).attr('value')) ){
    removeItem(value, $(this).attr('value'));
  }
  else
  {
    value.push($(this).attr('value'));
  }
}
else
{
value = [$(this).attr('value')];
}

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
$(selector).parent().parent().find(".input-modal").find(".abort, .success").on("click" ,function(){
$(this).parent().parent().find(".input-modal").removeClass("active");
update();
});

$(selector).parent().on("click", ".success", function(){
  $(this).parent().parent().find(".input-modal").removeClass("active");
onSave.call(this, value);
});

$(document).mouseup(function(e) 
{
var container = $(selector).parent().parent().find(".input-modal");
if (!container.is(e.target) && container.has(e.target).length === 0) 
{
container.removeClass("active");
}
});

function update(){
$(selector).find("li").each(function() {
$(this).attr('selected', false);
$(this).find("span").removeClass('selected');
for (let x = 0; x < value.length; x++) {
if(parseInt(value[x]) == parseInt($(this).attr("value"))){
$(this).attr('selected', true);
$(this).find("span").addClass('selected');
}
}

});

$(selector).find("li").each(function() {

  if(value.length <= 0){
    $(selector).parent().parent().parent().find(".input-search").find(".inside").text(plugin.settings.null);
  }
  if ( value.length <= 1){
    if(parseInt(value[0]) == parseInt($(this).attr("value"))){
      $(selector).parent().parent().parent().find(".input-search").find(".inside").text($(this).text());
      }
  }
  else
  {
for (let x = 0; x < value.length; x++) {
if(parseInt(value[x]) == parseInt($(this).attr("value"))){
$(selector).parent().parent().parent().find(".input-search").find(".inside").html('<span class="length">'+value.length +'</span> '+ plugin.settings.label.plural);
}
}
  }
});
onChange.call(this, value);
}

function removeItem(array, item){
  for(var i in array){
      if(array[i]==item){
          array.splice(i,1);
          break;
      }
  }
}


};
})(jQuery);