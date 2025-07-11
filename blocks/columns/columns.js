export default function decorate(block) {
  // Clone the original block so we can keep the classnames
  const originalClassList = Array.from(block.classList);

  const rows = Array.from(block.children).map((row) =>
    Array.from(row.children).map((cell) => cell.innerHTML)
  );

  const tableWrapper = document.createElement('div');
  // tableWrapper.classList.add('amortization-table-wrapper');

  const table = document.createElement('table');
  table.classList.add('amortization-table', ...originalClassList);

  rows.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    row.forEach((cellHTML) => {
      const cell = document.createElement(rowIndex === 0 ? 'th' : 'td');
      cell.innerHTML = cellHTML;
      tr.appendChild(cell);
    });
    table.appendChild(tr);
  });

  tableWrapper.appendChild(table);
  // block.replaceWith(tableWrapper);
}
