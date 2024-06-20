import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";


// const BASE_URL = 'https://18e54fed-2349-455e-95a0-6aec4157edbc-00-3jei4bte9wnwa.picard.replit.dev';

//async thunk for fetching user's post
export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchPostsByUser",
  async (userId) => {
    try {
      //establish a reference to the post collction
      const postsRef = collection(db, `users/${userId}/posts`);

      const querySnapshot = await getDocs(postsRef);
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return docs;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
)
//create post thunk

export const savePost = createAsyncThunk(
  "posts/savePost",
  async ({ userId, postContent }) => {
    try {
      const postsRef = collection(db, `users/${userId}/posts`)

      const newPostRef = doc(postsRef);
      console.log(postContent);
      await setDoc(newPostRef, { content: postContent, likes: [] });
      const newPost = await getDoc(newPostRef);

      const post = {
        id: newPost.id,
        ...newPost.data(),
      };

      return post;
    } catch (error) {
      console.error(error);
      throw error
    }
  }
)

//like post
export const likePost = createAsyncThunk(
  'posts/likePost',
  async ({ userId, postId }) => {
    try {
      const postRef = doc(db, `users/${userId}/posts/${postId}`);

      const docSnap = await getDoc(postRef);
      if (docSnap.exists()) {
        const postData = docSnap.data();
        const likes = [...postData.likes, userId]

        await setDoc(postRef, { ...postData, likes })
      }

      return { userId, postId }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
)

//remove like from  post
export const removeLikeFromPost = createAsyncThunk(
  'posts/removeLikeFromPost',
  async ({ userId, postId }) => {
    try {
      const postRef = doc(db, `users/${userId}/posts/${postId}`);

      const docSnap = await getDoc(postRef);
      if (docSnap.exists()) {
        const postData = docSnap.data();
        const likes = postData.likes.filter((id) => id !== userId)

        await setDoc(postRef, { ...postData, likes })
      }

      return { userId, postId }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
)


//slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false
    })
      .addCase(savePost.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { userId, postId } = action.payload;
        const postIndex = state.posts.findIndex((post) => post.id === postId);

        if (postIndex !== -1) {
          state.posts[postIndex].likes.push(userId);
        }
      })
  }
})
export default postsSlice.reducer;