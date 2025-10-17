import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [postsList, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  async function getAllPosts() {
    try {
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/posts?limit=50`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (data?.message === "success") {
        setPosts(data.posts);
        console.log(data.posts);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  }

  return (
    <div className="w-3/4 mx-auto">
      {postsList?.map((post) => {
        let {
          _id,
          body,
          image,
          user: { name, photo },
          createdAt,
          comments,
        } = post;

        return (
          <div key={_id} className="mb-6 rounded-3xl bg-white p-5">
            <div className="carditem  my-5 ">
              <div className="cardItem-Avatar mb-2">
                <div className="flex items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={photo}
                    alt={name}
                  />
                  <div className="font-medium dark:text-white">
                    <div>{name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-zinc-600 mb-3">{body}</p>
              <img src={image} className="w-full rounded-2xl" alt={body} />
            </div>

            <div className="cardFooter mt-5 ">
              <div className="flex justify-between ">
                <h2>{comments.length} Comments</h2>

                <Link to={'/PostDetails/'+_id} className="text-blue-600">See post details</Link>
              </div>
              <div className="bg-gray-300 rounded-2xl my-5 p-5">
                <div className="cardItem-Avatar ">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={comments[comments.length - 1]?.commentCreator.photo}
                      alt=""
                    />
                    <div className="font-medium dark:text-white">
                      <div>{comments[comments.length - 1]?.commentCreator.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(comments[comments.length-1]?.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <h3>{comments[comments.length - 1]?.content}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
