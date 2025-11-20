export default function decorate(block) {
    console.log("drop-down decorate() called", block);
    block.textContent = "Hello from drop-down block!";
  }