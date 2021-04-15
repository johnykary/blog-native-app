import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

/*
  Props => 1) Communicates information from a parent directyle down to child
           2) Easy to setup
           3) To communicate data down multiple layers, we have to write a lot of code

  Context=>1)Moves information from a parent to some nested child
           2)Complicated to setup, lots of special terms
           3)Easy to communicate data from a parent to a super nested child         
*/


const blogReducer = (state, action) =>{
    switch(action.type){
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload)      
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            })
        case 'get_blogposts':
            return action.payload;         
        default:
            return state;
    }
}

const getBlogPosts =  dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');

        dispatch({type:'get_blogposts', payload: response.data})
    }
}

const addBlogPost = () => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts',{
            title,
            content
        })

        if(callback){
            callback();
        }
    }
};

const deleteBlogPost = (dispatch) => {
    return async (id) =>{
        await jsonServer.delete(`/blogposts/${id}`)
        dispatch({type: 'delete_blogpost', payload: id});
    }
}

const editBlogPost = (dispatch) =>{
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`,{
            title,
            content
        })

        dispatch({type: 'edit_blogpost', payload: {id, title, content}});
        if(callback){
            callback();
        }
    }
}

export const {Context, Provider} = createDataContext(
    blogReducer,
    {addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts},
   []);
