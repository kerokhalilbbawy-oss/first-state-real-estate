import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    type: "",
    description: ""
  });

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "1") {
      window.location.href = "/admin/login";
    }
    const props = JSON.parse(localStorage.getItem("properties") || "[]");
    setProperties(props);
  }, []);

  function addProperty(e) {
    e.preventDefault();
    const newProps = [...properties, form];
    setProperties(newProps);
    localStorage.setItem("properties", JSON.stringify(newProps));
    setForm({ title: "", location: "", price: "", type: "", description: "" });
  }

  function removeProperty(idx) {
    const newProps = [...properties];
    newProps.splice(idx, 1);
    setProperties(newProps);
    localStorage.setItem("properties", JSON.stringify(newProps));
  }

  return (
    <div className="container">
      <div className="admin-header">
        <h1>لوحة التحكم</h1>
        <button onClick={() => {
          localStorage.removeItem("isAdmin");
          window.location.href = "/";
        }}>تسجيل الخروج</button>
      </div>
      <form onSubmit={addProperty}>
        <input
          required
          placeholder="عنوان العقار"
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
        />
        <input
          required
          placeholder="الموقع"
          value={form.location}
          onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
        />
        <input
          required
          type="number"
          placeholder="السعر"
          value={form.price}
          onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
        />
        <select
          required
          value={form.type}
          onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
        >
          <option value="">نوع العقار</option>
          <option value="شقة">شقة</option>
          <option value="فيلا">فيلا</option>
          <option value="محل">محل</option>
        </select>
        <textarea
          required
          placeholder="وصف"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        />
        <button type="submit">إضافة عقار</button>
      </form>
      <h2>العقارات الحالية</h2>
      {properties.length === 0 ? (
        <p>لا توجد عقارات.</p>
      ) : (
        properties.map((p, i) => (
          <div key={i} style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            marginBottom: 18,
            padding: 14
          }}>
            <b>{p.title}</b> | {p.type} | {p.location} | {p.price} جنيه
            <br />
            <small>{p.description}</small>
            <br />
            <button style={{background: "#d32f2f", marginTop: 8}} onClick={() => removeProperty(i)}>حذف</button>
          </div>
        ))
      )}
    </div>
  );
}