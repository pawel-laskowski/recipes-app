import { getFilters } from './filters'
import { getRecipes, ingredientsStatus, checkIngredient, removeIngredient } from './recipes'

// Generate the DOM structure for a recipe
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    const titleEl = document.createElement('p')
    const ingredientStatusEl = document.createElement('p')


    // Setup the title for recipe
    if (recipe.title.length > 0) {
        titleEl.textContent = recipe.title
    } else {
        titleEl.textContent = 'Unnamed dish'
    }
    // titleEl.classList.add('')
    recipeEl.appendChild(titleEl)

    // Setup the link to the edit page for recipe
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    // recipeEl.classList.add('')

    //Setup the message for ingredients status
    ingredientStatusEl.textContent = ingredientsStatus(recipe.id)
    // ingredientStatusEl.classList.add
    recipeEl.appendChild(ingredientStatusEl)

    return recipeEl
}

// Render recipes
const renderRecipes = () => {
    const recipesEl = document.querySelector('#recipes')
    const filters = getFilters()
    const recipes = getRecipes()
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    recipesEl.innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeEl = generateRecipeDOM(recipe)
            recipesEl.appendChild(recipeEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'New idea for recipe?'
        // emptyMessage.classList.add('empty-message')
        recipesEl.appendChild(emptyMessage)
    }
}

// Get the DOM elements for individual ingredient
const generateIngredientDOM = (recipeId, ingredient) => {
    const ingredientEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkEl = document.createElement('input')
    const ingredientText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup ingredient checkbox
    checkEl.setAttribute('type', 'checkbox')
    checkEl.checked = ingredient.status
    ingredientEl.appendChild(checkEl)
    checkEl.addEventListener('change', () => {
        checkIngredient(recipeId, ingredient.id)
        initializeEditPage(recipeId)
    })

    // Setup the ingredient text
    ingredientText.textContent = ingredient.ingredient
    containerEl.appendChild(ingredientText)

    // Setup container
    // ingredientEl.classList.add('list-item')
    // containerEl.classList.add('list-item__container')
    ingredientEl.appendChild(containerEl)

    // Setup the delete button
    removeButton.textContent = 'Remove'
    removeButton.classList.add('button', 'button--text')
    ingredientEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeIngredient(recipeId, ingredient.id)
        initializeEditPage(recipeId)
    })
    return ingredientEl
}

// Render all ingredients for dish
const renderIngredients = (recipeId) => {
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    const ingredientsEl = document.querySelector('#ingredients')

    ingredientsEl.innerHTML = ''

    if (recipe.ingredients.length > 0) {
        recipe.ingredients.forEach((element) => {
            ingredientsEl.appendChild(generateIngredientDOM(recipeId, element))
        })
    } else {
        const noIngredientsMessage = document.createElement('p')
        noIngredientsMessage.textContent = 'Do you really don\'t need any ingredients?'
        ingredientsEl.appendChild(noIngredientsMessage)
    }
}

const initializeEditPage = (recipeId) => {
    const titleEl = document.querySelector('#recipe-title')
    const bodyEl = document.querySelector('#recipe-body')
    const recipes = getRecipes()
    const recipe = recipes.find((element) => element.id === recipeId)

    if (!recipe) {
        location.assign('/index.html')
    }

    titleEl.value = recipe.title
    bodyEl.value = recipe.body
    renderIngredients(recipeId)
}

export { renderRecipes, initializeEditPage, renderIngredients }
