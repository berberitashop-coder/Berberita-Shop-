export type Language = 'ar' | 'fr' | 'en';

export const languages: { code: Language; label: string; native: string; dir: 'rtl' | 'ltr' }[] = [
  { code: 'ar', label: 'العربية', native: 'Arabic', dir: 'rtl' },
  { code: 'fr', label: 'Français', native: 'French', dir: 'ltr' },
  { code: 'en', label: 'English', native: 'English', dir: 'ltr' },
];

export const wilayas: { code: string; ar: string; fr: string }[] = [
  { code: '01', ar: 'أدرار', fr: 'Adrar' },
  { code: '02', ar: 'الشلف', fr: 'Chlef' },
  { code: '03', ar: 'الأغواط', fr: 'Laghouat' },
  { code: '04', ar: 'أم البواقي', fr: 'Oum El Bouaghi' },
  { code: '05', ar: 'باتنة', fr: 'Batna' },
  { code: '06', ar: 'بجاية', fr: 'Béjaïa' },
  { code: '07', ar: 'بسكرة', fr: 'Biskra' },
  { code: '08', ar: 'بشار', fr: 'Béchar' },
  { code: '09', ar: 'البليدة', fr: 'Blida' },
  { code: '10', ar: 'البويرة', fr: 'Bouira' },
  { code: '11', ar: 'تمنراست', fr: 'Tamanrasset' },
  { code: '12', ar: 'تبسة', fr: 'Tébessa' },
  { code: '13', ar: 'تلمسان', fr: 'Tlemcen' },
  { code: '14', ar: 'تيارت', fr: 'Tiaret' },
  { code: '15', ar: 'تيزي وزو', fr: 'Tizi Ouzou' },
  { code: '16', ar: 'الجزائر', fr: 'Alger' },
  { code: '17', ar: 'الجلفة', fr: 'Djelfa' },
  { code: '18', ar: 'جيجل', fr: 'Jijel' },
  { code: '19', ar: 'سطيف', fr: 'Sétif' },
  { code: '20', ar: 'سعيدة', fr: 'Saïda' },
  { code: '21', ar: 'سكيكدة', fr: 'Skikda' },
  { code: '22', ar: 'سيدي بلعباس', fr: 'Sidi Bel Abbès' },
  { code: '23', ar: 'عنابة', fr: 'Annaba' },
  { code: '24', ar: 'قالمة', fr: 'Guelma' },
  { code: '25', ar: 'قسنطينة', fr: 'Constantine' },
  { code: '26', ar: 'المدية', fr: 'Médéa' },
  { code: '27', ar: 'مستغانم', fr: 'Mostaganem' },
  { code: '28', ar: 'المسيلة', fr: "M'Sila" },
  { code: '29', ar: 'معسكر', fr: 'Mascara' },
  { code: '30', ar: 'ورقلة', fr: 'Ouargla' },
  { code: '31', ar: 'وهران', fr: 'Oran' },
  { code: '32', ar: 'البيض', fr: 'El Bayadh' },
  { code: '33', ar: 'إليزي', fr: 'Illizi' },
  { code: '34', ar: 'برج بوعريريج', fr: 'Bordj Bou Arreridj' },
  { code: '35', ar: 'بومرداس', fr: 'Boumerdès' },
  { code: '36', ar: 'الطارف', fr: 'El Tarf' },
  { code: '37', ar: 'تندوف', fr: 'Tindouf' },
  { code: '38', ar: 'تسمسيلت', fr: 'Tissemsilt' },
  { code: '39', ar: 'الوادي', fr: 'El Oued' },
  { code: '40', ar: 'خنشلة', fr: 'Khenchela' },
  { code: '41', ar: 'سوق أهراس', fr: 'Souk Ahras' },
  { code: '42', ar: 'تيبازة', fr: 'Tipaza' },
  { code: '43', ar: 'ميلة', fr: 'Mila' },
  { code: '44', ar: 'عين الدفلى', fr: 'Aïn Defla' },
  { code: '45', ar: 'النعامة', fr: 'Naâma' },
  { code: '46', ar: 'عين تموشنت', fr: 'Aïn Témouchent' },
  { code: '47', ar: 'غرداية', fr: 'Ghardaïa' },
  { code: '48', ar: 'غليزان', fr: 'Relizane' },
  { code: '49', ar: 'تيميمون', fr: 'Timimoun' },
  { code: '50', ar: 'برج باجي مختار', fr: 'Bordj Badji Mokhtar' },
  { code: '51', ar: 'أولاد جلال', fr: 'Ouled Djellal' },
  { code: '52', ar: 'بني عباس', fr: 'Béni Abbès' },
  { code: '53', ar: 'عين صالح', fr: 'In Salah' },
  { code: '54', ar: 'عين قزام', fr: 'In Guezzam' },
  { code: '55', ar: 'تقرت', fr: 'Touggourt' },
  { code: '56', ar: 'جانت', fr: 'Djanet' },
  { code: '57', ar: 'المغير', fr: "El M'Ghair" },
  { code: '58', ar: 'المنيعة', fr: 'El Meniaa' },
  { code: '59', ar: 'آفلو', fr: 'Aflou' },
  { code: '60', ar: 'الأبيض سيدي الشيخ', fr: 'El Abiodh Sidi Cheikh' },
  { code: '61', ar: 'العريشة', fr: 'El Aricha' },
  { code: '62', ar: 'القنطرة', fr: 'El Kantara' },
  { code: '63', ar: 'بئر العاتر', fr: 'Bir El Ater' },
  { code: '64', ar: 'بوسعادة', fr: 'Bou Saâda' },
  { code: '65', ar: 'عين وسارة', fr: 'Aïn Oussera' },
  { code: '66', ar: 'قصر البخاري', fr: 'Ksar El Boukhari' },
  { code: '67', ar: 'قصر الشلالة', fr: 'Ksar Chellala' },
  { code: '68', ar: 'مسعد', fr: "M'Ssaad" },
  { code: '69', ar: 'بريكة', fr: 'Barika' },
];

