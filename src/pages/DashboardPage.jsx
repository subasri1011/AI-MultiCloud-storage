import { useMemo, useRef, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const storageBreakdown = [
  { name: 'Documents', value: 42, color: '#3457D5' },
  { name: 'Media', value: 28, color: '#00C2A8' },
  { name: 'Archives', value: 18, color: '#E8862E' },
  { name: 'Other', value: 12, color: '#E14F63' },
];

const initialFiles = [
  { name: 'Q3 Strategy Deck.pdf', source: 'Google Drive', size: '2.1 MB', modified: '6 mins ago', icon: '📄' },
  { name: 'Launch Reel.mov', source: 'Dropbox', size: '84 MB', modified: '21 mins ago', icon: '🎬' },
  { name: 'Client Notes.docx', source: 'OneDrive', size: '540 KB', modified: '1 hr ago', icon: '📝' },
  { name: 'Invoice Archive.zip', source: 'MEGA', size: '14 MB', modified: 'Today', icon: '🗜️' },
];

const cloudProviders = [
  { name: 'Google Drive', used: '82 GB', total: '120 GB', percent: 68, icon: '☁️' },
  { name: 'OneDrive', used: '49 GB', total: '100 GB', percent: 49, icon: '🟦' },
  { name: 'Dropbox', used: '37 GB', total: '80 GB', percent: 46, icon: '📦' },
  { name: 'MEGA', used: '20 GB', total: '50 GB', percent: 40, icon: '🛡️' },
];

const providerFileTypes = {
  'Google Drive': [
    { type: 'PDF', count: 84 },
    { type: 'DOCX', count: 23 },
    { type: 'PNG', count: 19 },
    { type: 'ZIP', count: 12 },
  ],
  OneDrive: [
    { type: 'DOCX', count: 46 },
    { type: 'PPTX', count: 18 },
    { type: 'XLSX', count: 11 },
    { type: 'MP4', count: 6 },
  ],
  Dropbox: [
    { type: 'MP4', count: 31 },
    { type: 'JPG', count: 57 },
    { type: 'ZIP', count: 7 },
    { type: 'PDF', count: 14 },
  ],
  MEGA: [
    { type: 'ZIP', count: 22 },
    { type: 'TAR', count: 9 },
    { type: 'PDF', count: 12 },
    { type: 'MOV', count: 8 },
  ],
};

const recommendations = [
  'Move archived files to MEGA to save space on OneDrive.',
  'Review 3 duplicate PDFs detected in Google Drive and Dropbox.',
  'Enable stricter sharing for 2 confidential folders before Friday.',
];

const sharedFiles = [
  { name: '2026 Marketing Plan.pdf', collaborator: 'Mia Chen', status: 'Shared with 8 users' },
  { name: 'Team Contracts.docx', collaborator: 'Avery Lane', status: 'Last updated today' },
  { name: 'Roadmap Notes.txt', collaborator: 'Noah Patel', status: 'Read-only access' },
];

const duplicates = [
  { name: 'Q3 Strategy Deck.pdf', count: '3 duplicates detected' },
  { name: 'Launch Reel.mov', count: '2 duplicates detected' },
  { name: 'Invoice Archive.zip', count: '1 duplicate detected' },
];

const activityLogs = [
  'Google Drive synced successfully at 10:14 AM',
  'OneDrive storage optimization completed',
  'MEGA backup verified with no warnings',
  'Restricted public share link on Client Notes',
];

const navItems = [
  'Dashboard',
  'My Files',
  'AI Assistant',
  'Cloud Providers',
  'Shared Files',
  'Duplicates',
  'Activity Logs',
  'Security Center',
  'Recycle Bin',
  'Settings',
];

function Sidebar({ active, onSelect }) {
  return (
    <aside className="w-full border-b border-line bg-white/80 p-4 backdrop-blur lg:min-h-screen lg:w-80 lg:border-b-0 lg:border-r">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cobalt to-cobalt-dark text-lg text-white">☁️</div>
        <div>
          <div className="font-heading text-lg font-bold text-ink">Valute Mind</div>
          <div className="text-xs text-muted">AI Cloud Dashboard</div>
        </div>
      </div>

      <nav className="grid gap-2">
        {navItems.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className={`focus-ring flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
              active === item ? 'bg-cobalt text-white' : 'text-muted hover:bg-cobalt/5 hover:text-cobalt'
            }`}
          >
            <span>{item}</span>
            <span>→</span>
          </button>
        ))}
      </nav>

      <div className="mt-8 rounded-3xl bg-paper p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cobalt text-sm font-bold text-white">AL</div>
          <div>
            <div className="font-semibold text-ink">Avery Lane</div>
            <div className="text-xs text-muted">Admin • Workspace</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function formatBytes(file) {
  const size = file.size;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState(initialFiles);
  const [selectedCloud, setSelectedCloud] = useState('Google Drive');
  const [uploadedCloudFile, setUploadedCloudFile] = useState(null);
  const [providerFiles, setProviderFiles] = useState({
    'Google Drive': ['Quarterly Report.pdf', 'Team Docs.zip'],
    OneDrive: ['Client Notes.docx', 'Finance Deck.pptx'],
    Dropbox: ['Launch Reel.mov', 'Brand Assets.ai'],
    MEGA: ['Invoice Archive.zip', 'Emergency Backup.tar'],
  });
  const uploadRef = useRef(null);
  const cloudUploadRef = useRef(null);

  const filteredFiles = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return files;
    return files.filter((file) => {
      return [file.name, file.source].some((value) => value.toLowerCase().includes(term));
    });
  }, [query, files]);

  const selectedProvider = cloudProviders.find((provider) => provider.name === selectedCloud) || cloudProviders[0];
  const selectedProviderTypes = providerFileTypes[selectedCloud] || providerFileTypes['Google Drive'];
  const cloudFileExtension = uploadedCloudFile?.name?.split('.').pop()?.toUpperCase() || 'FILE';
  const totalFiles = files.length + 1280;
  const totalStorage = '480 GB';

  const handleUpload = (event) => {
    const uploaded = event.target.files?.[0];
    if (!uploaded) return;

    const extension = uploaded.name.split('.').pop() || 'file';
    const iconMap = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      png: '🖼️',
      jpg: '🖼️',
      jpeg: '🖼️',
      mp4: '🎬',
      mov: '🎬',
      zip: '🗜️',
    };

    const newFile = {
      name: uploaded.name,
      source: 'Local Upload',
      size: formatBytes(uploaded),
      modified: 'Just now',
      icon: iconMap[extension] || '📁',
    };

    setFiles((current) => [newFile, ...current]);
    event.target.value = '';
  };

  const handleCloudUpload = (event) => {
    const uploaded = event.target.files?.[0];
    if (!uploaded) return;

    setUploadedCloudFile(uploaded);
    setProviderFiles((current) => ({
      ...current,
      [selectedCloud]: [uploaded.name, ...(current[selectedCloud] || [])],
    }));
    event.target.value = '';
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar active={activeNav} onSelect={setActiveNav} />

        <div className="flex-1">
          <header className="border-b border-line bg-white/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-ink">Good afternoon, Avery</h1>
                <p className="text-sm text-muted">Your cloud health is stable and AI recommendations are ready.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="focus-ring w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm sm:w-72"
                    placeholder="Search files, folders, clouds"
                  />
                </div>
                <button className="focus-ring rounded-2xl bg-cobalt px-4 py-3 text-sm font-semibold text-white">🔔</button>
                <button className="focus-ring rounded-2xl bg-cobalt/10 px-4 py-3 text-sm font-semibold text-cobalt">Settings</button>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cobalt text-sm font-bold text-white">AL</div>
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6 lg:p-8">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur">
                <div className="inline-flex rounded-full bg-cobalt/10 px-3 py-1 text-xs font-semibold text-cobalt">Total Storage</div>
                <div className="mt-3 text-3xl font-bold text-ink">{totalStorage}</div>
                <div className="mt-1 text-sm text-muted">Across 4 providers</div>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur">
                <div className="inline-flex rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">Total Files</div>
                <div className="mt-3 text-3xl font-bold text-ink">{totalFiles.toLocaleString()}</div>
                <div className="mt-1 text-sm text-muted">Healthy sync status</div>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur">
                <div className="inline-flex rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">Security Score</div>
                <div className="mt-3 text-3xl font-bold text-ink">92 / 100</div>
                <div className="mt-1 text-sm text-muted">Protected and monitored</div>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur">
                <div className="inline-flex rounded-full bg-coral/10 px-3 py-1 text-xs font-semibold text-coral">Connected Clouds</div>
                <div className="mt-3 text-3xl font-bold text-ink">4</div>
                <div className="mt-1 text-sm text-muted">Google Drive, OneDrive, Dropbox, MEGA</div>
              </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-ink">Storage Distribution</h2>
                  <span className="text-sm text-muted">Live overview</span>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={storageBreakdown}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={55}
                        outerRadius={95}
                        paddingAngle={3}
                      >
                        {storageBreakdown.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {storageBreakdown.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm text-muted">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/60 bg-slate-950 p-5 text-white shadow-soft">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold">AI Recommendation Panel</h2>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">Smart</span>
                </div>
                <div className="space-y-3">
                  {recommendations.map((item) => (
                    <div key={item} className="rounded-2xl bg-white/10 p-3 text-sm text-white/90">✨ {item}</div>
                  ))}
                </div>
                <button className="focus-ring mt-4 w-full rounded-2xl bg-cobalt px-4 py-3 font-semibold text-white transition hover:bg-cobalt-dark">
                  Run Security Scan
                </button>
              </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-ink">Recent Files</h2>
                  <button
                    type="button"
                    onClick={() => uploadRef.current?.click()}
                    className="focus-ring rounded-xl bg-mint px-3 py-2 text-xs font-semibold text-white"
                  >
                    Upload File
                  </button>
                  <input ref={uploadRef} type="file" onChange={handleUpload} className="hidden" />
                </div>
                <div className="space-y-3">
                  {filteredFiles.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-line p-4 text-sm text-muted">
                      No files match the current search.
                    </div>
                  ) : (
                    filteredFiles.map((file) => (
                      <div key={`${file.name}-${file.modified}`} className="flex items-center justify-between rounded-2xl border border-line p-3">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{file.icon}</span>
                          <div>
                            <div className="font-semibold text-ink">{file.name}</div>
                            <div className="text-sm text-muted">{file.source}</div>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted">
                          <div>{file.size}</div>
                          <div>{file.modified}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-ink">Connected Clouds</h2>
                  <span className="text-sm text-muted">4 Active</span>
                </div>
                <div className="space-y-3">
                  {cloudProviders.map((cloud) => (
                    <button
                      key={cloud.name}
                      type="button"
                      onClick={() => setSelectedCloud(cloud.name)}
                      className={`focus-ring w-full rounded-2xl border p-3 text-left transition ${
                        selectedCloud === cloud.name
                          ? 'border-cobalt bg-cobalt/5'
                          : 'border-line hover:border-cobalt/30'
                      }`}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-ink">{cloud.name}</span>
                        <span className="text-muted">{cloud.percent}% used</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-paper p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-ink">{selectedProvider.name} storage</div>
                      <div className="text-xs text-muted">{selectedProvider.used} of {selectedProvider.total}</div>
                    </div>
                    <span className="rounded-full bg-cobalt/10 px-3 py-1 text-xs font-semibold text-cobalt">Open</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-line">
                    <div className="h-full rounded-full bg-cobalt" style={{ width: `${selectedProvider.percent}%` }}></div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <label
                      className="focus-ring flex-1 cursor-pointer rounded-xl border border-line bg-white px-4 py-3 text-sm text-muted"
                      onClick={() => cloudUploadRef.current?.click()}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="truncate">{uploadedCloudFile?.name || 'Choose a file to upload'}</span>
                        <span className="rounded-full bg-cobalt/10 px-2 py-1 text-xs font-semibold text-cobalt">
                          {uploadedCloudFile ? cloudFileExtension : 'TYPE'}
                        </span>
                      </div>
                      <input ref={cloudUploadRef} type="file" className="hidden" onChange={handleCloudUpload} />
                    </label>
                    <button
                      type="button"
                      onClick={() => cloudUploadRef.current?.click()}
                      className="focus-ring rounded-xl bg-mint px-4 py-3 text-sm font-semibold text-white"
                    >
                      Upload
                    </button>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {selectedProviderTypes.map((fileType) => (
                      <div key={fileType.type} className="rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink">
                        <div className="font-semibold">{fileType.type}</div>
                        <div className="text-muted">{fileType.count} files</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Files in {selectedProvider.name}</div>
                    <div className="space-y-2">
                      {(providerFiles[selectedCloud] || []).map((fileName) => (
                        <div key={fileName} className="rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink">
                          {fileName}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">AI Assistant</div>
                <div className="space-y-2 text-sm text-muted">
                  {recommendations.map((item) => (
                    <div key={item} className="rounded-2xl bg-paper p-3">✨ {item}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">Shared Files</div>
                <div className="space-y-2 text-sm text-muted">
                  {sharedFiles.map((item) => (
                    <div key={item.name} className="rounded-2xl bg-paper p-3">
                      <div className="font-semibold text-ink">{item.name}</div>
                      <div>{item.collaborator}</div>
                      <div>{item.status}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">Duplicates</div>
                <div className="space-y-2 text-sm text-muted">
                  {duplicates.map((item) => (
                    <div key={item.name} className="rounded-2xl bg-paper p-3">
                      <div className="font-semibold text-ink">{item.name}</div>
                      <div>{item.count}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">Activity Logs</div>
                <div className="space-y-2 text-sm text-muted">
                  {activityLogs.map((item) => (
                    <div key={item} className="rounded-2xl bg-paper p-3">• {item}</div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">Security Center</div>
                <div className="space-y-3 text-sm text-muted">
                  <div className="rounded-2xl bg-paper p-3">✅ 2 folders protected with advanced permissions</div>
                  <div className="rounded-2xl bg-paper p-3">⚠️ 1 public share link needs review</div>
                  <div className="rounded-2xl bg-paper p-3">🔐 MFA enabled across all connected accounts</div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">Recycle Bin & Settings</div>
                <div className="space-y-3 text-sm text-muted">
                  <div className="rounded-2xl bg-paper p-3">🗑️ 12 items in recycle bin</div>
                  <div className="rounded-2xl bg-paper p-3">⚙️ Sync rules, alerts, and permissions are active</div>
                  <div className="rounded-2xl bg-paper p-3">🔑 Workspace security policy is compliant</div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
