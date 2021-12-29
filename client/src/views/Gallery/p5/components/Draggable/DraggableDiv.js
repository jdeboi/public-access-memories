export default class Draggable {
    constructor (x, y, w, h, id, p5) {
      this.p5 = p5;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.id = id;
      this.origX = this.x;
      this.origY = this.y;
      this.offsetX = 0;
      this.offsetY = 0;
      this.toolbarH = 25;
      this.opacity = p5.map(this.id, 0, 20, 0, 1);
      this.minimize = false;
      this.dragging = {dragging: false};
      this.locked = false;
  
      this.topDiv = p5.select("#cards");
      this.div = p5.createDiv();
      this.div.parent(this.topDiv);
      this.div.id("c" + this.id);
      this.div.class("card");
      // divs[i].addClass("draggable");
      // divs[i].style("display", "none");
      //floor(map(i, 0, num, 20, 400));
      this.div.style("width", this.w + "px");
      // this.div.style("height", this.w + "px");
      this.div.position(this.x, this.y);
      this.div.style("opacity", this.opacity);
      this.div.size(this.w, this.h+this.toolbarH);
      // divs[i].style("display", "none");
  
      this.toolbar = p5.createDiv();
      this.toolbar.class("toolbar");
      this.toolbar.parent(this.div);
      this.toolbar.style("top", "0px");
      this.toolbar.mousePressed(() => this.draggingOn(this.dragging));
  
  
      // this.toolbar.mouseReleased(() => this.draggingDone(this.dragging));
  
      this.content = p5.createDiv();
      this.content.class("content");
      this.content.parent(this.div);
      this.content.size(this.w, this.h);
  
      this.buttons = p5.createDiv();
      this.buttons.addClass("buttons");
      this.buttons.parent(this.toolbar);
  
      this.button1 = p5.createDiv();
      this.button1.class("button1");
      this.button1.parent(this.buttons);
      this.button1.mouseClicked(() => this.toggleCloseWindow(this.div));
  
      this.button2 = p5.createDiv();
      this.button2.class("button2");
      this.button2.parent(this.buttons);
      this.button2.mouseClicked(() => this.toggleMinimze(this.content));
  
      this.button3 = p5.createDiv();
      this.button3.class("button3");
      this.button3.parent(this.buttons);
      this.button3.mouseClicked(() => this.resetWindow(this.div));
  
  
      this.title = p5.createDiv();
      this.title.class("toolbarTitle");
      this.title.parent(this.toolbar);
    }
  
    setImageContent(ind, img, title, isGif=false) {
      let end = "jpg";
      if (isGif) end = "gif";
      if (!this.locked) {
        this.title.html(`${ind+1}. ${title}`);
        this.content.style("background-image", `url(images/${img}.${end})`);
      }
    }
  
    setEmpty() {
      if (!this.locked) {
        this.title.html('');
        this.content.style("background-image", "none");
      }
    }
  
    draggingOn(dragging) {
      dragging.dragging = true;
      this.offsetX = this.x - this.p5.mouseX;
      this.offsetY = this.y - this.p5.mouseY;
    }
  
  
  
    endDrag() {
      this.dragging.dragging = false;
    }
  
    setSize(val) {
      let w = val;
      let h = val;
      if (this.minimzed) h = 0;
      this.div.size(w, h+this.toolbarH);
      this.content.size(w, h);
    }
  
    update() {
      if (this.dragging.dragging) {
        this.x = this.p5.mouseX + this.offsetX;
        this.y = this.p5.mouseY + this.offsetY;
        this.div.position(this.x, this.y);
      }
    }
  
    toggleCloseWindow(div) {
      this.locked = !this.locked;
      this.closeWindow(div);
    }
  
    closeWindow(div) {
      // div.style("display", "none");
      if (this.locked) this.button1.addClass("locked");
      else this.button1.removeClass("locked");
    }
  
    resetWindow(div=this.div) {
      this.x = this.origX;
      this.y = this.origY;
      this.locked = false;
      this.closeWindow(div);
      div.position(this.x, this.y);
      div.style("display", "block");
      this.minimized = false;
      this.minimizeWindow(this.content);
      this.setSize(400);
    }
  
    toggleMinimze(content) {
      this.minimize = !this.minimize;
      this.minimizeWindow(content);
    }
  
    minimizeWindow(content) {
      if (this.minimize) {
        content.style("height", "0");
        this.toolbar.style("border-bottom", "0px");
        this.button2.addClass("minimized");
      }
      else {
        content.style("height", (this.h) + "px");
        this.toolbar.style("border-bottom", "2px solid white");
        this.button2.removeClass("minimized");
      }
    }
  }
  

// class Draggable {

//     constructor(x, y, w , h) {
//         this.barH = 26;
//         this.bRad = 10;
//     }

//     display() {
       
//     }

//     displayToolBar(p5) {
//         p5.fill(0);
//         p5.noStroke();
//         p5.rect(this.x, this.y+10, this.x+this.w, this.y+(this.barH-10));
//         p5.rect(this.x, this.y, this.w, this.h, this.bRad);
//     }

//     displayButtons(p5) {
//         p5.stroke(255);
//         p5.strokeWeight(2);
//         p5.noFill();
//     }


// }

// class closeButton