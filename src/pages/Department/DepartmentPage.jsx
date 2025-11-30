import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './DepartmentPage.css';

//Api Key
const API = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
const USE_MOCK = String(import.meta.env.VITE_USE_MOCK || '') === '1';
const MOCK_KEY = 'mock_department';
const MOCK_ADMIN_KEY = 'mock_admin';

export default function DepartmentPage() {
  const [dept, setDept] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Editing UI state per section
  const [editing, setEditing] = useState({
    placement: false,
    timetable: false,
    fees: false,
    syllabus: false,
    holidays: false,
  });

  // Local editors for placements/timetable/fees/syllabus
  const [placementEdit, setPlacementEdit] = useState(null);
  const [timetableEdit, setTimetableEdit] = useState([]); // deep copy array
  const [feesEdit, setFeesEdit] = useState([]);
  const [syllabusEdit, setSyllabusEdit] = useState([]);
  const [holidaysEdit, setHolidaysEdit] = useState([]);

  const [savingSection, setSavingSection] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        if (USE_MOCK) {
          const raw = localStorage.getItem(MOCK_KEY);
          let data = raw ? JSON.parse(raw) : null;
          if (!data) {
            data = {
              placement:{
                lastYear:'2024-25', totalPlaced:72, topCompanies:['Infosys','TCS'], highestPackage:'30 LPA', averagePackage:'6.5 LPA', reportLink:''
              },
              timetable:[{year:'First Year', table:[['Mon','9:00-10:00','Maths']]}],
              holidays:[],
              fees:[{head:'Tuition', amount:'₹20,000'}],
              syllabus:[{title:'First Year Syllabus', link:''}],
              lastUpdated: new Date().toISOString()
            };
            localStorage.setItem(MOCK_KEY, JSON.stringify(data));
          }
          if (mounted) {
            setDept(data);
            setIsAdmin(localStorage.getItem(MOCK_ADMIN_KEY) === '1');
          }
        } else {
          const res = await fetch(`${API}/api/department`);
          if (!res.ok) throw new Error(`API ${res.status}`);
          const json = await res.json();
          if (mounted) setDept(json);

          // check admin
          try {
            const check = await fetch(`${API}/api/admin/check`, { method: 'GET', credentials: 'include' });
            const checkJson = await check.json().catch(()=>({ isAdmin:false }));
            if (mounted) setIsAdmin(Boolean(checkJson.isAdmin));
          } catch {
            if (mounted) setIsAdmin(false);
          }
        }
      } catch (e) {
        if (mounted) setErr(String(e.message || e));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    // when dept loads, initialize editors
    if (dept) {
      setPlacementEdit(dept.placement ? { ...dept.placement } : { lastYear:'', totalPlaced:0, topCompanies:[], highestPackage:'', averagePackage:'', reportLink:'' });
      setTimetableEdit(dept.timetable ? JSON.parse(JSON.stringify(dept.timetable)) : []);
      setFeesEdit(dept.fees ? JSON.parse(JSON.stringify(dept.fees)) : []);
      setSyllabusEdit(dept.syllabus ? JSON.parse(JSON.stringify(dept.syllabus)) : []);
      setHolidaysEdit(dept.holidays ? JSON.parse(JSON.stringify(dept.holidays)) : []);
    }
  }, [dept]);

  if (loading) return <div className="department-container"><p>Loading...</p></div>;
  if (err) return <div className="department-container"><p className="error">Error: {err}</p></div>;
  if (!dept) return <div className="department-container"><p>No data.</p></div>;

  const hasPdf = (url) => !!(url && typeof url === 'string' && url.trim() !== '');

  // Generic save: sends full updated department object (backend expects full object)
  async function saveSection(sectionName, newValue) {
    setSavingSection(sectionName);
    try {
      const updated = { ...dept, lastUpdated: new Date().toISOString() };
      updated[sectionName] = newValue;

      if (USE_MOCK) {
        localStorage.setItem(MOCK_KEY, JSON.stringify(updated));
        setDept(updated);
        // update editors
        setEditing(prev => ({ ...prev, [sectionName]: false }));
        alert(`${sectionName} saved (mock).`);
      } else {
        const res = await fetch(`${API}/api/department`, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });
        const json = await res.json().catch(()=>({}));
        if (!res.ok) throw new Error(json.error || 'Save failed');
        // server should return { department: ... } or success; handle both
        const newDept = (json.department) ? json.department : updated;
        setDept(newDept);
        setEditing(prev => ({ ...prev, [sectionName]: false }));
        alert(`${sectionName} saved.`);
      }
    } catch (e) {
      alert('Save failed: ' + (e.message || e));
    } finally {
      setSavingSection(null);
    }
  }

  // ---------- Placement handlers ----------
  function startEditPlacement() {
    setPlacementEdit({ ...(dept.placement || {}) });
    setEditing(prev => ({ ...prev, placement: true }));
  }
  function addTopCompany(name) {
    if (!name) return;
    setPlacementEdit(prev => ({ ...prev, topCompanies: [...(prev.topCompanies || []), name] }));
  }
  function removeTopCompany(idx) {
    setPlacementEdit(prev => ({ ...prev, topCompanies: (prev.topCompanies || []).filter((_,i)=>i!==idx) }));
  }

  // ---------- Timetable handlers ----------
  function addYear() {
    setTimetableEdit(prev => [...prev, { year: 'New Year', table: [] }]);
  }
  function removeYear(idx) {
    setTimetableEdit(prev => prev.filter((_,i)=>i!==idx));
  }
  function addRowToYear(yearIdx) {
    setTimetableEdit(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[yearIdx].table = copy[yearIdx].table || [];
      copy[yearIdx].table.push(['Day','Time','Subject']);
      return copy;
    });
  }
  function removeRowFromYear(yearIdx, rowIdx) {
    setTimetableEdit(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[yearIdx].table.splice(rowIdx,1);
      return copy;
    });
  }
  function updateTimetableCell(yearIdx,rowIdx,col,value) {
    setTimetableEdit(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[yearIdx].table[rowIdx][col] = value;
      return copy;
    });
  }
  function updateYearTitle(yearIdx, value) {
    setTimetableEdit(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[yearIdx].year = value;
      return copy;
    });
  }

  // ---------- Fees handlers ----------
  function addFee() {
    setFeesEdit(prev => [...prev, { head: 'New Head', amount: '' }]);
  }
  function updateFee(idx, field, value) {
    setFeesEdit(prev => prev.map((f,i)=> i===idx ? { ...f, [field]: value } : f));
  }
  function removeFee(idx) {
    setFeesEdit(prev => prev.filter((_,i)=>i!==idx));
  }

  // ---------- Syllabus handlers ----------
  function addSyllabus() {
    setSyllabusEdit(prev => [...prev, { title: 'New Syllabus', link: '' }]);
  }
  function updateSyllabus(idx, field, value) {
    setSyllabusEdit(prev => prev.map((s,i)=> i===idx ? { ...s, [field]: value } : s));
  }
  function removeSyllabus(idx) {
    setSyllabusEdit(prev => prev.filter((_,i)=>i!==idx));
  }

  // ---------- Holidays handlers (already had add/remove) ----------
  function addHolidayFromEdit(newHoliday) {
    setHolidaysEdit(prev => [newHoliday, ...(prev||[])]);
  }
  function removeHolidayEdit(idx) {
    setHolidaysEdit(prev => prev.filter((_,i)=>i!==idx));
  }

  // ---------- Render ----------
  return (
    <div className="department-container">
      <header className="dept-header">
        <h1>Department</h1>
      </header>

      <section className="dept-actions">
        {isAdmin && <span className="admin-badge">Admin mode</span>}
      </section>

      {/* ========== Placement ========== */}
      <section className="placement-section">
        <div className="placement-card">
          <div className="section-header">
            <h2>Placement Overview</h2>
            {isAdmin && !editing.placement && <button className="edit-toggle" onClick={startEditPlacement}>Edit</button>}
          </div>

          {!editing.placement ? (
            <>
              <div className="placement-grid">
                <div><p className="label">Academic Year</p><p className="value">{dept.placement?.lastYear}</p></div>
                <div><p className="label">Placed</p><p className="value">{dept.placement?.totalPlaced}</p></div>
                <div><p className="label">Highest</p><p className="value">{dept.placement?.highestPackage}</p></div>
                <div><p className="label">Average</p><p className="value">{dept.placement?.averagePackage}</p></div>
              </div>
              <div className="recruiters">
                <p className="label">Top Recruiters</p>
                <ul>{(dept.placement?.topCompanies||[]).map((c,i)=><li key={i}>{c}</li>)}</ul>
                {dept.placement?.reportLink && <a href={dept.placement.reportLink} target="_blank" rel="noopener noreferrer" className="download-btn">Open Placement Report</a>}
              </div>
            </>
          ) : (
            <div className="edit-box">
              <label>Academic Year</label>
              <input value={placementEdit.lastYear||''} onChange={e=>setPlacementEdit({...placementEdit, lastYear: e.target.value})} />
              <label>Placed</label>
              <input type="number" value={placementEdit.totalPlaced||0} onChange={e=>setPlacementEdit({...placementEdit, totalPlaced: Number(e.target.value)})} />
              <label>Highest Package</label>
              <input value={placementEdit.highestPackage||''} onChange={e=>setPlacementEdit({...placementEdit, highestPackage: e.target.value})} />
              <label>Average Package</label>
              <input value={placementEdit.averagePackage||''} onChange={e=>setPlacementEdit({...placementEdit, averagePackage: e.target.value})} />
              <label>Report Link</label>
              <input value={placementEdit.reportLink||''} onChange={e=>setPlacementEdit({...placementEdit, reportLink: e.target.value})} placeholder="/assets/report.pdf" />

              <div className="subsection">
                <p className="label">Top Recruiters</p>
                <ul className="inline-list">
                  {(placementEdit.topCompanies||[]).map((c,i)=>(
                    <li key={i}>
                      <input value={c} onChange={e=> {
                        const arr = [...(placementEdit.topCompanies||[])]; arr[i]=e.target.value;
                        setPlacementEdit({...placementEdit, topCompanies: arr});
                      }} />
                      <button onClick={()=>removeTopCompany(i)} className="small-danger">x</button>
                    </li>
                  ))}
                </ul>
                <div style={{marginTop:8}}>
                  <input id="newTopCompany" placeholder="New recruiter name" />
                  <button onClick={()=>{
                    const el = document.getElementById('newTopCompany');
                    if(el?.value) { addTopCompany(el.value); el.value=''; setPlacementEdit(prev=>({...prev, topCompanies: prev.topCompanies || [...(prev.topCompanies||[])]})); }
                  }}>Add</button>
                </div>
              </div>

              <div className="form-actions">
                <button onClick={()=>saveSection('placement', placementEdit)} disabled={savingSection==='placement'}>{savingSection==='placement' ? 'Saving…' : 'Save'}</button>
                <button onClick={()=>setEditing(prev=>({...prev, placement:false}))}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* Holidays column (table markup) */}
        <aside className="holiday-card">
          <h3>Holidays</h3>

          {isAdmin && (
            <div className="admin-announce">
              <button className="announce-toggle" onClick={()=>setEditing(prev=>({...prev, holidays: !prev.holidays}))}>
                {editing.holidays ? 'Close' : 'Announce Holiday'}
              </button>

              {editing.holidays && (
                <form className="announce-form" onSubmit={(e)=>{ e.preventDefault(); const fd=new FormData(e.target); const newH={ date: fd.get('date'), name: fd.get('name'), noticeLink: fd.get('noticeLink') || '' }; const newArr = [newH, ...(dept.holidays||[])]; saveSection('holidays', newArr); }}>
                  <div className="form-row"><label>Date</label><input name="date" type="date" required /></div>
                  <div className="form-row"><label>Name</label><input name="name" type="text" required /></div>
                  <div className="form-row"><label>PDF link (optional)</label><input name="noticeLink" type="text" placeholder="/assets/holidays/holiday.pdf" /></div>
                  <div className="form-row form-actions"><button type="submit">Save</button></div>
                </form>
              )}
            </div>
          )}

          {(dept.holidays && dept.holidays.length > 0) ? (
            <div className="table-wrap">
              <table className="card-table holiday-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Holiday</th>
                    <th className="center">Notice</th>
                  </tr>
                </thead>
                <tbody>
                  {dept.holidays.map((h, idx) => (
                    <tr key={`${h.date}-${idx}`}>
                      <td>{new Date(h.date).toLocaleDateString()}</td>
                      <td>
                        <div style={{fontWeight:600}}>{h.name}</div>
                      </td>
                      <td className="row-actions">
                        {hasPdf(h.noticeLink) ? (
                          <>
                            <a href={h.noticeLink} target="_blank" rel="noopener noreferrer" className="pdf-btn view">Open</a>
                            <a href={h.noticeLink} download className="pdf-btn download">Download</a>
                          </>
                        ) : (
                          <span className="no-pdf">No Notice</span>
                        )}

                        {isAdmin && (
                          <button
                            className="delete-btn"
                            onClick={() => { if(!confirm('Remove this announcement?')) return; const arr=(dept.holidays||[]).filter((_,i)=>i!==idx); saveSection('holidays', arr); }}
                            title="Remove announcement"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-announcement">No Notice</div>
          )}
        </aside>
      </section>

      {/* ========== Timetable ========== */}
      <section className="timetable-section">
        <div className="section-header">
          <h2>Class Timetable</h2>
          {isAdmin && !editing.timetable && <button className="edit-toggle" onClick={()=>{ setTimetableEdit(JSON.parse(JSON.stringify(dept.timetable||[]))); setEditing(prev=>({...prev, timetable:true})); }}>Edit</button>}
        </div>

        {!editing.timetable ? (
          dept.timetable?.map(y=>(
            <div key={y.year} className="year-card">
              <h3>{y.year}</h3>
              <div className="table-wrap">
                <table className="timetable-table card-table">
                  <thead><tr><th>Day</th><th>Time</th><th>Subject</th></tr></thead>
                  <tbody>{y.table?.map((r,i)=><tr key={i}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="edit-box">
              <button onClick={addYear}>Add Year</button>
              {timetableEdit.map((yr, yi)=>(
                <div key={yi} className="timetable-edit-year">
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <input value={yr.year} onChange={e=>updateYearTitle(yi,e.target.value)} />
                    <button className="small-danger" onClick={()=>removeYear(yi)}>Remove Year</button>
                  </div>
                  <table className="timetable-table card-table">
                    <thead><tr><th>Day</th><th>Time</th><th>Subject</th><th></th></tr></thead>
                    <tbody>
                      {yr.table?.map((r,ri)=>(
                        <tr key={ri}>
                          <td><input value={r[0]} onChange={e=>updateTimetableCell(yi,ri,0,e.target.value)} /></td>
                          <td><input value={r[1]} onChange={e=>updateTimetableCell(yi,ri,1,e.target.value)} /></td>
                          <td><input value={r[2]} onChange={e=>updateTimetableCell(yi,ri,2,e.target.value)} /></td>
                          <td><button className="small-danger" onClick={()=>removeRowFromYear(yi,ri)}>Remove</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{marginTop:6}}>
                    <button onClick={()=>addRowToYear(yi)}>Add Row</button>
                  </div>
                </div>
              ))}
              <div className="form-actions" style={{marginTop:12}}>
                <button onClick={()=>saveSection('timetable', timetableEdit)} disabled={savingSection==='timetable'}>{savingSection==='timetable' ? 'Saving…' : 'Save'}</button>
                <button onClick={()=>setEditing(prev=>({...prev, timetable:false}))}>Cancel</button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* ========== Fees & Syllabus ========== */}
      <section className="fees-syllabus-section">
        <div className="fees-card">
          <div className="section-header">
            <h2>Fees Structure</h2>
            {isAdmin && !editing.fees && <button className="edit-toggle" onClick={()=>{ setFeesEdit(JSON.parse(JSON.stringify(dept.fees||[]))); setEditing(prev=>({...prev, fees:true})); }}>Edit</button>}
          </div>

          {!editing.fees ? (
            <div className="table-wrap">
              <table className="fees-table card-table">
                <thead><tr><th>Head</th><th>Amount</th></tr></thead>
                <tbody>{dept.fees?.map(f=> <tr key={f.head}><td>{f.head}</td><td className="right">{f.amount}</td></tr>)}</tbody>
              </table>
            </div>
          ) : (
            <div className="edit-box">
              <button onClick={addFee}>Add Fee Row</button>
              <div style={{marginTop:8}}>
                {feesEdit.map((f,i)=>(
                  <div key={i} style={{display:'flex',gap:8,alignItems:'center',marginBottom:6}}>
                    <input value={f.head} onChange={e=>updateFee(i,'head',e.target.value)} />
                    <input value={f.amount} onChange={e=>updateFee(i,'amount',e.target.value)} />
                    <button className="small-danger" onClick={()=>removeFee(i)}>Remove</button>
                  </div>
                ))}
              </div>
              <div className="form-actions">
                <button onClick={()=>saveSection('fees', feesEdit)} disabled={savingSection==='fees'}>{savingSection==='fees' ? 'Saving…' : 'Save'}</button>
                <button onClick={()=>setEditing(prev=>({...prev, fees:false}))}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        <div className="syllabus-card">
          <div className="section-header">
            <h2>Syllabus</h2>
            {isAdmin && !editing.syllabus && <button className="edit-toggle" onClick={()=>{ setSyllabusEdit(JSON.parse(JSON.stringify(dept.syllabus||[]))); setEditing(prev=>({...prev, syllabus:true})); }}>Edit</button>}
          </div>

          {!editing.syllabus ? (
            <div className="table-wrap">
              <table className="card-table syllabus-table">
                <thead>
                  <tr><th>Title</th><th className="center">Actions</th></tr>
                </thead>
                <tbody>
                  {dept.syllabus?.map((s, i) => (
                    <tr key={s.title + i}>
                      <td>
                        <div className="syllabus-title">{s.title}</div>
                        {s.link && <div className="small-muted" style={{marginTop:6}}>{s.link}</div>}
                      </td>
                      <td className="row-actions">
                        {hasPdf(s.link) ? (
                          <>
                            <a href={s.link} target="_blank" rel="noopener noreferrer" className="pdf-btn view">Open</a>
                            <a href={s.link} download className="pdf-btn download">Download</a>
                          </>
                        ) : (
                          <span className="no-pdf">No PDF</span>
                        )}
                        {isAdmin && (
                          <button className="delete-btn" onClick={() => { if(!confirm('Remove this syllabus?')) return; const arr = (dept.syllabus||[]).filter((_,idx)=>idx!==i); saveSection('syllabus', arr); }}>
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="edit-box">
              <button onClick={addSyllabus}>Add Syllabus</button>
              <div style={{marginTop:8}}>
                {syllabusEdit.map((s,i)=>(
                  <div key={i} style={{display:'flex',gap:8,alignItems:'center',marginBottom:6}}>
                    <input value={s.title} onChange={e=>updateSyllabus(i,'title',e.target.value)} placeholder="Title" />
                    <input value={s.link} onChange={e=>updateSyllabus(i,'link',e.target.value)} placeholder="/assets/syllabus.pdf" />
                    <button className="small-danger" onClick={()=>removeSyllabus(i)}>Remove</button>
                  </div>
                ))}
              </div>
              <div className="form-actions">
                <button onClick={()=>saveSection('syllabus', syllabusEdit)} disabled={savingSection==='syllabus'}>{savingSection==='syllabus' ? 'Saving…' : 'Save'}</button>
                <button onClick={()=>setEditing(prev=>({...prev, syllabus:false}))}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="dept-footer">Last updated: {dept.lastUpdated ? new Date(dept.lastUpdated).toLocaleString() : '—'}</footer>
    </div>
  );
}
