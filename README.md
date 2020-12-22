Menubar_webAPI-v1.1
-------------------------------------------
1. Create index.html for your project

2. Paste the following lines inside the <head> ... </head> section of your page

	<link rel="stylesheet" href="<path to API folder>/styles/Menubar.css"/>
	<script src="<path to API folder>/scripts/Menubar.js"></script>

** Change <path to API folder> accordingly

3. Create another index.js file and link to index.html like above

3. Inside index.js, create an object of Menubar

	const menubar = new Menubar();

4. Create an object of Menu and add it to menubar

	const fileMenu = new Menu("File");
	menubar.addMenu(fileMenu);

5. Add MenuItem inside fileMenu

	const newWindowMI = new MenuItem("New Window");
	fileMenu.addMenuItem(newWindowMI);

6. Create another Menu in menubar

	const viewMenu = new Menu("View");
	menubar.addMenu(viewMenu);

--------Note: You can add MenuItem as well as another Menu inside a Menu.

--------Note: add menu by menu1.addMenu(menu2) and add menuItem by menu1.addMenuItem(menuItem)

--------Note: A Menu can be vertical or horizontal, which means the Menu appears at vertical or horizontal position relative to the parent menu on screen.
You can set this property using, menu.setAxis("y") for vertical or menu.setAxis("x") for horizontal appearance. The default is horizontal.

7. Create a Menu to add inside View Menu

	const settings = new Menu("Settings");
	settings.setAxis("x");
	viewMenu.addMenu(settings);

8. on-click handler for MenuItem (Only MenuItem accepts on-click handler of this Extension project).

	newWindowMI.setOnClickListener(click_handler_newWindowMI);

9. Create the above click_handler_newWindowMI function which gets called on click of the menu item.

	function click_handler_newWindowMI(){
		alert("New Window MenuItemClicked");
	}

Thank you!

