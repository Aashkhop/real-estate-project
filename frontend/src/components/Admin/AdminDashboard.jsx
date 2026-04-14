import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllContent, updateContent } from '../../api';

const AdminDashboard = () => {
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    const load = async () => {
      try {
        const data = await fetchAllContent();
        setContent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  const handleSave = async (section) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      await updateContent(section, content[section], token);
      alert('Content updated successfully!');
    } catch (err) {
      alert('Failed to update content');
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  if (loading || !content) return <div className="loader" style={{marginTop: '20vh'}}></div>;

  const renderInputs = (obj, path = []) => {
    return Object.keys(obj).map(key => {
      if (Array.isArray(obj[key])) {
        // Render Array of Objects (e.g. amenities, stats, faqs)
        return (
          <div key={key} style={{marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '8px'}}>
            <h4 style={{marginBottom: '10px', textTransform: 'capitalize'}}>{key}</h4>
            {obj[key].map((item, index) => (
              <div key={index} style={{display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap'}}>
                {Object.keys(item).map(subKey => {
                  if (subKey === 'id' || subKey === 'icon') return null; // Skip non-editable or internal keys
                  return (
                    <input
                      key={subKey}
                      value={item[subKey]}
                      onChange={(e) => {
                        const newContent = { ...content };
                        let current = newContent[activeTab];
                        for (let p of path) {
                          current = current[p];
                        }
                        current[key][index][subKey] = e.target.value;
                        setContent(newContent);
                      }}
                      placeholder={subKey}
                      style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px', flex: 1, minWidth: '200px'}}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        );
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        return renderInputs(obj[key], [...path, key]);
      } else {
        return (
          <div key={key} style={{marginBottom: '15px'}}>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: '500', textTransform: 'capitalize'}}>{key.replace('_', ' ')}</label>
            {key.startsWith('p') || key === 'description' ? (
              <textarea
                value={obj[key]}
                onChange={(e) => {
                  const newContent = { ...content };
                  let current = newContent[activeTab];
                  for (let p of path) current = current[p];
                  current[key] = e.target.value;
                  setContent(newContent);
                }}
                style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', minHeight: '100px'}}
              />
            ) : (
              <input
                value={obj[key]}
                onChange={(e) => {
                  const newContent = { ...content };
                  let current = newContent[activeTab];
                  for (let p of path) current = current[p];
                  current[key] = e.target.value;
                  setContent(newContent);
                }}
                style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}
              />
            )}
          </div>
        );
      }
    });
  };

  const sections = Object.keys(content);

  return (
    <div className="admin-grid">
      <div className="admin-sidebar">
        <h2 style={{marginBottom: '30px', color: 'var(--primary)'}}>Admin Panel</h2>
        {sections.map(section => (
          <div 
            key={section}
            onClick={() => setActiveTab(section)}
            style={{
              padding: '10px 15px', 
              cursor: 'pointer', 
              borderRadius: '5px',
              marginBottom: '5px',
              background: activeTab === section ? 'rgba(255,255,255,0.1)' : 'transparent',
              textTransform: 'capitalize'
            }}
          >
            {section} Section
          </div>
        ))}
        <button onClick={logout} style={{marginTop: '30px', width: '100%', padding: '10px', background: '#dc2626', color: 'white', borderRadius: '5px'}}>Logout</button>
      </div>

      <div className="admin-main">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h2 style={{textTransform: 'capitalize'}}>{activeTab} Settings</h2>
          <button 
            onClick={() => handleSave(activeTab)} 
            className="btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <div style={{background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'}}>
          {renderInputs(content[activeTab])}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
