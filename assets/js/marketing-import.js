/* One-time, non-destructive import of the Marketing Department workbook. */
(function importMarketingWorkbook() {
  const VERSION = 'pth_marketing_import_2026_08_14_v1';
  if (localStorage.getItem(VERSION) === '1') return;

  const read = key => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const textKey = value => String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
  const merge = (existing, incoming, keyFor, fillBlanks = false) => {
    const output = [...existing];
    const positions = new Map(output.map((record, index) => [keyFor(record), index]));
    incoming.forEach(record => {
      const key = keyFor(record);
      if (!key) return;
      const index = positions.get(key);
      if (index == null) {
        positions.set(key, output.length);
        output.push(record);
      } else if (fillBlanks) {
        const current = output[index];
        const additions = Object.fromEntries(Object.entries(record).filter(([field, value]) =>
          (current[field] == null || current[field] === '') && value != null && value !== ''
        ));
        output[index] = { ...current, ...additions };
      }
    });
    return output;
  };

  fetch('assets/data/marketing-department-import.json?v=1.0.0')
    .then(response => {
      if (!response.ok) throw new Error(`Workbook import data unavailable (${response.status})`);
      return response.json();
    })
    .then(data => {
      const clients = merge(read('pth_clients_v1'), data.clients || [], item => textKey(item.name), true);
      const leads = merge(read('pth_pipeline_v1'), data.leads || [], item => item.sourceKey || item.id);
      const followups = merge(read('pth_followups_v1'), data.followups || [], item => item.sourceKey || item.id);
      const quotations = merge(read('pth_quotations_v1'), data.quotations || [], item => item.number);
      const tenders = merge(read('pth_tenders_v1'), data.tenders || [], item => item.sourceKey || `${textKey(item.title)}|${item.due || ''}`);

      write('pth_clients_v1', clients);
      write('pth_pipeline_v1', leads);
      write('pth_followups_v1', followups);
      write('pth_quotations_v1', quotations);
      write('pth_tenders_v1', tenders);
      localStorage.setItem(VERSION, '1');
      location.reload();
    })
    .catch(error => console.error('Marketing workbook import failed:', error));
})();

