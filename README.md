# JQselect

## Javascript jQuery Plugin
This Plugin developed by Sebastian Angelone.
It is based on the JavaScript library "jQuery". 
This plugin manipulates the standard html input field "select" and thus creates a better user expiries. You can use this plugin to do a live search in your selectbox and you can trigger different events.
### include sources

````
  <link rel="stylesheet" type="text/css" href="JQselect.css"/>
  <script type="text/javascript" src="JQselect.js"></script>
````
### Settings
```
SelectDropdown({
    select: "divclass",
    title:"Title",
    searchtext:'Placeholder',
    livesearch:true,
    label:{
        abort:'Abort',
        save: 'Save',
        single: 'item',
        plural: 'items',
    },
    action:true,
});
```
