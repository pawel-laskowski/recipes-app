import { initializeEditPage } from "./views"
import { updateRecipe, removeRecipe, addIngredient } from "./recipes"

const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const removeElement = document.querySelector('#remove-recipe')
const addIngredientElement = document.querySelector('#add-ingredient')
const recipeId = location.hash.substring(1)

initializeEditPage(recipeId)

titleElement.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        title: e.target.value
    })
})

bodyElement.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        body: e.target.value
    })
})

addIngredientElement.addEventListener('submit', (e) => {
    const text = e.target.elements.addIngredient.value.trim()
    e.preventDefault()

    if (text.length > 0) {
        addIngredient(recipeId, text)
        e.target.elements.addIngredient.value = ''
        initializeEditPage(recipeId)
    }
})

removeElement.addEventListener('click', () => {
    // add some alert
    removeRecipe(recipeId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initializeEditPage(recipeId)
    }
})
