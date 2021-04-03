import createDataContext from './createDataContext';

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
        case 'add_blogpost':
            return [...state,
                {
                    id: Math.floor(Math.random () * 99999),
                    title: action.payload.title,
                    content: action.payload.content
                }];
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload)      
        default:
            return state;
    }
}

const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({type: 'add_blogpost', payload: {title, content}});
        callback();
    }
};

const deleteBlogPost = (dispatch) => {
    return (id) =>{
        dispatch({type: 'delete_blogpost', payload: id});
    }
}

export const {Context, Provider} = createDataContext(
    blogReducer,
    {addBlogPost, deleteBlogPost},
    [{
        id: 1,
        title: 'TEST POST',
        content: 'TEST CONTENT'
    }]);
