import { useCallback, useEffect, useState } from "react";

import { httpGetPosts } from "./requests";

function useGetPosts() {
  const [posts, savePosts] = useState([]);

  const getPosts = useCallback(async () => {
    const fetchedPosts = await httpGetPosts();
    savePosts(fetchedPosts);
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return posts;
}

export default useGetPosts;
