export default function decorate(block) {
  // Parse the raw sequential divs
  const headerRow = block.children[0]?.textContent?.trim() || '';
  const tableItems = Array.from(block.children).slice(1);

  // Split header row into individual headers
  const headers = headerRow.split(',').map((header) => header.trim());

  // Create the table structure
  const table = document.createElement('table');
  table.classList.add('dynamic-table');

  // Add table header
  const headerElement = document.createElement('tr');
  headers.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    headerElement.appendChild(th);
  });
  table.appendChild(headerElement);

  // Add table rows
  tableItems.forEach((item) => {
    const rowData = item.children[0]?.textContent?.trim() || '';
    const values = rowData.split(',').map((value) => value.trim());

    const row = document.createElement('tr');
    values.forEach((value) => {
      const td = document.createElement('td');
      td.textContent = value;
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  // Replace the block content with the table
  block.innerHTML = '';
  block.appendChild(table);
}