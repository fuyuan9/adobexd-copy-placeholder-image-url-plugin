const clipboard = require("clipboard");

function copyBoundsPlaceholderImageUrl(selection) {
    if (selection.items.length === 0) {
        return;
    }

    const bounds = selection.items.map((e) => e.boundsInParent);

    let left;
    let top;
    let right;
    let bottom;
    for (let index = 0; index < bounds.length; index++) {
        const b = bounds[index];
        if (left == null || b.x < left) {
            left = b.x;
        }
        if (top == null || b.y < top) {
            top = b.y;
        }

        if (right == null || right < b.x + b.width) {
            right = b.x + b.width;
        }
        if (bottom == null || bottom < b.y + b.height) {
            bottom = b.y + b.height;
        }
    }

    // console.log({ left, top, right, bottom });
    // console.log(right - left, bottom - top);
    const width = Math.round(right - left);
    const height = Math.round(bottom - top);
    const text = `https://via.placeholder.com/${width}x${height}`;
    // console.log(text);
    clipboard.copyText(text);
}

module.exports = {
    commands: {
        copy: copyBoundsPlaceholderImageUrl
    }
};