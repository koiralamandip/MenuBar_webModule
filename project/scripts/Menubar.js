//========================================================================================================================
//========================================================================================================================
//========================================================================================================================
class BorderFactory{
    static LineBorder(color){
      return "inset 0px 0px 0px 2px " + color;
    }
    static BevelBorder(color){
      return "inset 0px 0px 5px 6px rgba(0,0,0,0.5), inset 0px 0px 30px 0.5px " + color;
    }
}

class Menubar{
  constructor(){
    this.active = false;
    this.lastOpenMenu = null;
    this.menus = [];
    this.htmlObject = this.createObject();
    this.getObject().addEventListener('click', this.onClick.bind(this));
    document.addEventListener('click', this.onDocClick.bind(this));
  }

  setActive(active){this.active = active;}

  getActive(){return this.active;}

  setLastOpenMenu(lastOpenMenu){this.lastOpenMenu = lastOpenMenu;}

  getLastOpenMenu(){return this.lastOpenMenu;}

  createObject(){
    var unsortedList = document.createElement('ul');
    unsortedList.className="menubar";
    return unsortedList;
  }

  getObject(){
    return this.htmlObject;
  }

  setBackground(color){this.getObject().style.backgroundColor = color;}
  setForeground(color){this.getObject().style.color = color;}
  setBorder(border){this.getObject().style.boxShadow = border;}

  addMenu(menu){
    this.menus.push(menu);
    menu.setMenuBar(this);
    menu.parent = null;
    this.getObject().appendChild(menu.getObject());
  }

  hideMenus(){
    this.lastOpenMenu = null;
    for (var menu of this.menus){
      menu.hide();
    }
  }

  onClick(e){
    e.stopPropagation();
    console.log("Menubar Clicked");
    this.active = false;
    this.hideMenus();
  }

  onDocClick(e){
    this.hideMenus();
    this.active = false;
  }

}

//========================================================================================================================
//========================================================================================================================
//========================================================================================================================

class Menu{

  constructor(text, hasContainer = true){
    this.text = text;
    this.menus = [];
    this.menubar = null;
    this.parent = null;
    this.hasContainer = hasContainer;
    this.container = null;
    this.htmlObject = this.createObject();
    this.setAxis("y");
    this.getObject().addEventListener('click', this.onClick.bind(this));
    this.getObject().addEventListener('mouseenter', this.onMouseEnter.bind(this));
  }


  createObject(){
    var menu = document.createElement('li');
    menu.className = "menu";
    var span = document.createElement('span');
    span.className = "text";
    var textNode = document.createTextNode(this.text);
    span.appendChild(textNode);
    menu.appendChild(span);

    if (this.hasContainer){
      this.container = document.createElement('ul');
      this.container.className = "container";
      menu.appendChild(this.container);
    }
    return menu;
  }

  setBackground(color){this.getObject().style.backgroundColor = color;this.container.style.backgroundColor = color;}
  setForeground(color){
    this.getObject().style.color = color;
    this.container.style.color = color;
  }
  setBorder(border){
    this.getObject().style.boxShadow = border;
    this.container.style.boxShadow = border;
  }

  setMenuBar(menubar){
    this.menubar = menubar;
  }

  getMenuBar(){
    return this.menubar;
  }

  getObject(){
    return this.htmlObject;
  }

  setAxis(axis){
    if (!this.hasContainer) return;
    this.axis = axis;
    if (axis == "y"){
      this.container.style.left = "0%";
      this.container.style.top = "100%";
      this.container.style.minWidth = "100%";
    }else if (axis == "x"){
      this.container.style.left = "100%";
      this.container.style.top = "0%";
      this.container.style.minWidth = "0%";
    }
  }

  onClick(e){
    e.stopPropagation();
    console.log("Menu Clicked");
    if (this.isHidden()){
      this.show();
      if(this.parent == null){
        this.getMenuBar().active = true;
        this.getMenuBar().lastOpenMenu = this;
      }
    }else{
      this.hide();
      if (this.parent == null){
        this.getMenuBar().active = false;
        this.getMenuBar().lastOpenMenu = null;
      }
    }
  }

  onMouseEnter(e){
    e.stopPropagation();
    if (this.getMenuBar().active){
      this.show();

      if (this.parent != null){
        this.parent.hideChildren();
        this.show();
        return;
      }
      if (this.getMenuBar().lastOpenMenu != this){
        this.getMenuBar().lastOpenMenu.hide();
        this.getMenuBar().lastOpenMenu = this;
      }
    }
  }

