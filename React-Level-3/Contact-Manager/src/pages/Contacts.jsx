import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../api/axiosInstance";
import useDebounce from "../hooks/useDebounce";
import "./Contacts.css";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [preview, setPreview] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axiosInstance.get("/users");

      const data = res.data.slice(0, 6).map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company.name,
        image: "",
      }));

      setContacts(data);
    } catch {
      alert("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("profileImage", file);
      console.log("File uploaded:", formData.get("profileImage"));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.company) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      setContacts(
        contacts.map((contact) =>
          contact.id === editId
            ? { ...contact, ...form, image: preview || contact.image }
            : contact
        )
      );
      setEditId(null);
    } else {
      setContacts([
        { id: Date.now(), ...form, image: preview },
        ...contacts,
      ]);
    }

    setForm({ name: "", email: "", company: "" });
    setPreview("");
  };

  const editContact = (contact) => {
    setEditId(contact.id);
    setForm({
      name: contact.name,
      email: contact.email,
      company: contact.company,
    });
    setPreview(contact.image);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const chartData = contacts.map((contact) => ({
    name: contact.name.split(" ")[0],
    value: contact.company.length,
  }));

  return (
    <main className="dashboard-page">
      <section className="dashboard-container">
        <div className="hero">
          <h1>Contact Dashboard</h1>
          <p>
            Manage contacts using CRUD, Axios, Context API, Debouncing, File
            Upload, and Recharts.
          </p>
        </div>

        <div className="main-grid">
          <form className="form-card glass-card" onSubmit={handleSubmit}>
            <h2>{editId ? "✏️ Update Contact" : "➕ Add Contact"}</h2>

            <input
              name="name"
              placeholder="Contact name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
            />

            <input type="file" onChange={handleImage} />

            <div className="preview-box">
              {preview ? (
                <img src={preview} alt="preview" />
              ) : (
                <span>No image selected</span>
              )}
            </div>

            <button className="gradient-btn">
              {editId ? "Update Contact" : "Add Contact"}
            </button>
          </form>

          <div className="contacts-section">
            <div className="search-card glass-card">
              <input
                placeholder="🔍 Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="glass-card loading">Loading contacts...</div>
            ) : (
              <div className="cards-grid">
                {filteredContacts.map((contact, index) => (
                  <div className="contact-card glass-card" key={contact.id}>
                    <div className="contact-top">
                      {contact.image ? (
                        <img
                          src={contact.image}
                          alt={contact.name}
                          className="avatar-img"
                        />
                      ) : (
                        <div className={`avatar avatar-${index % 4}`}>
                          {contact.name.charAt(0)}
                        </div>
                      )}

                      <div>
                        <h3>{contact.name}</h3>
                        <p>{contact.email}</p>
                        <h4>{contact.company}</h4>
                      </div>
                    </div>

                    <div className="actions">
                      <button onClick={() => editContact(contact)} className="edit-btn">
                        Edit
                      </button>

                      <button onClick={() => deleteContact(contact.id)} className="delete-btn">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="chart-card glass-card">
          <h2>📊 Company Name Length Chart</h2>

          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contacts;