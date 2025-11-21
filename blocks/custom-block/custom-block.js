function extractFieldValues(block) {
    // Field One: stored with prop "myDropdown"
    const f1El = block.querySelector('[data-aue-prop="myDropdown"]');
    // Field Two: stored with prop "fieldTwo"
    const f2El = block.querySelector('[data-aue-prop="fieldTwo"]');
  
    const fieldOne = f1El ? f1El.textContent.trim() : "";
    const fieldTwo = f2El ? f2El.textContent.trim() : "";
  
    return { fieldOne, fieldTwo };
  }
  
  export default function decorate(block) {
    // Capture values from the original authored content
    const { fieldOne, fieldTwo } = extractFieldValues(block);
  
    // Now clear and render your final structure
    block.textContent = "";
  
    const wrapper = document.createElement("div");
    wrapper.className = "custom-block-wrapper";
  
    const f1 = document.createElement("div");
    f1.className = "custom-block-field custom-block-field-one";
    f1.textContent = fieldOne;
  
    const f2 = document.createElement("div");
    f2.className = "custom-block-field custom-block-field-two";
    f2.textContent = fieldTwo;
  
    wrapper.appendChild(f1);
    wrapper.appendChild(f2);
    block.appendChild(wrapper);
  }