  addMenuItem(menuItem){
    if (this.hasContainer){
      this.container.appendChild(menuItem.getObject());
      menuItem.parent = this;
    }else{
      console.error("Error: \n Addding menuItem \"" + menuItem.text + "\" to containerless menu \"" + this.text + "\"");
    }
  }

  addMenu(menu){
    this.menus.push(menu);
    menu.setMenuBar(this.getMenuBar());
    menu.parent = this;

    if (menu.axis == "y"){
      menu.getObject().className = "menu menuY";
    }else{
      menu.getObject().className = "menu menuX";
    }

    if (this.hasContainer){
      this.container.appendChild(menu.getObject());
    }else{
      console.error("Error: \n Adding menu \"" + menu.text + "\" to containerless menu \"" + this.text + "\"");
    }
  }

  hideChildren(){
    for (var menu of this.menus){
      menu.hide();
    }
  }

  hide(withChildren = true){
    this.container.style.display = "none";
    if (!withChildren) return;
    this.hideChildren();
  }

  show(){
    this.container.style.display = "flex";
  }

  isHidden(){
    return (this.container.style.display != "flex");
  }

  addDivider(color = "slateGray"){
    var divider = document.createElement('hr');
    divider.width="90%";
    divider.style.margin = "1% 5% 1% 5%";
    divider.style.color = color;
    this.container.appendChild(divider);
  }
}

//========================================================================================================================
//========================================================================================================================
//========================================================================================================================

class MenuItem{

  constructor(text, shortcutText = ""){
    MenuItem.CTRL = MenuItem.SHIFT = MenuItem.ALT = true;
    this.text = text;
    this.shortcut = null;
    this.parent = null;
    this.function_name = null;
    this.htmlObject = this.createObject(shortcutText);
    this.getObject().addEventListener('click', this.onClick.bind(this));
    this.getObject().addEventListener('mouseenter', this.onMouseEnter.bind(this));
    document.addEventListener('keydown', this.onKeyUp.bind(this));
  }

  onKeyUp(e){
    e.stopPropagation();
    if (this.function_name == null) return;
    if (e.ctrlKey == this.ctrlKey && e.shiftKey == this.shiftKey && e.altKey == this.altKey && e.key == this.key){
      this.function_name();
      e.preventDefault();
    }
  }

  createObject(shortcutText){
    var menuItem = document.createElement('li');
    menuItem.className = "menuItem";
    var span = document.createElement('span');
    span.className="text";
    var textNode = document.createTextNode(this.text);
    span.appendChild(textNode);
    this.shortcut = document.createElement('span');
    this.shortcut.className = "stcut";
    var srtcutText = document.createTextNode(shortcutText);
    this.shortcut.appendChild(srtcutText);
    menuItem.appendChild(span);
    menuItem.appendChild(this.shortcut);
    return menuItem;
  }

  getObject(){
    return this.htmlObject;
  }

  onClick(e){
    e.stopPropagation();
    console.log("MenuItem Clicked");
    this.parent.getMenuBar().hideMenus();
    this.parent.getMenuBar().active = false;
  }

  onMouseEnter(e){
    e.stopPropagation();
    this.parent.hideChildren();
  }

  setOnClickListener(function_name){
    this.function_name = function_name;
    this.getObject().addEventListener('click', function_name);
  }

  removeOnClickListener(function_name){
    this.getObject().removeEventListener('click', function_name);
  }

  setShortcut(key, controlKey = true, shiftKey = false, altKey = false){
    this.ctrlKey = controlKey;
    this.shiftKey = shiftKey;
    this.altKey = altKey;
    this.key = (shiftKey) ? key.toUpperCase() : key;

    var text = (controlKey) ? "Ctrl + " : "";
    text += (shiftKey) ? "Shift + " : "";
    text += (altKey) ? "Alt + " : "";
    text += this.key.toUpperCase();
    this.shortcut.textContent = text;
  }

  setBackground(color){this.getObject().style.backgroundColor = color;}
  setForeground(color){
    this.getObject().style.color = color;
    this.shortcut.style.color = color;
  }
  setBorder(border){this.getObject().style.boxShadow = border;}

}

//========================================================================================================================
//========================================================================================================================
//========================================================================================================================
