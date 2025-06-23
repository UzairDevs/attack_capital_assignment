import { useEffect, useState } from 'react';
import CreatePostForm from '@/app/components/post/CreatePostForm';
import PostList from '@/app/components/post/PostList';
import ProtectedRoute from '@/app/components/layout/ProtectedRoute';
import { api } from '@/app/lib/api';
import { useAuth } from '@/app/context/AuthContext';

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const fetchPosts = async () => {
    const data = await api.get(`/posts?author=${user?.id}`);
    setPosts(data);
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handlePostCreated = () => {
    fetchPosts();
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
            <CreatePostForm onPostCreated={handlePostCreated} />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
            <PostList posts={posts} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}