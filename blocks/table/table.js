export default function decorate(block) {
  // Get header text (first row)
  const headerRow = block.querySelector(':scope > div:nth-child(1) p')?.textContent?.trim() || '';
  const headers = headerRow.split(',').map((header) => header.trim());

  // Get all subsequent <p> elements inside second row (data rows)
  const rowElements = block.querySelectorAll(':scope > div:nth-child(2) p');
  const rows = Array.from(rowElements)
    .map((p) => p.textContent.trim())
    .filter(Boolean) // remove empty rows
    .map((line) => line.split(',').map((cell) => cell.trim()));

  // Create the table
  const table = document.createElement('table');
  table.classList.add('dynamic-table');

  // Create header row
  const headerElement = document.createElement('tr');
  headers.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    headerElement.appendChild(th);
  });
  table.appendChild(headerElement);

  // Add data rows
  rows.forEach((row) => {
    const tr = document.createElement('tr');
    row.forEach((cell) => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  // Replace block content with table
  block.innerHTML = '';
  block.appendChild(table);
}
