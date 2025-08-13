import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostDetails() {
  let { id } = useParams();
  let [post, setPost] = useState(null);
  useEffect(() => {
    getPostDetails();
  }, []);
  async function getPostDetails() {
    let { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    setPost(data.post);
    console.log(data);
  }
  return (
<div className="w-3/4 mx-auto">
    {post &&  <div className="mb-6 rounded-3xl bg-white p-5">
      <div className="carditem  my-5 ">
        <div className="cardItem-Avatar mb-2">
          <div className="flex items-center gap-4">
            <img
              className="w-10 h-10 rounded-full"
              src={post.user.photo}
              alt={post.user.name}
            />
            <div className="font-medium dark:text-white">
              <div>{post.user.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        <p className="text-zinc-600 mb-3">{post.body}</p>
        <img src={post.image} className="w-full rounded-2xl" alt={post.body} />
      </div>

      <div className="cardFooter mt-5 ">
        <div className="flex justify-between ">
          <h2>{post.comments.length} Comments</h2>
        </div>
        {post.comments.map((comment) => {
          return ( <div key={comment._id} className="bg-gray-300 rounded-2xl my-5 p-5">
            <div className="cardItem-Avatar ">
              <div className="flex items-center gap-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={comment.commentCreator.photo}
                  alt=""
                />
                <div className="font-medium dark:text-white">
                  <div>{comment.commentCreator.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            <h3>{comment.content}</h3>
          </div>)  
         
        })}
      </div>
    </div>}
</div>
   
  );
}
