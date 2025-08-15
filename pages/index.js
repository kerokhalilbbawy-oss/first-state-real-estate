import { useState, useEffect } from "react";

function PropertyCard({ property }) {
  return (
    <div style={{
      border: "1px solid #eee",
      borderRadius: 10,
      marginBottom: 24,
      padding: 20,
      background: "#fafbfc"
    }}>
      <h2>{property.title}</h2>
      <p>الموقع: {property.location}</p>
      <p>السعر: {property.price} جنيه</p>
      <p>النوع: {property.type}</p>
      <p>الوصف: {property.description}</p>
    </div>
  );
}

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const props = JSON.parse(localStorage.getItem("properties") || "[]");
    setProperties(props);
  }, []);

  return (
    <div className="container">
      <h1>عقارات للبيع والإيجار</h1>
      {properties.length === 0 ? (
        <p>لا توجد عقارات حالياً.</p>
      ) : (
        properties.map((p, i) => (
          <PropertyCard key={i} property={p} />
        ))
      )}
      <div style={{marginTop: 40}}>
        <a href="/admin/login">دخول لوحة التحكم</a>
      </div>
    </div>
  );
}