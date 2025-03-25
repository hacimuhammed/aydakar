import { pacificoFont } from "@/app/fonts/pacifico";
import ContactForm from "@/components/forms/contact-form";
import React from "react";

export async function generateMetadata() {
  return {
    title: "İletişim",
    description: "İletişim sayfası",
  };
}

const ContactPage = () => {
  return (
    <div className="w-full flex flex-col gap-16">
      <div className="mt-16 md:mt-10 w-full flex-col md:flex-row min-h-screen flex justify-center items-center gap-16 py-16 md:px-16 px-8">
        <div className="w-full md:w-1/2 max-w-4xl">
          <h1 className={`text-4xl font-bold ${pacificoFont} mb-4`}>
            İletişim
          </h1>
          <p className="text-sm md:text-xl text-gray-500">
            Büyümeye hazır mısın?
          </p>
          <p className="text-sm md:text-xl text-gray-500">
            Aklınıza takılan herhangi bir soru varsa, bize ulaşın.
          </p>
        </div>
        <div className="w-full md:w-1/2 max-w-4xl bg-card/60 px-10 rounded-2xl border-2 border-border">
          <ContactForm />
        </div>
      </div>
      <div className="px-3 w-full flex justify-center items-center">
        <div className="container rounded-2xl overflow-hidden justify-center flex items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24821.638712711327!2d26.792655364534774!3d38.953570913332044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ba3f487f2ddea7%3A0xeec439ad5d259b76!2zRGVuaXprw7Z5LCAzNTk4MCBEaWtpbGkvxLB6bWly!5e0!3m2!1str!2str!4v1739207071405!5m2!1str!2str"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            className="dark:brightness-50 dark:hover:brightness-75 transition-all duration-300"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
