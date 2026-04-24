const form = document.getElementById("seo-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const sampleButton = document.getElementById("sample-button");
const copyButton = document.getElementById("copy-button");
const helperText = document.getElementById("helper-text");
const tagList = document.getElementById("tag-list");
const commaOutput = document.getElementById("comma-output");

const productTypes = [
  "tote bag",
  "makeup bag",
  "cosmetic bag",
  "book bag",
  "gift bag",
  "shirt",
  "sweatshirt",
  "hoodie",
  "mug",
  "candle",
  "necklace",
  "bracelet",
  "ring",
  "ornament",
  "sticker",
  "planner",
  "wall art",
  "wood sign",
  "sign",
  "pillow",
  "blanket",
  "apron",
  "journal",
  "keychain",
  "bookmark",
  "tumbler",
  "soap",
];

const recipientTerms = [
  "teacher",
  "mom",
  "mama",
  "dad",
  "wife",
  "husband",
  "bride",
  "groom",
  "nurse",
  "friend",
  "coworker",
  "grandma",
  "grandpa",
  "women",
  "men",
  "kids",
  "baby",
];

const occasionTerms = [
  "teacher appreciation",
  "back to school",
  "birthday",
  "wedding",
  "christmas",
  "anniversary",
  "baby shower",
  "housewarming",
  "graduation",
  "mothers day",
  "fathers day",
];

const styleTerms = [
  "floral",
  "boho",
  "minimalist",
  "rustic",
  "funny",
  "cute",
  "vintage",
  "colorful",
  "aesthetic",
];

const materialTerms = [
  "canvas",
  "cotton",
  "linen",
  "ceramic",
  "glass",
  "wood",
  "wooden",
  "soy",
  "leather",
];

const personalizationTerms = [
  "personalized",
  "custom",
  "customized",
  "monogram",
  "monogrammed",
  "engraved",
  "name",
  "named",
  "initial",
];

const featureTerms = [
  "reusable",
  "lightweight",
  "practical",
];

const useCaseTerms = [
  "classroom",
  "school",
  "work",
  "office",
  "travel",
  "kitchen",
  "desk",
  "errands",
];

const fillerWords = new Set([
  "for",
  "the",
  "and",
  "with",
  "gift",
  "present",
  "item",
]);

const sampleData = {
  title: "Personalized teacher tote bag with floral name design",
  description:
    "A reusable canvas tote bag customized with a teacher name and colorful floral print. Great for back to school, teacher appreciation gifts, classroom supplies, and everyday errands. Lightweight, practical, and thoughtful for women, moms, or favorite teachers.",
};

function normalizeText(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeTag(value) {
  return value.trim().replace(/\s+/g, " ");
}

function words(value) {
  return normalizeTag(value).split(" ").filter(Boolean);
}

function wordCount(value) {
  return words(value).length;
}

function findMatches(text, dictionary) {
  const normalized = normalizeText(text);
  return dictionary.filter((item) => normalized.includes(item));
}

function firstMatch(text, dictionary, fallback = "") {
  return findMatches(text, dictionary)[0] || fallback;
}

function detectProductType(title, description) {
  const combined = `${title} ${description}`;
  return (
    firstMatch(title, productTypes) ||
    firstMatch(combined, productTypes) ||
    "gift item"
  );
}

function detectRecipient(text) {
  return firstMatch(text, recipientTerms, "teacher");
}

function detectOccasion(text, recipient) {
  const explicit = firstMatch(text, occasionTerms);
  if (explicit) {
    return explicit;
  }

  if (recipient === "teacher") {
    return "teacher appreciation";
  }

  return "birthday";
}

function detectStyle(text) {
  return firstMatch(text, styleTerms, "aesthetic");
}

function detectMaterial(text, productType) {
  const material = firstMatch(text, materialTerms);
  if (material === "wood") {
    return "wooden";
  }
  if (material) {
    return material;
  }
  if (productType.includes("bag")) {
    return "canvas";
  }
  return "";
}

function detectPersonalization(text) {
  const matches = findMatches(text, personalizationTerms);

  if (matches.includes("engraved")) {
    return "engraved";
  }
  if (matches.includes("monogram") || matches.includes("monogrammed")) {
    return "monogram";
  }
  if (matches.length > 0) {
    return "personalized";
  }

  return "custom";
}

function detectFeature(text, productType) {
  const feature = firstMatch(text, featureTerms);
  if (feature) {
    return feature;
  }
  if (productType.includes("bag")) {
    return "reusable";
  }
  return "";
}

function detectUseCase(text, recipient) {
  const explicit = firstMatch(text, useCaseTerms);
  if (explicit) {
    return explicit;
  }

  if (recipient === "teacher") {
    return "classroom";
  }

  return "work";
}

function makeTag(...parts) {
  return normalizeTag(parts.filter(Boolean).join(" "));
}

function canonicalWord(word) {
  const map = {
    custom: "personalized",
    customized: "personalized",
    name: "personalized",
    named: "personalized",
    initial: "personalized",
    present: "gift",
    appreciation: "thankyou",
    thanks: "thankyou",
    you: "thankyou",
  };

  return map[word] || word;
}

function phraseSignature(tag) {
  return [...new Set(
    words(tag)
      .map(canonicalWord)
      .filter((word) => !fillerWords.has(word)),
  )]
    .sort()
    .join("|");
}

function addUniqueTag(collection, seenTags, seenSignatures, rawTag) {
  const tag = normalizeTag(rawTag);

  if (!tag) {
    return false;
  }

  const count = wordCount(tag);
  if (count < 3 || count > 5) {
    return false;
  }

  const normalized = tag.toLowerCase();
  const signature = phraseSignature(tag);

  if (seenTags.has(normalized) || seenSignatures.has(signature)) {
    return false;
  }

  seenTags.add(normalized);
  seenSignatures.add(signature);
  collection.push(tag);
  return true;
}

function buildContext(title, description) {
  const combined = `${title} ${description}`;
  const productType = detectProductType(title, description);
  const recipient = detectRecipient(combined);
  const occasion = detectOccasion(combined, recipient);

  return {
    productType,
    productWord: words(productType).slice(-1)[0] || "gift",
    recipient,
    occasion,
    style: detectStyle(combined),
    material: detectMaterial(combined, productType),
    personalization: detectPersonalization(combined),
    feature: detectFeature(combined, productType),
    useCase: detectUseCase(combined, recipient),
  };
}

function buildCategoryPools(context) {
  const {
    productType,
    productWord,
    recipient,
    occasion,
    style,
    material,
    personalization,
    feature,
    useCase,
  } = context;

  const teacherSpecific = recipient === "teacher";
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
    intent: [...formalIntent, ...naturalIntent],
    product: productPhrases,
    style: stylePhrases,
    useCase: useCasePhrases,
    personalization: personalizationPhrases,
    extras: extraPhrases,
  };
}

function pickTagsFromPools(pools) {
  const tags = [];
  const seenTags = new Set();
  const seenSignatures = new Set();

  const orderedCategories = [
    "intent",
    "product",
    "style",
    "useCase",
    "personalization",
  ];

  const minimums = {
    intent: 3,
    product: 3,
    style: 2,
    useCase: 2,
    personalization: 3,
  };

  orderedCategories.forEach((category) => {
    let added = 0;

    pools[category].forEach((tag) => {
      if (added >= minimums[category] || tags.length >= 13) {
        return;
      }

      if (addUniqueTag(tags, seenTags, seenSignatures, tag)) {
        added += 1;
      }
    });
  });

  [...orderedCategories, "extras"].forEach((category) => {
    pools[category].forEach((tag) => {
      if (tags.length >= 13) {
        return;
      }
      addUniqueTag(tags, seenTags, seenSignatures, tag);
    });
  });

  [
    "personalized gift for her",
    "cute personalized gift idea",
    "best custom gift ideas",
    "gift idea for women",
    "thoughtful handmade gift",
  ].forEach((tag) => {
    if (tags.length >= 13) {
      return;
    }
    addUniqueTag(tags, seenTags, seenSignatures, tag);
  });

  return tags.slice(0, 13);
}

function generateTags(title, description) {
  const context = buildContext(title, description);
  return pickTagsFromPools(buildCategoryPools(context));
}

function renderTags(tags) {
  tagList.innerHTML = "";

  tags.forEach((tag) => {
    const item = document.createElement("li");
    item.className = "tag-pill";
    item.textContent = tag;
    tagList.appendChild(item);
  });

  helperText.textContent =
    "These 13 tags balance buyer intent, product type, style, use case, and personalization keywords.";
  commaOutput.value = tags.join(", ");
  copyButton.disabled = tags.length === 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderTags(generateTags(titleInput.value, descriptionInput.value));
});

sampleButton.addEventListener("click", () => {
  titleInput.value = sampleData.title;
  descriptionInput.value = sampleData.description;
  renderTags(generateTags(sampleData.title, sampleData.description));
});

copyButton.addEventListener("click", async () => {
  if (!commaOutput.value) {
    return;
  }

  try {
    await navigator.clipboard.writeText(commaOutput.value);
    copyButton.textContent = "Copied";
    window.setTimeout(() => {
      copyButton.textContent = "Copy Tags";
    }, 1400);
  } catch (error) {
    copyButton.textContent = "Copy failed";
    window.setTimeout(() => {
      copyButton.textContent = "Copy Tags";
    }, 1400);
  }
});
