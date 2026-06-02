function DataTable({ columns, rows, loading, emptyTitle, emptyDescription }) {
  if (loading) {
    return <div className="rounded-[1.5rem] border border-stone/10 bg-white p-6 text-stone-light">Daten werden geladen...</div>;
  }

  if (!rows.length) {
    return <div className="rounded-[1.5rem] border border-stone/10 bg-white p-6"><h3 className="text-xl text-stone">{emptyTitle}</h3><p className="mt-2 text-stone-light">{emptyDescription}</p></div>;
  }

  return <div className="overflow-hidden rounded-[1.5rem] border border-stone/10 bg-white shadow-lg shadow-stone/5"><div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-cream text-xs uppercase tracking-[0.18em] text-stone-light"><tr>{columns.map((column) => <th key={column.key} className="px-4 py-4 font-semibold">{column.label}</th>)}</tr></thead><tbody className="divide-y divide-stone/10">{rows.map((row, index) => <tr key={row._id || row.id || index} className="align-top">{columns.map((column) => <td key={column.key} className="px-4 py-4 text-stone">{column.render ? column.render(row) : row[column.key]}</td>)}</tr>)}</tbody></table></div></div>;
}

export default DataTable;
