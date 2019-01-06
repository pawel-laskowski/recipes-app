import uuidv4 from 'uuid/v4'

let recipes = []

// Read exisiting recipes from localStorage
const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')
    try {
        return recipesJSON ? recipes = JSON.parse(recipesJSON) : recipes = []
    } catch (e) {
        return recipes = []
    }
}

// Save the recipes to localStorage
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Expose recipes from module
const getRecipes = () => {
    recipes = loadRecipes()
    return recipes
} 

// Create new recipe

const createRecipe = () => {
    const newRecipe = {
        id: uuidv4(),
        title: '',
        body: '',
        ingredients: []
    }
    recipes.push(newRecipe)
    saveRecipes()
    return newRecipe.id
}

// Remove recipe from the array
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}

const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id)

    if (!recipe) {
        return
    }

    if (typeof updates.title === 'string') {
        recipe.title = updates.title
    }

    if (typeof updates.body === 'string') {
        recipe.body = updates.body
    }

    saveRecipes()
    return recipe
}


const addIngredient = (recipeId, text) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    if (!recipe) {
        return
    } else {
        recipe.ingredients.push({
            id: uuidv4(),
            ingredient: text,
            status: false
        })
    }
    saveRecipes()
}

const ingredientsStatus = (recipeId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    if (!recipe) {
        return
    } else {
        const allIngredients = recipe.ingredients
        const possessedIngredients = recipe.ingredients.filter((element) => element.status === true)
        if (possessedIngredients.length === 0){
            return 'You don\'t have any ingredient.'
        } else if (possessedIngredients.length === allIngredients.length) {
            return 'You have all ingredients.'
        } else {
            return `You have ${possessedIngredients.length} of ${allIngredients.length} ingredients.`
        }
    }

}

const checkIngredient = (recipeId, ingredientId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    const ingredient = recipe.ingredients.find((ingredient) => ingredient.id === ingredientId)

    if (ingredient) {
        ingredient.status = !ingredient.status
        saveRecipes()
    }
}

const removeIngredient = (recipeId, ingredientId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    const ingredientIndex = recipe.ingredients.findIndex((ingredient) => ingredient.id === ingredientId)
    
    if(ingredientIndex > -1) {
        recipe.ingredients.splice(ingredientIndex, 1)
        saveRecipes()
    }
}

loadRecipes()

export { createRecipe, getRecipes, removeRecipe, updateRecipe, addIngredient, ingredientsStatus, checkIngredient, removeIngredient }
