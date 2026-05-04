const recipes = [
  {
    title: "🍖 肉餡",
    baseQuantity: 160,
    ingredients: [
      { name: "豚バラ", amount: 500, unit: "g" },
      { name: "豚肩ロース", amount: 500, unit: "g" },
      { name: "塩", amount: 2, unit: "小さじ", unitPosition: "before" },
      { name: "キビ砂糖", amount: 2, unit: "小さじ", unitPosition: "before" },
      { name: "粗挽き胡椒", amount: 1, unit: "大さじ", unitPosition: "before" },
      { name: "鶏ガラスープ", amount: 1, unit: "大さじ", unitPosition: "before" },
      { name: "おろし生姜", amount: 2, unit: "大さじ", unitPosition: "before" },
      { name: "紹興酒", amount: 2, unit: "大さじ", unitPosition: "before" },
      { name: "ごま油", amount: 50, unit: "ml" },
      { name: "ゼナキング", amount: 0.5, unit: "本" }
    ]
  },
  {
    title: "🥕 野菜餡",
    baseQuantity: 160,
    ingredients: [
      { name: "長ネギ", amount: 1, unit: "本" },
      { name: "ニラ", amount: 1, unit: "把" },
      { name: "セロリ", amount: 0.5, unit: "本" },
      { name: "キャベツ（芯も含む）", amount: 0.125, unit: "個" },
      { name: "干し椎茸", amount: 6, unit: "個", prefix: "中" }
    ]
  },
  {
    title: "🥟 皮",
    baseQuantity: 60,
    ingredients: [
      { name: "強力粉", amount: 300, unit: "g" },
      { name: "塩", amount: 1.5, unit: "g" },
      { name: "ごま油", amount: 1, unit: "大さじ", unitPosition: "before" },
      { name: "熱湯", amount: null, unit: "適量" }
    ]
  }
];

const quantityInput = document.querySelector("#quantity");
const results = document.querySelector("#recipe-results");
const quickButtons = document.querySelectorAll("[data-quantity]");

function roundAmount(value) {
  if (value >= 100) {
    return Math.round(value).toLocaleString("ja-JP");
  }

  if (value >= 10) {
    return Number(value.toFixed(1)).toLocaleString("ja-JP");
  }

  return Number(value.toFixed(2)).toLocaleString("ja-JP");
}

function formatAmount(ingredient, quantity, baseQuantity) {
  if (ingredient.amount === null) {
    return ingredient.unit;
  }

  const scaled = ingredient.amount * (quantity / baseQuantity);
  const prefix = ingredient.prefix ?? "";
  const amount = roundAmount(scaled);

  if (ingredient.unitPosition === "before") {
    return `${prefix}${ingredient.unit}${amount}`;
  }

  return `${prefix}${amount}${ingredient.unit}`;
}

function normalizeQuantity(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function renderRecipes() {
  const quantity = normalizeQuantity(quantityInput.value);
  quantityInput.value = quantity;

  results.innerHTML = recipes
    .map((recipe) => {
      const ingredients = recipe.ingredients
        .map((ingredient) => `
          <div class="ingredient">
            <dt>${ingredient.name}</dt>
            <dd>${formatAmount(ingredient, quantity, recipe.baseQuantity)}</dd>
          </div>
        `)
        .join("");

      return `
        <article class="recipe-card">
          <header>
            <h2>${recipe.title}</h2>
          </header>
          <dl class="ingredient-list">
            ${ingredients}
          </dl>
        </article>
      `;
    })
    .join("");
}

quantityInput.addEventListener("input", renderRecipes);

quickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    quantityInput.value = button.dataset.quantity;
    renderRecipes();
  });
});

renderRecipes();
