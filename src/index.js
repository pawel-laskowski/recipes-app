import { createRecipe } from './recipes.js'
import { setFilters } from './filters'
import { renderRecipes } from './views'

renderRecipes()

document.querySelector('#add-recipe').addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipes()
})

window.addEventListener('storage', (e) => {   
    if (e.key === 'recipes') {
        renderRecipes()
    }
})