
export default class DragText {
				currentX;
                currentY;
                initialX;
                initialY;
                xOffset = 0;
                yOffset = 0;
				#targetElement;
				actionFunction;

				constructor(element, callback) {
					this.targetElement = document.querySelector(element);
					this.actionFunction = callback;
					this.addDragEvents(this.targetElement);
				}

                dragStart(e, z) {
				  if (e.type === "touchstart") {
						z.initialX = e.touches[0].clientX - z.xOffset;
						z.initialY = e.touches[0].clientY - z.yOffset;
				  } else {
						z.initialX = e.clientX - z.xOffset;
						z.initialY = e.clientY - z.yOffset;
				  }
                } 

                 dragEnd(e, z) {
                        z.initialX = z.currentX;
                        z.initialY = z.currentY;
                        z.drag(e);
                }

                drag(e, z) {
                        e.preventDefault();
                        if (e.type === "touchmove") {
                          z.currentX = e.touches[0].clientX - z.initialX;
                          z.currentY = e.touches[0].clientY - z.initialY;
                        } else {
                          z.currentX = e.clientX - z.initialX;
                          z.currentY = e.clientY - z.initialY;
                        }

                        z.xOffset = z.currentX;
                        z.yOffset = z.currentY;

                        z.actionFunction(z.currentX, z.currentY);
                }

                addDragEvents(container) {
                     	container.addEventListener("touchstart", (e) => this.dragStart(e, this), false);
                        container.addEventListener("touchmove", e => this.drag(e,this), false);

                        container.addEventListener("dragstart", (e) => this.dragStart(e, this) , false);
                        container.addEventListener("dragend", (e) => this.drag(e, this), false);
                }

				 removeDragEvents(container) {
                     	container.removeEventListener("touchstart", (e) => this.dragStart(e, this), false);
                        container.removeEventListener("touchmove", e => this.drag(e,this), false);

                        container.removeEventListener("dragstart", (e) => this.dragStart(e, this) , false);
                        container.removeEventListener("dragend", (e) => this.drag(e, this), false);
                }

				cleanDragText() {
					this.removeDragEvents(this.targetElement);
				}
}
