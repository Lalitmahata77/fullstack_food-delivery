import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
createCategory : builder.mutation({
    query : (data)=>({
        url : `${CATEGORY_URL}`,
        method : "POST",
        body : data
    })
}),
updateCategory : builder.mutation({
    query : ({updatedCategory,categoryId})=>({
url : `${CATEGORY_URL}/${categoryId}`,
method : "PUT",
body : updatedCategory
    })
}),
deleteCatewgory : builder.mutation({
    query : (categoryId)=>({
        url : `${CATEGORY_URL}/${categoryId}`,
        method : "DELETE"
    })
}),
categories : builder.query({
    query : () =>({
        url :`${CATEGORY_URL}/categories`
    })
})
    })
})

export const {useCreateCategoryMutation,useUpdateCategoryMutation,useDeleteCatewgoryMutation,useCategoriesQuery} = categoryApiSlice
