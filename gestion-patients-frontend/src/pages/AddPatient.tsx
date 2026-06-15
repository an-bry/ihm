import React, { useState } from "react";
import { createPatient } from "../services/patientService";

const AddPatient = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    sexe: "",
    date_naissance: "",
    telephone: "",
    adresse: "",
    contact_urgence: "",
    telephone_urgence: "",
    groupe_sanguin: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      sexe: "",
      date_naissance: "",
      telephone: "",
      adresse: "",
      contact_urgence: "",
      telephone_urgence: "",
      groupe_sanguin: "",
    });
    setStep(1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createPatient(formData);

      setSuccess(true); // ✅ SUCCESS ALERT
      resetForm();

      setTimeout(() => setSuccess(false), 3000); // auto hide

    } catch (error) {
      alert("Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">

      {/* SUCCESS ALERT */}
      {success && (
  <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
    <div className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn">
      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
      <span className="font-medium">
        Patient ajouté avec succès
      </span>
    </div>
  </div>
)}
      <div className="flex w-full max-w-5xl gap-6">

        {/* SIDEBAR WORKFLOW */}
        <div className="w-80 bg-blue-800 text-white rounded-3xl p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-10">Workflow Patient</h2>

          <div className="space-y-5">

            <div className={`flex items-center gap-3 ${step === 1 ? "font-bold" : "opacity-60"}`}>
              <div className="w-8 h-8 rounded-full bg-white text-blue-800 flex items-center justify-center">
                1
              </div>
              Infos personnelles
            </div>

            <div className={`flex items-center gap-3 ${step === 2 ? "font-bold" : "opacity-60"}`}>
              <div className="w-8 h-8 rounded-full bg-white text-blue-800 flex items-center justify-center">
                2
              </div>
              Contact & Médical
            </div>

          </div>
        </div>

        {/* FORM */}
        <div className="flex-1 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8">

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-6">Informations personnelles</h2>

              <div className="grid grid-cols-2 gap-4">

                <input name="nom" placeholder="Nom" onChange={handleChange}
                  className="border p-3 rounded-xl" />

                <input name="prenom" placeholder="Prénom" onChange={handleChange}
                  className="border p-3 rounded-xl" />

                {/* SEXE */}
                <div className="col-span-2 flex gap-4">

                  <label className="cursor-pointer">
                    <input type="radio" name="sexe" value="M"
                      onChange={handleChange} className="hidden peer" />
                    <div className="px-5 py-2 border rounded-xl peer-checked:bg-blue-600 peer-checked:text-white">
                      Homme
                    </div>
                  </label>

                  <label className="cursor-pointer">
                    <input type="radio" name="sexe" value="F"
                      onChange={handleChange} className="hidden peer" />
                    <div className="px-5 py-2 border rounded-xl peer-checked:bg-pink-500 peer-checked:text-white">
                      Femme
                    </div>
                  </label>

                </div>

                <input type="date" name="date_naissance"
                  onChange={handleChange} className="border p-3 rounded-xl col-span-2" />

                <input name="telephone" placeholder="Téléphone"
                  onChange={handleChange} className="border p-3 rounded-xl col-span-2" />

                <input name="adresse" placeholder="Adresse"
                  onChange={handleChange} className="border p-3 rounded-xl col-span-2" />

              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-6">Contact & Médical</h2>

              <div className="grid grid-cols-2 gap-4">

                <input name="contact_urgence"
                  placeholder="Contact urgence"
                  onChange={handleChange}
                  className="border p-3 rounded-xl" />

                <input name="telephone_urgence"
                  placeholder="Téléphone urgence"
                  onChange={handleChange}
                  className="border p-3 rounded-xl" />

                <select name="groupe_sanguin"
                  onChange={handleChange}
                  className="border p-3 rounded-xl col-span-2">
                  <option>Groupe sanguin</option>
                  <option>O+</option>
                  <option>A+</option>
                  <option>B+</option>
                  <option>AB+</option>
                </select>

              </div>

              <div className="flex justify-between mt-6">

                <button
                  onClick={() => setStep(1)}
                  className="border px-6 py-3 rounded-xl"
                >
                  Retour
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl"
                >
                  {loading ? "Enregistrement..." : "Enregistrer"}
                </button>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AddPatient;