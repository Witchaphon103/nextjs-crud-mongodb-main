"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, redirect } from 'next/navigation'

function EditPostPage({ params }) {

    const { id } = params;

    console.log(id)

    const [postData, setPostData] = useState("");
    
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newDueDate, setNewDueDate] = useState("");

    const router = useRouter();

    const getPostById = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch a post");
            }

            const data = await res.json();
            console.log("Edit post: ", data);
            setPostData(data);

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPostById(id);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newTitle, newContent, newDueDate })
            })

            if (!res.ok) {
                throw new Error("Failed to update post")
            }

            router.refresh();
            router.push("/");

        } catch(error) {
            console.log(error);
        }
    }

  return (
    <div className='container mx-auto py-10'>
        <h3 className='text-3xl font-bold'>อัพเดทสถานะ</h3>
        <hr className='my-3' />
        <Link href="/" className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>กลับ</Link>
        <form onSubmit={handleSubmit}>
        <input 
            onChange={(e) => setNewTitle(e.target.value)} 
            type="text" 
            className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
            placeholder={postData?.post?.title} 
        />
        <textarea 
            onChange={(e) => setNewContent(e.target.value)} 
            className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
            placeholder={postData?.post?.content}>

        </textarea>

        <input 
                onChange={(e) => setNewDueDate(e.target.value)} 
                type="date" 
                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                placeholder='กำหนดวันที่ต้องทำ' 
        />
        <button 
            type='submit' 
            className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>
            Update Post
        </button>
        </form>
    </div>
  )
}

export default EditPostPage