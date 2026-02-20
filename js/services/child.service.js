// js/services/child.service.js

import { state } from "../state.js";

export async function fetchChildrenFromServer() {
  try {
    const response = await fetch("https://api.yourregistry.com/children");
    const data = await response.json();
    state.children = data;
    renderTable(); // Update View
  } catch (error) {
    console.error("Database connection failed", error);
  }
}

export function saveChild(child) {
  if (state.editingIndex === -1) {
    state.children.push(child);
  } else {
    state.children[state.editingIndex] = child;
  }
}

export function deleteChild(index) {
  state.children.splice(index, 1);
}

export function getChild(index) {
  return state.children[index];
}
