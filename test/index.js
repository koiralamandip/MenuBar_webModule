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