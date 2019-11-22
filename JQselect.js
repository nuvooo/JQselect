function SelectDropdown(para){

    defaults = {
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
        searchtext: null,
    }

    app = {
        title: defaults.title,
        abort: defaults.label.abort,
        save: defaults.label.save,
        single: defaults.label.single,
        plural: defaults.label.plural,
        action: defaults.action,
        livesearch: defaults.livesearch,
        searchtext: defaults.searchtext,
    }

    if(para.label){
    if(para.label.abort){ app.abort = para.label.abort; }; 
    if(para.label.save){ app.save = para.label.save; }; 
    if(para.label.single){ app.single = para.label.single; }; 
    if(para.label.plural){ app.plural = para.label.plural; }; 
}
    if(para.action === false){ app.action = para.action; }; 
    if(para.livesearch === false){ app.livesearch = para.livesearch; }; 
    if(para.searchtext){ app.searchtext = para.searchtext; }; 

    let footerAction = '';
    if(app.action){
    footerAction = '<span class="abort">'+app.abort+'</span><span class="success">'+app.save+'</span>';
    }
    let start = '<div class="'+para.select+' input-search" data-title="'+para.title+'"><div class="input-modal"><div class="input-select"></div>';
    let end = footerAction+'</div></div>';
    let rep =  $("."+para.select)
    .clone()
    .wrap('<div></div>')
    .parent().html()
    .replace(/select/g,'ul class=""')
    .replace(/option/g,'li class=""');
    $("."+para.select).replaceWith(start + rep + end);

    $("."+para.select).on("click", function(e){
      $(this).find(".input-modal").css("display", "block");
      $(".input-select input").val("");
      $(".input-select input").focus();
      $(".input-select input").keyup(function() {
          var filter = $(this).val(),
            count = 0;
            $(this).find('.input-select ul li').each(function() {
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
              $(this).hide(); 
            } else {
              $(this).show(); // MY CHANGE
              count++;
            }
          });
        });
  });

    const innerHtml = '<input class="input-select-search" type="text"><div data-list=""></div>';
    if(app.livesearch){
    $("."+para.select).find(".input-select").html(innerHtml);
    if(app.searchtext.length > 0){
    $("."+para.select).find(".input-select").find(".input-select-search").attr("placeholder", app.searchtext);
    }
    }

  $(document).on("click",".success",function(){
      return true;
  });
  $(document).on("click",".abort, .success",function(){
    $("."+para.select).find(".input-modal").css("display", "none");
  });
  
  $(document).mouseup(function(e) 
  {
      var container = $("."+para.select).find(".input-modal");
      if (!container.is(e.target) && container.has(e.target).length === 0) 
      {
          container.hide();
      }
  });
  }