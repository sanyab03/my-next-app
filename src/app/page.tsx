"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface FormDataState {
  name: string;
  email: string;
  linkedin: string;
  resume: File | null;
  skills: string;
}

export default function CandidateForm() {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    linkedin: "",
    resume: null,
    skills: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prevData) => ({ ...prevData, resume: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("linkedin", formData.linkedin);
    formDataToSend.append("skills", formData.skills);

    if (formData.resume) {
      formDataToSend.append("resume", formData.resume);
    }

    console.log("Submitting", Object.fromEntries(formDataToSend.entries()));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <div className="w-full max-w-lg p-8 bg-white shadow-2xl rounded-2xl border border-gray-300">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Candidate Application</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 shadow-sm"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 shadow-sm"
            required
          />
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn Profile URL"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 shadow-sm"
          />
          <input
            type="file"
            name="resume"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 shadow-sm"
          />
          <textarea
            name="skills"
            placeholder="Skills & Experience"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 shadow-sm resize-none"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-3 rounded-lg hover:opacity-90 transition duration-300 font-semibold text-lg shadow-md"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
