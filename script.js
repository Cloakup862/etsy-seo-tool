    useCase,
  } = context;

  const recipientGift = makeTag("gift for", recipient);
  const thankYouGift = makeTag(recipient, "thank you gift");
  const occasionGift = makeTag(occasion, recipient, "gift");
  const personalizedProduct = makeTag(personalization, recipient, productType);
  const customNameProduct = makeTag("custom name", productType);
  const materialProduct = makeTag(material, productType);
  const featureProduct = makeTag(feature, productType);
  const styleProduct = makeTag(style, productType);
  const recipientProduct = makeTag(recipient, productType);
  const productForRecipient = makeTag(productType, "for", recipient);
  const useCaseProduct = makeTag(useCase, productType);
  const occasionProductGift = makeTag(occasion, productWord, "gift");
  const styleGift = makeTag(style, recipient, "gift");
  const materialGift = makeTag(material, recipient, "gift");
  const personalizedGift = makeTag("personalized", recipient, "gift");
  const teacherSpecific = recipient === "teacher";
  const schoolGift = makeTag("back to school", recipient, "gift");
  const classroomGift = teacherSpecific
    ? "teacher thank you gift"
    : makeTag(useCase, recipient, "gift");
  const stylePersonalizedProduct = makeTag(style, personalization, productType);
  const materialPersonalizedProduct = makeTag(material, personalization, productType);
  const useCasePersonalizedProduct = makeTag(personalization, useCase, productWord);
  const formalIntent = [
    makeTag("gift for", recipient),
    makeTag(recipient, "thank you gift"),
    teacherSpecific ? "teacher appreciation gift" : makeTag(occasion, recipient, "gift"),
    teacherSpecific ? "back to school teacher gift" : makeTag(occasion, productWord, "gift"),
    makeTag("best", recipient, "gifts"),
  ];

  const naturalIntent = [
    teacherSpecific ? "cute teacher gift idea" : makeTag("cute", recipient, "gift"),
    teacherSpecific ? "best teacher appreciation gifts" : makeTag("best", occasion, "gifts"),
    teacherSpecific ? "teacher gift for women" : makeTag(recipient, "gift for women"),
    makeTag("thoughtful", recipient, "gift"),
    makeTag("meaningful", recipient, "gift"),
  ];

  const productPhrases = [
    makeTag(material, productType),
    makeTag(feature, productType),
    makeTag(personalization, recipient, productType),
    makeTag("custom", recipient, productType),
    makeTag(productType, "for", recipient),
  ];

  const stylePhrases = [
    makeTag(style, productType),
    makeTag(style, recipient, "gift"),
    makeTag(style, material, productType),
    makeTag("cute", recipient, productWord),
  ];

  const useCasePhrases = [
    teacherSpecific ? "back to school gift" : makeTag(occasion, productWord, "gift"),
    teacherSpecific ? "teacher gift for classroom" : makeTag(useCase, recipient, "gift"),
    teacherSpecific ? "teacher supply tote" : makeTag(useCase, productType),
    makeTag(useCase, productType),
  ];

  const personalizationPhrases = [
    makeTag("custom name", productType),
    makeTag("personalized", recipient, "gift"),
    makeTag(material, personalization, productType),
    makeTag(style, personalization, productType),
    makeTag(personalization, useCase, productWord),
  ];

  const extraPhrases = [
    teacherSpecific ? "cute teacher gift for women" : makeTag("cute", recipient, "gift for women"),
    teacherSpecific ? "best teacher gift ideas" : makeTag("best", recipient, "gift ideas"),
    teacherSpecific ? "teacher tote bag gift" : makeTag(recipient, productType, "gift"),
    makeTag(material, recipient, "gift"),
    makeTag(feature, recipient, "gift"),
    makeTag(personalization, occasion, "gift"),
    makeTag("practical", recipient, "gift"),
    makeTag("small business", "gift idea"),
  ];

  return {
    intent: [
      recipientGift,
      teacherSpecific ? "teacher appreciation gift" : occasionGift,
      thankYouGift,
      teacherSpecific ? "back to school teacher gift" : occasionProductGift,
      makeTag(recipient, productWord, "gift"),
    ],
    product: [
      materialProduct,
      featureProduct,
      productForRecipient,
      recipientProduct,
      makeTag(material, feature, productType),
    ],
    style: [
      styleProduct,
      teacherSpecific ? makeTag(style, "teacher", "gift") : styleGift,
      makeTag(style, material, productType),
    ],
    useCase: [
      teacherSpecific ? "teacher thank you gift" : occasionGift,
      teacherSpecific ? "back to school gift" : makeTag(occasion, productWord),
      teacherSpecific ? "teacher supply tote" : useCaseProduct,
      useCaseProduct,
    ],
    personalization: [
      personalizedProduct,
      customNameProduct,
      personalizedGift,
      materialPersonalizedProduct,
    ],
    extras: [
      schoolGift,
      classroomGift,
      materialGift,
      stylePersonalizedProduct,
      useCasePersonalizedProduct,
      makeTag(feature, recipient, "gift"),
      makeTag(personalization, occasion, "gift"),
      makeTag("thoughtful", recipient, "gift"),
    ],
    intent: [...formalIntent, ...naturalIntent],
    product: productPhrases,
    style: stylePhrases,
    useCase: useCasePhrases,
    personalization: personalizationPhrases,
    extras: extraPhrases,
  };
}

  });

  [
    "custom gift for her",
    "personalized gift idea",
    "handmade gift for teacher",
    "custom thank you gift",
    "meaningful teacher gift",
    "personalized gift for her",
    "cute personalized gift idea",
    "best custom gift ideas",
    "gift idea for women",
    "thoughtful handmade gift",
  ].forEach((tag) => {
    if (tags.length >= 13) {
      return;




