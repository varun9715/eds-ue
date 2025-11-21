// blocks/custom-block/custom-block.js

const API_BASE = "https://localhost:9443";

/**
 * Calls your backend API to get the latest dropdown value
 * for this page, block model, and property.
 */
async function fetchDropdownValue(pageUrl, blockModel, propertyKey) {
  const url = new URL(`${API_BASE}/value`);
  url.searchParams.set("pageUrl", pageUrl);
  url.searchParams.set("blockModel", blockModel);
  url.searchParams.set("propertyKey", propertyKey);

  const res = await fetch(url.toString(), {
    credentials: "include"
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();
  // Assuming your API returns { value: "..." }
  return data && typeof data.value !== "undefined" ? data.value : null;
}

/**
 * Still extracts fieldTwo from the original authored HTML.
 * We no longer rely on authored myDropdown, since we get it from the API.
 */
function extractFieldTwo(block) {
  const f2El = block.querySelector('[data-aue-prop="fieldTwo"]');
  const fieldTwo = f2El ? f2El.textContent.trim() : "";
  return fieldTwo;
}

export default async function decorate(block) {
  // Extract fieldTwo from authored content before we clear the block
  const fieldTwo = extractFieldTwo(block);

  // Show a loading state while we call the API for myDropdown
  block.textContent = "Loading dropdown value…";

  let dropdownValue = "";

  try {
    const pageUrl = window.location.href;
    dropdownValue = (await fetchDropdownValue(pageUrl, "custom-block", "myDropdown")) || "";
  } catch (e) {
    console.error("Error calling dropdown value API:", e);
    dropdownValue = "(error loading dropdown)";
  }

  // Now render the final structure
  block.textContent = "";

  const wrapper = document.createElement("div");
  wrapper.className = "custom-block-wrapper";

  const f1 = document.createElement("div");
  f1.className = "custom-block-field custom-block-field-one";
  f1.textContent = dropdownValue;

  const f2 = document.createElement("div");
  f2.className = "custom-block-field custom-block-field-two";
  f2.textContent = fieldTwo;

  wrapper.appendChild(f1);
  wrapper.appendChild(f2);
  block.appendChild(wrapper);
}