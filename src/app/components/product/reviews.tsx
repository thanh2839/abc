'use client'

import { useState } from 'react';
import clsx from 'clsx';
import { StarIcon } from '@heroicons/react/24/solid';
import { reviews } from '../../app/data';
import { interact } from '@/app/pages/products/product';

export function Reviews() {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const accessToken = sessionStorage.getItem('accessToken');
  const userId = sessionStorage.getItem('UserId');

  const getProductIdFromURL = (): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  };
  const productId = getProductIdFromURL();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken || !userId) {
      alert('Please login to submit a review');
      return;
    }

    if (userRating === 0) {
      alert('Please select a rating');
      return;
    }
    try {
      const reviewData = {
        productId: Number(productId),
        rating: Number(userRating),
        comment: comment,
      };

      console.log('Submitting review:', reviewData);
      const response = await interact(userId, accessToken, reviewData)
      console.log(response)
      setUserRating(0);
      setComment('');
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-8">
      {/* Reviews Section */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-4">
          <h2 className="text-lg font-semibold text-white">Đánh giá người dùng</h2>
          {/* <p className="mt-1 text-sm text-indigo-100">What our customers are saying</p> */}
        </div>

        {/* Scrollable Reviews List */}
        <div className="max-h-[400px] overflow-y-auto">
          <div className="divide-y divide-gray-200">
            {reviews.featured.map((review, idx) => (
              <div
                key={review.id}
                className={clsx(
                  'p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out',
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                )}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Author Info */}
                  <div className="sm:w-40 flex sm:flex-col justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{review.author}</h3>
                      <time
                        dateTime={review.datetime}
                        className="text-xs text-gray-500"
                      >
                        {review.date}
                      </time>
                    </div>
                    <div className="flex items-center mt-1">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={clsx(
                            review.rating > rating
                              ? 'text-yellow-400'
                              : 'text-gray-200',
                            'h-4 w-4 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-500">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1">
                    <h4 className="text-base font-medium text-gray-900 mb-1">
                      {review.title}
                    </h4>
                    <div
                      className="prose prose-sm text-sm text-gray-600"
                      dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Section - Only shown when logged in */}
        {accessToken && (
          <div className="border-t border-gray-200">
            <div className="px-4 py-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Hãy viết đánh giá của bạn</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Đánh giá của bạn
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={clsx(
                          'h-6 w-6 flex-shrink-0 cursor-pointer transition-all transform hover:scale-110',
                          rating <= (hoveredStar || userRating)
                            ? 'text-yellow-400'
                            : 'text-gray-200'
                        )}
                        onClick={() => setUserRating(rating)}
                        onMouseEnter={() => setHoveredStar(rating)}
                        onMouseLeave={() => setHoveredStar(0)}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    rows={3}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 transition-shadow duration-200 ease-in-out hover:shadow-md"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:-translate-y-1"
                  >
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;