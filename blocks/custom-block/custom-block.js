export default function decorate(block) {
    // Log the original inner HTML
    console.log("custom-block original HTML:", block.innerHTML);
  
    // Show the raw HTML in the block for debugging
    const pre = document.createElement("pre");
    pre.textContent = block.innerHTML;
  
    block.textContent = "";
    block.appendChild(pre);
  }