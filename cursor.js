let circle = $('.circle');
let area = $('.cursor-area');

function moveCircle(e) {
    let offset = area.offset();
    let areaWidth = area.outerWidth();
    let areaHeight = area.outerHeight();
    
    let cursorX = e.pageX;
    let cursorY = e.pageY;
    
    let left = cursorX - offset.left;
    let top = cursorY - offset.top;
    
    // Check if the cursor is inside the div
    let insideX = left >= 0 && left <= areaWidth;
    let insideY = top >= 0 && top <= areaHeight;

    if (insideX && insideY) {
        let clipTop = Math.max(0, -top);
        let clipRight = Math.max(0, (left + 50) - areaWidth);
        let clipBottom = Math.max(0, (top + 50) - areaHeight);
        let clipLeft = Math.max(0, -left);

        // Fade in smoothly
        circle.css("opacity", 1);

        // Move & clip effect
        TweenLite.to(circle, 0.1, {
            css: {
                left: cursorX,
                top: cursorY,
                clipPath: `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px)`
            }
        });
    } else {
        // Instantly hide when fully outside
        circle.css("opacity", 0);
    }
}

area.on('mousemove', moveCircle);
