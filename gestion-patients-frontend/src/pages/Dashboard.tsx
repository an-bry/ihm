import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const [data, setData] = useState<any>({
    rdv_today: 0,
    rdv_confirmed: 0,
    consultations: 0,
    patients: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost/backend/dashboard.php")
      .then(res => {
        console.log("DASHBOARD =", res.data);
        setData(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const Card = ({ title, value, color }: any) => (
    <div className={`p-6 rounded-2xl shadow-lg text-white ${color}`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">
        {loading ? "..." : value}
      </p>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <Card
          title="RDV aujourd'hui"
          value={data.rdv_today}
          color="bg-blue-600"
        />

        <Card
          title="RDV confirmés"
          value={data.rdv_confirmed}
          color="bg-green-600"
        />

        <Card
          title="Consultations"
          value={data.consultations}
          color="bg-purple-600"
        />

        <Card
          title="Patients"
          value={data.patients}
          color="bg-orange-500"
        />

      </div>

    </div>
  );
}