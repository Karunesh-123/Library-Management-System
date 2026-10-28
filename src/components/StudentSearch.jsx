export default function StudentSearch({ value, onChange, onSearch, matches, onChoose }) {
  return <section className="content-card tracking-search-card">
    <div className="tracking-search-copy"><div className="search-emblem">⌕</div><div><h2>Find a student</h2><p>Search by Student Name or Student ID</p></div></div>
    <div className="tracking-search-input"><input value={value} onChange={onChange} placeholder="e.g. Rahul Sharma or STU-1001" />
      {value && matches.length > 0 && <div className="search-suggestions">{matches.slice(0, 5).map((student) => <button type="button" key={student.id} onClick={() => onChoose(student)}>{student.name}<span>{student.studentId}</span></button>)}</div>}
    </div><button type="button" className="primary-button" onClick={onSearch}>Search student</button>
  </section>;
}
