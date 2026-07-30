"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const Contact = () => {
  const { dict } = useLanguage();
  const [contactData, setContactData] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContactData(data?.contactLinks);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const reset = () => {
    formData.name = "";
    formData.number = "";
    formData.email = "";
    formData.message = "";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    fetch("https://formsubmit.co/ajax/dhandynuzirwan@gmail.com", {
      method: "POST",
      headers: { "Content-type": "application/json", "Accept": "application/json"},
      body: JSON.stringify({
        name: formData.name,
        number: formData.number,
        email: formData.email,
        message: formData.message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmitted(data.success);
        reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section id="contact" className="bg-slate-50 dark:bg-slate-950 relative overflow-hidden print:hidden">
      <div className="container">
        <div className="pt-16 md:pt-32 pb-20">
          <div className="flex items-center justify-between gap-2 border-b border-slate-900 dark:border-white pb-7 mb-9 md:mb-16">
            <h2 className="text-slate-900 dark:text-white">{dict.contact.title}</h2>
            <p className="text-xl text-primary">( 05 )</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-7 sm:gap-12">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="label">
                      {dict.contact.name}
                    </label>
                    <input
                      required
                      className="input"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="number" className="label">
                      {dict.contact.phone}
                    </label>
                    <input
                      required
                      className="input"
                      id="number"
                      type="number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="label">
                    {dict.contact.email}
                  </label>
                  <input
                    required
                    className="input"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="label">
                    {dict.contact.message}
                  </label>
                  <textarea
                    required
                    className="input"
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
                {submitted && (
                  <div className="flex items-center gap-2">
                    <Image
                      src={getImgPath("/images/icon/success-icon.svg")}
                      alt="success-icon"
                      width={30}
                      height={30}
                    />
                    <p className="text-secondary dark:text-slate-300">
                      {dict.contact.success}
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  className="relative overflow-hidden cursor-pointer w-fit py-3 md:py-4 px-6 md:px-8 bg-primary text-white font-medium rounded-full hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
                >
                  <span className="relative z-10 text-lg md:text-xl">
                    {dict.contact.send}
                  </span>
                </button>
              </div>
            </form>
            <div className="flex flex-col sm:flex-row md:flex-col justify-between gap-5 md:gap-20 items-center md:items-end">
              <div className="flex flex-wrap flex-row md:flex-col items-start md:items-end gap-4 md:gap-6">
                {contactData?.socialLinks?.map((value: any, index: any) => {
                  return (
                    <div key={index}>
                      <Link
                        className="text-base sm:text-lg font-normal text-secondary dark:text-slate-400 hover:text-primary dark:hover:text-primary"
                        // onClick={(e) => e.preventDefault()}
                        href={value?.href}
                        target="_blank" // Wajib untuk sosmed agar portfolio tidak tertutup
                        rel="noopener noreferrer" // Security best practice
                      >
                        {value?.title}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap justify-center gap-5 lg:gap-11 items-end">
                {contactData?.contactInfo?.map((value: any, index: any) => {
                  return (
                    <div key={index}>
                      <Link
                        // onClick={(e) => e.preventDefault()}
                        href={value?.link}
                        target="_blank" // Wajib untuk sosmed agar portfolio tidak tertutup
                        rel="noopener noreferrer" // Security best practice
                        className="text-base lg:text-lg text-slate-900 dark:text-white font-normal border-b border-slate-900 dark:border-white pb-3 hover:text-primary hover:border-primary dark:hover:text-primary dark:hover:border-primary"
                      >
                        {value?.label}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