type Dict = {
  meta: { title: string; description: string };
  nav: { brand: string; home: string; howItWorks: string; order: string; estimator: string; faq: string; tracking: string; menu: string };
  hero: {
    badge: string; title: string; subtitle: string; cta: string;
    stepsTitle: string; steps: { title: string; desc: string }[];
  };
  form: {
    title: string; subtitle: string;
    fields: {
      fullName: string; fullNamePlaceholder: string;
      instagram: string; instagramPlaceholder: string;
      phone: string; phonePlaceholder: string;
      city: string; cityPlaceholder: string;
      postalCode: string; postalCodePlaceholder: string;
      address: string; addressPlaceholder: string;
      productUrl: string; productUrlPlaceholder: string;
      productImage: string; productImageHint: string;
      details: string; detailsPlaceholder: string;
    };
    required: string; submit: string; submitting: string;
    errors: { required: string; productReference: string; invalidUrl: string; invalidPhone: string; invalidPostalCode: string; invalidImage: string; imageTooLarge: string };
  };
  success: { title: string; message: string; instagramBtn: string; newOrder: string };
  error: { title: string; message: string; retry: string };
  faq: { title: string; items: { q: string; a: string }[] };
  tracking: { title: string; subtitle: string; orderNumber: string; orderNumberPlaceholder: string; phone: string; phonePlaceholder: string; search: string; loading: string; notFound: string; privacy: string; statuses: Record<string, string> };
  estimator: { title: string; subtitle: string; amountLabel: string; amountHint: string; currencyLabel: string; loading: string; unavailable: string; enterAmount: string; updated: string; disclaimer: string; cta: string };
  footer: { rights: string; followInstagram: string; madeWith: string };
};

