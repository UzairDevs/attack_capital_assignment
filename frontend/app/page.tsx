import PostList from '@/app/components/post/PostList';
import { api } from '@/app/lib/api';

export default async function HomePage() {
  const posts = await api.get('/posts');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to BlogHub</h1>
        <p className="text-xl text-gray-600">
          A platform for sharing your thoughts and ideas
        </p>
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