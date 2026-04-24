document.getElementById("seo-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.toLowerCase();
  const desc = document.getElementById("description").value.toLowerCase();

  const base = title + " " + desc;

  const tags = generateTags(base);

  const list = document.getElementById("tag-list");
  const output = document.getElementById("comma-output");

  list.innerHTML = "";

  tags.forEach(tag => {
    const li = document.createElement("li");
    li.textContent = tag;
    list.appendChild(li);
  });

  output.value = tags.join(", ");

  document.getElementById("copy-button").onclick = () => {
    navigator.clipboard.writeText(tags.join(", "));
    alert("Copied!");
  };
});

function generateTags(text) {
  const keywords = [
    "gift for teacher",
    "teacher appreciation gift",
    "personalized teacher tote bag",
    "custom teacher gift",
    "canvas tote bag",
    "floral tote bag",
    "teacher gift idea",
    "back to school gift",
    "teacher thank you gift",
    "custom name tote bag",
    "classroom tote bag",
    "reusable tote bag",
    "gift for her"
  ];

  return keywords.slice(0, 13);
}
