Menubar_webAPI-v1.1
-------------------------------------------
1. Create index.html for your project

2. Paste the following lines inside the &lt;head&gt; ... &lt;/head&gt; section of your page

&lt;link rel="stylesheet" href="&lt;path to API folder&gt;/styles/Menubar.css"/&gt;
&lt;script src="&lt;path to API folder&gt;/scripts/Menubar.js"&gt; &lt;/script&gt;

** Change &lt;path to API folder&gt; accordingly

3. Create another index.js file and link to index.html like above

3. Inside index.js, create an object of Menubar
	
	{
		const menubar = new Menubar();
	}

4. Create an object of Menu and add it to menubar

	{
		const fileMenu = new Menu("File");
		menubar.addMenu(fileMenu);
	}

5. Add MenuItem inside fileMenu

	{
		const newWindowMI = new MenuItem("New Window");
		fileMenu.addMenuItem(newWindowMI);
	}

6. Create another Menu in menubar

	{
		const viewMenu = new Menu("View");
		menubar.addMenu(viewMenu);
	}

--------Note: You can add MenuItem as well as another Menu inside a Menu.

--------Note: add menu by menu1.addMenu(menu2) and add menuItem by menu1.addMenuItem(menuItem)

--------Note: A Menu can be vertical or horizontal, which means the Menu appears at vertical or horizontal position relative to the parent menu on screen.
You can set this property using, menu.setAxis("y") for vertical or menu.setAxis("x") for horizontal appearance. The default is horizontal.

7. Create a Menu to add inside View Menu

	{
		const settings = new Menu("Settings");
		settings.setAxis("x");
		viewMenu.addMenu(settings);
	}

8. on-click handler for MenuItem (Only MenuItem accepts on-click handler of this Extension project).

	{
		newWindowMI.setOnClickListener(click_handler_newWindowMI);
	}

9. Create the above click_handler_newWindowMI function which gets called on click of the menu item.

	{

		function click_handler_newWindowMI(){
			alert("New Window MenuItemClicked");
		}
	}


Sample:

index.js

	window.addEventListener('DOMContentLoaded', startup());

	function startup(){

		const menubar = new Menubar();
		menubar.setBackground("#f5f5f5");
		
		const fileMenu = new Menu("File");
		menubar.addMenu(fileMenu);

		const newMenuItem = new MenuItem("New Window");
		newMenuItem.setOnClickListener(click_handler_newWindowMI);
		fileMenu.addMenuItem(newMenuItem);

		const viewMenu = new Menu("View");
		menubar.addMenu(viewMenu);

		const toolsMenuItem = new MenuItem("Tools");
		viewMenu.addMenuItem(toolsMenuItem);

		const settingsMenu = new Menu("Settings");
		settingsMenu.setAxis("x");
		viewMenu.addMenu(settingsMenu);

		const settingPreferences = new MenuItem("Preferences");
		settingsMenu.addMenuItem(settingPreferences);

		const editSett = new MenuItem("Editor Settings");
		editSett.setOnClickListener(edit_click);
		settingsMenu.addMenuItem(editSett);

		document.getElementById('menu-container-section').appendChild(menubar.getObject());
	}

	function edit_click(){
		alert("Editor Settings MenuItem clicked");
	}

	function click_handler_newWindowMI(){
		alert("New Window MenuItem Clicked");
	}





index.html

	<!DOCTYPE html>
	<html>
    	<head>
        	<title>Test Menubar</title>
        	<link rel="stylesheet" href="../project/styles/Menubar.css"/>
        	<script src="../project/scripts/Menubar.js"></script>
	</head>
	<body>
		<div id="menu-container-section">
		</div>
		<script src="index.js"></script>
	</body>
	</html>


Thank you!

