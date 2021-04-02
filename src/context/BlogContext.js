import React, {useState} from 'react';

/*
  Props => 1) Communicates information from a parent directyle down to child
           2) Easy to setup
           3) To communicate data down multiple layers, we have to write a lot of code

  Context=>1)Moves information from a parent to some nested child
           2)Complicated to setup, lots of special terms
           3)Easy to communicate data from a parent to a super nested child         
*/

const BlogContext = React.createContext();

export const BlogProvider = ({children}) =>{

    const [blogPosts, setBlogPosts] = useState([]);

    const addBlogPost = () =>{
        setBlogPosts([...blogPosts, {title:`Blog Post #${blogPosts.length + 1}` }])
    }

    return <BlogContext.Provider value={{data: blogPosts, addBlogPost}}>
            {children}
    </BlogContext.Provider>
}

export default BlogContext;

