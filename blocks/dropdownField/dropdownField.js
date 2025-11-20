const API_BASE = "https://localhost:9443";

async function fetchLatestDropdownValue() {
  try {
    const res = await fetch(`${API_BASE}/update-dropdown`, {
      credentials: "include"
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    const updates = Array.isArray(data.updates) ? data.updates : [];

    if (updates.length === 0) {
      return null;
    }

    // Pick the last update, or filter by propertyKey/blockModel if needed
    const last = updates[updates.length - 1];

    // Example: only consider your specific key/model
    if (last.propertyKey === "myDropdown" && last.blockModel === "custom-block") {
      return last.value;
    }

    return last.value; // or null if you want stricter filtering
  } catch (e) {
    console.error("Failed to fetch dropdown updates:", e);
    return null;
  }
}

export default async function decorate(block) {
  // Clear any placeholder content
  block.textContent = "";

  // Show a loading indicator while fetching
  const loading = document.createElement("p");
  loading.textContent = "Loading dropdown value...";
  block.appendChild(loading);

  const value = await fetchLatestDropdownValue();

  // Replace loading with the actual value
  block.textContent = "";
  const p = document.createElement("p");
  p.className = "dropdownfield-value";
  p.textContent = value != null ? value : "(no value)";
  block.appendChild(p);
}