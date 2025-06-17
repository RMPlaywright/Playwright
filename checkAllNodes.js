// ...existing code...

// Example: Replace with your actual selectors or element references
const element = document.querySelector('#element');
const element_1 = document.querySelector('#element_1');
const element_2 = document.querySelector('#element_2');
const element_3 = document.querySelector('#element_3');
const element_4 = document.querySelector('#element_4');
const element_5 = document.querySelector('#element_5');
const element_6 = document.querySelector('#element_6');
const element_7 = document.querySelector('#element_7');
const element_8 = document.querySelector('#element_8');

// Scroll and validate each element, only proceed if unchecked
element.scrollIntoView();
if (element.getAttribute('aria-selected') !== 'false') {
  throw new Error('All Checkboxes are not unchecked');
}

element_1.scrollIntoView();
if (element_1.getAttribute('aria-selected') !== 'false') {
  throw new Error('All Checkboxes are not unchecked');
}

element_2.scrollIntoView();
if (element_2.getAttribute('aria-selected') !== 'false') {
  throw new Error('All Checkboxes are not unchecked');
}

element_3.scrollIntoView();
if (element_3.getAttribute('aria-selected') !== 'false') {
  throw new Error('All Checkboxes are not unchecked');
}

element_4.scrollIntoView();
if (element_4.getAttribute('aria-selected') !== 'false') {
  throw new Error('All Checkboxes are not unchecked');
}

element_5.scrollIntoView();
if (element_5.getAttribute('aria-selected') !== 'false') {
  throw new Error('All Checkboxes are not unchecked');
}

element_6.scrollIntoView();
if (element_6.getAttribute('aria-selected') !== 'false') {
  throw new Error('All Checkboxes are not unchecked');
}

element_7.scrollIntoView();
if (element_7.getAttribute('aria-selected') !== 'false') {
  throw new Error('All Checkboxes are not unchecked');
}

element_8.scrollIntoView();
if (element_8.getAttribute('aria-selected') !== 'false') {
  throw new Error('All Checkboxes are not unchecked');
}

return true;

// ...existing code...