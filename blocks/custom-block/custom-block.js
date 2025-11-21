export default function decorate(block) {
  
    const fieldOneEl = block.querySelector('[data-field-name="myDropdown"]');
    const fieldTwoEl = block.querySelector('[data-field-name="fieldTwo"]');
  
    const fieldOneValue = fieldOneEl ? fieldOneEl.textContent.trim() : "";
    const fieldTwoValue = fieldTwoEl ? fieldTwoEl.textContent.trim() : "";
  
    // Clear existing content
    block.textContent = "";
  
    // Create a simple layout to show both fields
    const wrapper = document.createElement("div");
    wrapper.className = "custom-block-wrapper";
  
    const f1 = document.createElement("div");
    f1.className = "custom-block-field custom-block-field-one";
    f1.textContent = fieldOneValue;
  
    const f2 = document.createElement("div");
    f2.className = "custom-block-field custom-block-field-two";
    f2.textContent = fieldTwoValue;
  
    wrapper.appendChild(f1);
    wrapper.appendChild(f2);
    block.appendChild(wrapper);
  }