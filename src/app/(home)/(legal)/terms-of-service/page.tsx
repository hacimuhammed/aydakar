import React from "react";

export async function generateMetadata() {
  return {
    title: "Kullanım Sözleşmesi",
    description:
      "Bu kullanım sözleşmesi, hizmetimizi kullanırken uymanız gereken kuralları ve şartları açıklar.",
  };
}

const TermsOfService = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Kullanım Sözleşmesi</h1>
      <p className="text-sm text-gray-500">
        Bu kullanım sözleşmesi, hizmetimizi kullanırken uymanız gereken
        kuralları ve şartları açıklar.
      </p>

      <div className="flex flex-col gap-4 mt-8">
        <h2 className="text-lg font-bold">Hizmet Kullanımı</h2>
        <p className="text-sm text-gray-500">
          Kullanıcılar, hizmeti yasalara ve ahlaki kurallara uygun şekilde
          kullanmalıdır.
        </p>
        <p className="text-sm text-gray-500">
          Hesap güvenliğinden kullanıcı sorumludur, üçüncü şahıslarla
          paylaşılması önerilmez.
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <h2 className="text-lg font-bold">Yasaklı Davranışlar</h2>
        <p className="text-sm text-gray-500">
          Kullanıcılar aşağıdaki yasaklı davranışlardan kaçınmalıdır:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-500">
          <li>Spam veya kötü amaçlı içerik paylaşımı</li>
          <li>Başka kullanıcıların gizliliğini ihlal etme</li>
          <li>Hizmeti kötüye kullanma veya sistemleri manipüle etme</li>
          <li>Yasal olmayan faaliyetlerde bulunma</li>
        </ul>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <h2 className="text-lg font-bold">Sorumluluk Reddi</h2>
        <p className="text-sm text-gray-500">
          Hizmet "olduğu gibi" sunulmaktadır. Teknik aksaklıklar veya veri
          kayıplarından dolayı sorumluluk kabul edilmez.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
