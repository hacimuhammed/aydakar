import React from "react";

export async function generateMetadata() {
  return {
    title: "Gizlilik Politikası",
    description:
      "Bu gizlilik politikası, sizin kişisel bilgilerinizi nasıl koruduğumuzu açıklar.",
  };
}

const PrivacyPolicy = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Gizlilik Politikası</h1>
      <p className="text-sm text-gray-500">
        Bu gizlilik politikası, sizin kişisel bilgilerinizi nasıl koruduğumuzu
        açıklar.
      </p>
      <div className="flex flex-col gap-4 mt-8">
        <h2 className="text-lg font-bold">Toplanan Veriler</h2>
        <p className="text-sm text-gray-500">
          Aydakar, kayıtlı kullanıcıların ad, soyad, e-posta adresini hizmet
          kullanımı sırasında toplar.
        </p>
        <p className="text-sm text-gray-500">
          Bu, uygulamayı kullanmak için gerekli olan temel bilgilerdir.
        </p>
        <p className="text-sm text-gray-500">
          Veriler herhangi bir üçüncü tarafla paylaşılmaz.
        </p>
        <p className="text-sm text-gray-500">
          Toplanan veriler, uygulamanın işleyebileceği şekilde güvenle saklanır.
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <h2 className="text-lg font-bold">Çerezler</h2>
        <p className="text-sm text-gray-500">
          Çerezler, isteğe bağlı olarak kullanıcının tercihine sunulur.
        </p>
        <p className="text-sm text-gray-500">
          Varsayılan olarak anonimleştirilmiş kullanım verilerini toplar.
          Kullanıcılar, çerezleri kullanma veya kullanmama kararını tercih
          edebilirler.
        </p>
        <p className="text-sm text-gray-500">
          Çerezler, anonimleştirilmiş kullanım verilerini toplar. Herhangi bir
          kişisel bilgi içermez.
        </p>
        <p className="text-sm text-gray-500">
          Toplanan bu veriler şunları içerir:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-500">
          <li>Tarayıcı bilgileri</li>
          <li>Cihaz bilgileri</li>
          <li>Görüntülenen sayfa</li>
          <li>Hangi kaynaktan geldiği</li>
          <li>İşlem tarihi</li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
