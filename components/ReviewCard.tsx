'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Review } from '@/types';
import { formatDate } from '@/lib/api';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

/**
 * ReviewCard component - Displays customer reviews and ratings
 * Features: Star rating, review text, customer info, helpful votes, verified badge
 */
export default function ReviewCard({ review, className = '' }: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);

  const handleHelpfulClick = () => {
    if (!isHelpful) {
      setIsHelpful(true);
      setHelpfulCount(prev => prev + 1);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* User Avatar */}
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            {review.user.avatar ? (
              <Image
                src={review.user.avatar}
                alt={`${review.user.firstName} ${review.user.lastName}`}
                width={40}
                height={40}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>

          {/* User Info */}
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-900">
                {review.user.firstName} {review.user.lastName}
              </h4>
              {review.verified && (
                <span className="badge badge-success text-xs">
                  Verified Purchase
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Review Title */}
      {review.title && (
        <h5 className="font-semibold text-gray-900 mb-2">
          {review.title}
        </h5>
      )}

      {/* Review Comment */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        {review.comment}
      </p>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="mb-4">
          <div className="flex space-x-2 overflow-x-auto">
            {review.images.map((image, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={image}
                  alt={`Review image ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          {/* Helpful Button */}
          <button
            onClick={handleHelpfulClick}
            disabled={isHelpful}
            className={`flex items-center space-x-1 text-sm ${
              isHelpful
                ? 'text-green-600'
                : 'text-gray-600 hover:text-gray-800'
            } transition-colors`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>
              {isHelpful ? 'Helpful' : 'Was this helpful?'} ({helpfulCount})
            </span>
          </button>

          {/* Report Button */}
          <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
            Report
          </button>
        </div>

        {/* Product Info */}
        <div className="text-sm text-gray-500">
          <span>Size: M</span>
          <span className="mx-2">•</span>
          <span>Color: Blue</span>
        </div>
      </div>
    </div>
  );
}