export const translations: Record<Language, Dict> = {
  ar: {
    meta: {
      title: `متجر الطلبات — اطلب منتجاتك بسهولة`,
      description: `خدمة وسيط لطلب المنتجات من المواقع العالمية وشحنها إلى باب منزلك.`,
    },
    nav: {
      brand: `متجر الطلبات`,
      home: `الرئيسية`,
      howItWorks: `كيف نعمل`,
      order: `اطلب الآن`,
      estimator: `تقدير السعر`,
      faq: `الأسئلة الشائعة`,
      tracking: `تتبع الطلب`,
      menu: `القائمة`,
    },
    hero: {
      badge: `خدمة موثوقة`,
      title: `اطلب منتجاتك المفضلة بسهولة`,
      subtitle: `نحن نساعدك في طلب المنتجات وشحنها إلى عنوانك. تصفّح المنتجات على صفحتنا في إنستغرام، والتوصيل إلى الجزائر قد يستغرق بعض الوقت. سنخبرك بكل التفاصيل والأسعار قبل تأكيد الطلب.`,
      cta: `ابدأ طلبك الآن`,
      stepsTitle: `كيف تطلب؟ 3 خطوات بسيطة`,
      steps: [
        { title: `املأ النموذج`, desc: `أدخل رابط المنتج والمعلومات المطلوبة في نموذج الطلب.` },
        { title: `نتواصل معك`, desc: `نتواصل معك عبر إنستغرام لتأكيد السعر والدفع.` },
        { title: `نطلب ونشحن`, desc: `نقوم بطلب المنتج وشحنه مباشرة إلى عنوانك.` },
      ],
    },
    form: {
      title: `معلومات الطلب`,
      subtitle: `املأ الحقول التالية وسنتواصل معك عبر إنستغرام لتأكيد طلبك.`,
      fields: {
        fullName: `الاسم الكامل`,
        fullNamePlaceholder: `مثال: أحمد بن علي`,
        instagram: `اسم المستخدم على إنستغرام`,
        instagramPlaceholder: `@username`,
        phone: `رقم الهاتف`,
        phonePlaceholder: `مثال: 06 12 34 56 78`,
        city: `الولاية / المدينة`,
        cityPlaceholder: `اختر الولاية`,
        postalCode: `الرمز البريدي`,
        postalCodePlaceholder: `مثال: 16000`,
        address: `العنوان الكامل للتوصيل`,
        addressPlaceholder: `الحي، الشارع، رقم المنزل...`,
    productUrl: `رابط المنتج`,
    productUrlPlaceholder: `الصق رابط المنتج هنا`,
        productImage: `لقطة شاشة للمنتج (اختياري)`,
        productImageHint: `أضف رابطًا أو صورة واحدة على الأقل — الحد الأقصى للصورة 5 ميغابايت`,
        details: `تفاصيل المنتج`,
        detailsPlaceholder: `اللون، المقاس، الكمية، الخ...`,
      },
      required: `حقل مطلوب`,
      submit: `إرسال الطلب`,
      submitting: `جاري الإرسال...`,
      errors: {
        required: `يرجى ملء جميع الحقول المطلوبة`,
        invalidUrl: `يرجى إدخال رابط صحيح للمنتج`,
        productReference: `يرجى إدخال رابط المنتج أو تفاصيله`,
        invalidPhone: `يرجى إدخال رقم هاتف صحيح`,
        invalidPostalCode: `يرجى إدخال رمز بريدي صحيح من خمسة أرقام`,
        invalidImage: `يرجى اختيار صورة بصيغة JPG أو PNG أو WebP أو GIF`,
        imageTooLarge: `يجب ألا يتجاوز حجم الصورة 5 ميغابايت`,
      },
    },
    success: {
      title: `تم استلام طلبك بنجاح!`,
      message: `سنتواصل معك قريبًا عبر إنستغرام لتأكيد الطلب والدفع.`,
      instagramBtn: `تواصل معنا على إنستغرام`,
      newOrder: `إرسال طلب آخر`,
    },
    error: {
      title: `حدث خطأ ما`,
      message: `لم نتمكن من إرسال طلبك. يرجى المحاولة مرة أخرى.`,
      retry: `إعادة المحاولة`,
    },
    faq: {
      title: `الأسئلة الشائعة`,
      items: [
        { q: `كيف أدفع ثمن المنتج؟`, a: `بعد إرسال طلبك، نتواصل معك عبر إنستغرام لتأكيد السعر وطريقة الدفع. للدفع بالدينار نقبل Baridi MOB وCCP، وللدفع بالعملة الأجنبية نقبل التحويل البنكي.` },
        { q: `كم تستغرق مدة التوصيل؟`, a: `تتراوح مدة التوصيل عادةً بين 15 و 45 يومًا، وقد تمتد في حالات استثنائية حتى شهرين. يختلف هذا الأجل حسب عدة عوامل: طبيعة المنتج، بلد المنشأ (أساسًا الصين أو أوروبا)، ووسيلة النقل المختارة جوًا أو بحرًا. كما قد تؤثر ظروف استثنائية ذات طابع جيوسياسي، في حالات نادرة، على الآجال.` },
        { q: `كم تكلفة الشحن؟`, a: `تُحسب تكلفة الشحن حسب وزن المنتج ووجهة التوصيل. سنخبرك بالتكلفة الإجمالية قبل تأكيد الطلب.` },
        { q: `ماذا لو وصل المنتج تالفًا؟`, a: `لنكون صريحين معك، هناك احتمال بنسبة 90% أن يتم استرداد المبلغ كاملًا أو نطلب تغيير المنتج. وقلنا 90% وليس 100% لأن الأمر يعتمد على عقلية البائع ومصداقيته مع الزبائن، غير أن أغلبية البائعين (90% أو أكثر) لن نواجه معهم أي مشكلة في استرداد المبلغ أو است��دال المنتج. وفي الوقت ذاته، يمكننا أن نؤكد لك بنسبة 100% أن مبلغك سيُسترد كاملًا، لأننا نتقن اختيار البائعين ذوي المصداقية العالية، فهذا هو صميم عملنا. (ملاحظة: حتى الآن، جميع المنتجات التي اشتريناها وصلت سليمة دون أي تلف أو كسر أو عيب؛ نسبة النجاح حتى أكتوبر 2026 هي 100%، وسيتم تحديث هذه النسبة إذا تلقّينا أي شكوى من زبائننا).` },
        { q: `كم تبلغ تكلفة أو عمولة الخدمة عند الشراء عبر موقعكم؟`, a: `نحرص في Berberita Shop على توفير أسعار واضحة وشفافة لخدمة الشراء والدفع الإلكتروني. يتم حساب التكلفة الإجمالية كالتالي: (سعر المنتج بالدينار مع سعر التوصيل + عمولة الخدمة)\n\n▫️ الطلبيات أقل من 2,000 دج: عمولة ثابتة قدرها 350 دج.\n▫️ الطلبيات من 2,000 دج إلى 9,000 دج: عمولة ثابتة قدرها 550 دج.\n▫️ الطلبيات الأكثر من 9,000 دج: عمولة مميزة قدرها 8% فقط من قيمة المنتج.\n\n📌 ملاحظة: يتم حساب سعر المنتج بالدينار وفق سعر الصرف المعتمد يوم الشراء. يمكنك دائماً إرسال رابط المنتج في الخاص للحصول على السعر النهائي الإجمالي قبل الدفع!` },
      ],
    },
tracking: { title: `تتبع طلبك`, subtitle: `أدخل رقم الطلب ورقم الهاتف المرتبط به لمعرفة آخر حالة.`, orderNumber: `رقم الطلب`, orderNumberPlaceholder: `مثال: BR-AB12CD34`, phone: `رقم الهاتف`, phonePlaceholder: `05 أو 06 أو 07...`, search: `تتبع الطلب`, loading: `جارٍ البحث...`, notFound: `لم نعثر على طلب بهذه المعلومات.`, privacy: `نطلب المعلومتين لحماية تفاصيل طلبك.`, statuses: { pending: `تم الاستلام`, paid: `تم الدفع`, ordered: `تم الطلب`, shipped: `تم الشحن`, arrived: `وصل` } },
  estimator: { title: `تقدير السعر`, subtitle: `احسب التكلفة التقريبية بالدينار قبل إرسال طلبك.`, amountLabel: `السعر النهائي للمنتج (التوصيل مشمول)`, amountHint: `أدخل السعر الظاهر عند الدفع، مع رسوم التوصيل.`, currencyLabel: `العملة`, loading: `جارٍ تحميل أسعار الصرف...`, unavailable: `لا يتوفر تقدير حاليًا. راسلنا على إنستغرام لمعرفة السعر.`, enterAmount: `أدخل مبلغًا لرؤية التقدير.`, updated: `آخر تحديث`, disclaimer: `تقدير إرشادي. قد يتغير سعر الصرف. نؤكد السعر النهائي قبل أي طلب.`, cta: `اطلب هذا المنتج` },
  footer: {
  rights: `جميع الحقوق محفوظة`,
      followInstagram: `تابعنا على إنستغرام`,
      madeWith: `صُنع بعناية لتجربة طلب سلسة`,
    },
  },
  fr: {
    meta: {
      title: `Commande Express — Commandez vos produits facilement`,
      description: `Service d'intermédiaire pour commander des produits sur les sites internationaux et les faire livrer chez vous.`,
    },
    nav: {
      brand: `Commande Express`,
      home: `Accueil`,
      howItWorks: `Comment ça marche`,
      order: `Commander`,
      estimator: `Estimer le prix`,
      faq: `FAQ`,
      tracking: `Suivi`,
      menu: `Menu`,
    },
    hero: {
      badge: `Service fiable`,
      title: `Commandez vos produits préférés facilement`,
      subtitle: `Nous vous aidons à commander des produits et à les faire livrer à votre adresse. Parcourez les produits sur notre page Instagram, et la livraison vers l'Algérie peut prendre du temps. Nous vous communiquerons tous les détails et prix avant de confirmer la commande.`,
      cta: `Commencer ma commande`,
      stepsTitle: `Comment commander ? 3 étapes simples`,
      steps: [
        { title: `Remplissez le formulaire`, desc: `Saisissez le lien du produit et les informations demandées dans le formulaire.` },
        { title: `On vous contacte`, desc: `Nous vous contactons sur Instagram pour confirmer le prix et le paiement.` },
        { title: `On commande et expédie`, desc: `Nous passons la commande et expédions le produit directement à votre adresse.` },
      ],
    },
    form: {
      title: `Informations de la commande`,
      subtitle: `Remplissez les champs ci-dessous et nous vous contacterons sur Instagram pour confirmer votre commande.`,
      fields: {
        fullName: `Nom complet`,
        fullNamePlaceholder: `Ex : Ahmed Benali`,
        instagram: `Nom d'utilisateur Instagram`,
        instagramPlaceholder: `@username`,
        phone: `Numéro de téléphone`,
        phonePlaceholder: `Ex : 06 12 34 56 78`,
        city: `Wilaya / Ville`,
        cityPlaceholder: `Sélectionnez la wilaya`,
        postalCode: `Code postal`,
        postalCodePlaceholder: `Ex : 16000`,
        address: `Adresse complète de livraison`,
        addressPlaceholder: `Quartier, rue, numéro...`,
    productUrl: `Lien du produit`,
    productUrlPlaceholder: `Collez le lien du produit ici`,
        productImage: `Capture d'écran du produit (facultatif)`,
        productImageHint: `Ajoutez au moins un lien ou une image — taille maximale : 5 Mo`,
        details: `Détails du produit`,
        detailsPlaceholder: `Couleur, taille, quantité, etc...`,
      },
      required: `Champ requis`,
      submit: `Envoyer la commande`,
      submitting: `Envoi en cours...`,
      errors: {
        required: `Veuillez remplir tous les champs requis`,
        invalidUrl: `Veuillez saisir un lien de produit valide`,
        productReference: `Veuillez saisir le lien ou les détails du produit`,
        invalidPhone: `Veuillez saisir un numéro de téléphone valide`,
        invalidPostalCode: `Veuillez saisir un code postal valide à cinq chiffres`,
        invalidImage: `Veuillez choisir une image JPG, PNG, WebP ou GIF`,
        imageTooLarge: `L'image ne doit pas dépasser 5 Mo`,
      },
    },
    success: {
      title: `Votre commande a été reçue avec succès !`,
      message: `Nous vous contacterons bientôt sur Instagram pour confirmer la commande et le paiement.`,
      instagramBtn: `Contactez-nous sur Instagram`,
      newOrder: `Passer une autre commande`,
    },
    error: {
      title: `Une erreur est survenue`,
      message: `Nous n'avons pas pu envoyer votre commande. Veuillez réessayer.`,
      retry: `Réessayer`,
    },
    faq: {
      title: `Questions fréquentes`,
      items: [
        { q: `Comment puis-je payer le produit ?`, a: `Après l'envoi de votre commande, nous vous contactons sur Instagram pour confirmer le prix et le mode de paiement. Pour les paiements en dinars, nous acceptons Baridi MOB et CCP ; pour les devises, le virement bancaire.` },
        { q: `Quels sont les délais de livraison ?`, a: `Le délai de livraison est généralement compris entre 15 et 45 jours. Dans des cas exceptionnels, il peut s'étendre jusqu'à deux mois. Ce délai varie selon plusieurs facteurs : la nature du produit, le pays d'origine (principalement la Chine ou l'Europe), ainsi que le mode de transport aérien ou maritime retenu. Des circonstances exceptionnelles d'ordre géopolitique peuvent également, dans de rares cas, influer sur les délais.` },
        { q: `Combien coûte la livraison ?`, a: `Les frais de livraison sont calculés selon le poids du produit et la destination. Nous vous communiquerons le coût total avant de confirmer la commande.` },
        { q: `Que faire si le produit arrive endommagé ?`, a: `Pour être tout à fait transparent avec vous, il y a 90 % de chances que vous soyez intégralement remboursé ou que nous demandions le remplacement du produit. Nous parlons de 90 % et non de 100 % car cela dépend de la mentalité et de la fiabilité du vendeur ; toutefois, la grande majorité des vendeurs (90 % et plus) ne posent aucun problème pour le remboursement ou l'échange. Parallèlement, nous pouvons vous affirmer à 100 % que vous serez intégralement remboursé, car notre métier consiste précisément à sélectionner des vendeurs hautement fiables. (Note : à ce jour, tous les produits que nous avons commandés sont arrivés intacts, sans aucun dommage, casse ou défaut ; notre taux de réussite jusqu'en octobre 2026 est de 100 %, et ce chiffre sera mis à jour si nous recevions une réclamation de la part d'un client).` },
        { q: `Combien coûte le service ou la commission lors d'un achat via votre site ?`, a: `Chez Berberita Shop, nous veillons à proposer des tarifs clairs et transparents pour le service d'achat et de paiement en ligne. Le coût total est calculé comme suit : (prix du produit en dinars + frais de livraison + commission de service)\n\n▫️ Commandes inférieures à 2 000 DA : commission fixe de 350 DA.\n▫️ Commandes de 2 000 DA à 9 000 DA : commission fixe de 550 DA.\n▫️ Commandes supérieures à 9 000 DA : commission avantageuse de seulement 8 % de la valeur du produit.\n\n📌 Remarque : le prix du produit en dinars est calculé selon le taux de change appliqué le jour de l'achat. Vous pouvez toujours nous envoyer le lien du produit en message privé pour obtenir le prix total final avant de payer !` },
      ],
    },
tracking: { title: `Suivre votre commande`, subtitle: `Saisissez le numéro de commande et le téléphone associé pour voir son dernier état.`, orderNumber: `Numéro de commande`, orderNumberPlaceholder: `Exemple : BR-AB12CD34`, phone: `Téléphone`, phonePlaceholder: `05, 06 ou 07...`, search: `Suivre la commande`, loading: `Recherche...`, notFound: `Aucune commande ne correspond à ces informations.`, privacy: `Ces deux informations protègent les détails de votre commande.`, statuses: { pending: `Reçue`, paid: `Payée`, ordered: `Commandée`, shipped: `Expédiée`, arrived: `Arrivée` } },
  estimator: { title: `Estimateur de prix`, subtitle: `Estimez le coût approximatif en dinars avant d'envoyer votre commande.`, amountLabel: `Prix final du produit (livraison incluse)`, amountHint: `Saisissez le prix affiché au moment de payer, frais de livraison compris.`, currencyLabel: `Devise`, loading: `Chargement des taux...`, unavailable: `Aucune estimation n'est disponible. Écrivez-nous sur Instagram pour obtenir le prix.`, enterAmount: `Saisissez un montant pour voir l'estimation.`, updated: `Taux mis à jour le`, disclaimer: `Estimation indicative. Le taux peut varier. Le prix final vous est confirmé avant toute commande.`, cta: `Commander ce produit` },
  footer: {
  rights: `Tous droits réservés`,
      followInstagram: `Suivez-nous sur Instagram`,
      madeWith: `Conçu avec soin pour une expérience de commande fluide`,
    },
  },
  en: {
    meta: {
      title: `Order Express — Order your products easily`,
      description: `Intermediary service to order products from international websites and have them delivered to your door.`,
    },
    nav: {
      brand: `Order Express`,
      home: `Home`,
      howItWorks: `How it works`,
      order: `Order now`,
      estimator: `Price estimate`,
      faq: `FAQ`,
      tracking: `Track order`,
      menu: `Menu`,
    },
    hero: {
      badge: `Reliable service`,
      title: `Order your favorite products easily`,
      subtitle: `We help you order products and have them delivered to your address. Browse the products on our Instagram page, and delivery to Algeria can take some time. We'll share all the details and prices with you before confirming the order.`,
      cta: `Start your order`,
      stepsTitle: `How to order? 3 simple steps`,
      steps: [
        { title: `Fill the form`, desc: `Enter the product link and required details in the order form.` },
        { title: `We contact you`, desc: `We reach out on Instagram to confirm the price and payment.` },
        { title: `We order & ship`, desc: `We place the order and ship the product directly to your address.` },
      ],
    },
    form: {
      title: `Order details`,
      subtitle: `Fill in the fields below and we'll contact you on Instagram to confirm your order.`,
      fields: {
        fullName: `Full name`,
        fullNamePlaceholder: `e.g. Ahmed Benali`,
        instagram: `Instagram username`,
        instagramPlaceholder: `@username`,
        phone: `Phone number`,
        phonePlaceholder: `e.g. +213 6 12 34 56 78`,
        city: `Wilaya / City`,
        cityPlaceholder: `Select a wilaya`,
        postalCode: `Postal code`,
        postalCodePlaceholder: `e.g. 16000`,
        address: `Full delivery address`,
        addressPlaceholder: `Neighborhood, street, house number...`,
    productUrl: `Product link`,
    productUrlPlaceholder: `Paste the product link here`,
        productImage: `Product screenshot (optional)`,
        productImageHint: `Add at least one link or image — maximum image size: 5 MB`,
        details: `Product details`,
        detailsPlaceholder: `Color, size, quantity, etc...`,
      },
      required: `Required field`,
      submit: `Send order`,
      submitting: `Sending...`,
      errors: {
        required: `Please fill in all required fields`,
        invalidUrl: `Please enter a valid product link`,
        productReference: `Please enter the product link or details`,
        invalidPhone: `Please enter a valid phone number`,
        invalidPostalCode: `Please enter a valid five-digit postal code`,
        invalidImage: `Please choose a JPG, PNG, WebP, or GIF image`,
        imageTooLarge: `The image must not exceed 5 MB`,
      },
    },
    success: {
      title: `Your order has been received successfully!`,
      message: `We'll contact you shortly on Instagram to confirm the order and payment.`,
      instagramBtn: `Contact us on Instagram`,
      newOrder: `Send another order`,
    },
    error: {
      title: `Something went wrong`,
      message: `We couldn't send your order. Please try again.`,
      retry: `Retry`,
    },
    faq: {
      title: `Frequently asked questions`,
      items: [
        { q: `How do I pay for the product?`, a: `After you submit your order, we contact you on Instagram to confirm the price and payment method. For dinar payments, we accept Baridi MOB and CCP; for foreign currencies, bank transfer.` },
        { q: `How long does delivery take?`, a: `Delivery typically takes between 15 and 45 days. In exceptional cases, it can extend up to two months. This timeframe varies depending on several factors: the nature of the product, the country of origin (mainly China or Europe), and the chosen mode of transport, air or sea. Exceptional geopolitical circumstances may also, in rare cases, affect delivery times.` },
        { q: `How much is shipping?`, a: `Shipping costs are calculated based on product weight and destination. We'll tell you the total cost before confirming the order.` },
        { q: `What if the product arrives damaged?`, a: `To be fully transparent with you, there is a 90% chance that you will receive a full refund or that we will request a product replacement. We say 90% and not 100% because the outcome depends on the seller's mindset and reliability; however, the vast majority of sellers (90% or more) pose no issue for refunds or exchanges. At the same time, we can assure you with 100% confidence that your money will be fully refunded, because our core business is selecting highly reliable sellers. (Note: to date, every product we have ordered arrived intact, with no damage, breakage, or defect; our success rate as of October 2026 stands at 100%, and this figure will be updated should we receive any complaint from our customers).` },
        { q: `How much does the service or commission cost when shopping through your website?`, a: `At Berberita Shop, we provide clear and transparent pricing for our shopping and online payment service. The total cost is calculated as follows: (product price in dinars + delivery fee + service commission)\n\n▫️ Orders under 2,000 DZD: a fixed commission of 350 DZD.\n▫️ Orders from 2,000 DZD to 9,000 DZD: a fixed commission of 550 DZD.\n▫️ Orders above 9,000 DZD: a special commission of only 8% of the product value.\n\n📌 Note: the product price in dinars is calculated using the applicable exchange rate on the day of purchase. You can always send us the product link in a private message to get the final total price before paying!` },
      ],
    },
tracking: { title: `Track your order`, subtitle: `Enter the order number and associated phone number to see its latest status.`, orderNumber: `Order number`, orderNumberPlaceholder: `Example: BR-AB12CD34`, phone: `Phone`, phonePlaceholder: `05, 06 or 07...`, search: `Track order`, loading: `Searching...`, notFound: `No order matches these details.`, privacy: `Both details help protect your order information.`, statuses: { pending: `Received`, paid: `Paid`, ordered: `Ordered`, shipped: `Shipped`, arrived: `Arrived` } },
  estimator: { title: `Price estimator`, subtitle: `Estimate the approximate cost in dinars before sending your order.`, amountLabel: `Final product price (delivery included)`, amountHint: `Enter the price shown at checkout, including delivery fees.`, currencyLabel: `Currency`, loading: `Loading exchange rates...`, unavailable: `No estimate is currently available. Message us on Instagram for the price.`, enterAmount: `Enter an amount to see the estimate.`, updated: `Rate updated on`, disclaimer: `Indicative estimate. The rate may vary. Your final price is confirmed before any order.`, cta: `Order this product` },
  footer: {
  rights: `All rights reserved`,
      followInstagram: `Follow us on Instagram`,
      madeWith: `Crafted with care for a seamless ordering experience`,
    },
  },
};

export const INSTAGRAM_URL = `https://www.instagram.com/berberita_shop`;
