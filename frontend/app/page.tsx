import PostList from '@/app/components/post/PostList';
import Link from 'next/link';
import { api } from '@/app/lib/api';

export default async function HomePage() {
  // Fetch posts from API
  const posts = await api.get('/posts');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to BlogHub</h1>
        <p className="text-xl text-gray-600">
          A platform for sharing your thoughts and ideas
        </p>
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="flex space-x-4">
          <Link 
            href="/signup" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </Link>
          <Link 
            href="/dashboard" 
            className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
        <PostList posts={posts} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-indigo-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Share Your Thoughts</h3>
          <p className="text-gray-700">
            Create and publish your own blog posts to share with the community.
          </p>
        </div>
        <div className="bg-indigo-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Discover Content</h3>
          <p className="text-gray-700">
            Explore posts from other authors and find inspiration.
          </p>
        </div>
        <div className="bg-indigo-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Connect with Authors</h3>
          <p className="text-gray-700">
            Follow your favorite authors and engage with their content.
          </p>
        </div>
      </div>
    </div>
  );
}