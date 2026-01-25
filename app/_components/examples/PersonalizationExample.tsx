'use client';

/**
 * Use Case 3: Personalization & User Segmentation
 * 
 * Best for: Showing different content based on user type, location, behavior
 * 
 * Example: Different messaging for new vs returning visitors, location-based offers
 */
import { useFeatureFlag } from '@/src/lib/hypertune/hooks';
import { useEffect, useState } from 'react';

type UserSegment = 'new' | 'returning' | 'vip';

export default function PersonalizationExample() {
  const [userSegment, setUserSegment] = useState<UserSegment>('new');

  // Get personalized content flags
  const showWelcomeOffer = useFeatureFlag('showWelcomeOffer', false);
  const showLoyaltyProgram = useFeatureFlag('showLoyaltyProgram', false);
  const showVIPBenefits = useFeatureFlag('showVIPBenefits', false);

  // Determine user segment (in real app, get from analytics/cookies)
  useEffect(() => {
    const isReturning = localStorage.getItem('returning_visitor') === 'true';
    const isVIP = localStorage.getItem('user_tier') === 'vip';
    
    if (isVIP) setUserSegment('vip');
    else if (isReturning) setUserSegment('returning');
    else setUserSegment('new');
  }, []);

  return (
    <div className="space-y-4">
      {userSegment === 'new' && showWelcomeOffer && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Welcome! Special Offer</h3>
          <p>Get 10% off your first consultation. Book now!</p>
        </div>
      )}

      {userSegment === 'returning' && showLoyaltyProgram && (
        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Loyalty Rewards</h3>
          <p>Thank you for being a valued patient. Earn points with every visit!</p>
        </div>
      )}

      {userSegment === 'vip' && showVIPBenefits && (
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">VIP Benefits</h3>
          <p>Priority scheduling, dedicated coordinator, and exclusive services.</p>
        </div>
      )}

      <div className="text-sm text-gray-600">
        Current segment: <strong>{userSegment}</strong>
      </div>
    </div>
  );
}
